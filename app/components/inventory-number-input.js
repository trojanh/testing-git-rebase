import Ember from 'ember';
import config from '../config/environment';
import AjaxPromise from '../utils/ajax-promise';
const { getOwner } = Ember;

export default Ember.Component.extend({

  attributeBindings: ["name", "inputId", "value", "invalid", "disabled", "packageId"],
  isCordovaApp: config.cordova.enabled,
  messageBox: Ember.inject.service(),
  showMenu: false,
  bardcodeReadonly: true,

  actions: {
    toggleMenu() {
      this.toggleProperty("showMenu");
    },

    scanBarcode() {
      var onSuccess = res => {
        if (!res.cancelled) {
          this.set("value", res.text);
        }
      };
      var onError = error => this.get("messageBox").alert("Scanning failed: " + error);
      var options = {"formats": "CODE_128"};
      cordova.plugins.barcodeScanner.scan(onSuccess, onError, options);
    },

    printBarcode() {
      var loadingView = getOwner(this).lookup('component:loading').append();
      new AjaxPromise("/packages/print_barcode", "POST", this.get('session.authToken'), {package_id: this.get("packageId")})
        .catch(xhr => {
          if (xhr.status !== 200) {
            var errors = xhr.responseText;
            try { errors = Ember.$.parseJSON(xhr.responseText).errors; }
            catch(err) {}
            this.get("messageBox").alert(errors);
          } else {
            throw xhr;
          }
        })
        .then(data => {
          this.set("value", data["inventory_number"]);
        })
        .finally(() => loadingView.destroy());
    },

    enterBarcode() {
      this.set("bardcodeReadonly", false);
    }
  }

});
