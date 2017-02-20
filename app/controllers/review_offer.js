import Ember from 'ember';
const { getOwner } = Ember;

export default Ember.Controller.extend({

  application: Ember.inject.controller(),
  offer: Ember.computed.alias('model'),
  isStartReviewClicked: false,
  i18n: Ember.inject.service(),
  messageBox: Ember.inject.service(),
  backLinkPath: "",
  displayCompleteReviewPopup: false,
  displayCompleteReceivePopup: false,

  displayOfferOptions: Ember.computed({
    get: function() {
      return false;
    },
    set: function(key, value) {
      return value;
    }
  }),

  isMyOffer: Ember.computed('offer.reviewedBy', {
    get: function() {
      var currentUserId = this.session.get("currentUser.id");
      return this.get("offer.reviewedBy.id") === currentUserId;
    },
    set: function(key, value) {
      return value;
    }
  }),

  cancelByMe: Ember.computed('model', {
    get() {
      return false;
    },
    set(key, value) {
      return value;
    }
  }),

  isOfferVanished: Ember.computed.or('offer.isDeleted', 'offer.isDeleting'),

  showDeleteError: Ember.observer('offer', 'isOfferVanished', function(){
    var currentPath = window.location.href;

    if(this.get("isOfferVanished") && !this.get("cancelByMe")) {
      if(currentPath.indexOf("review_item") < 0 && currentPath.indexOf(`offers/${this.get("offer.id")}`) >= 0) {
        this.get("messageBox").alert(this.get("i18n").t("404_error"), () => {
          this.transitionToRoute("my_list");
        });
      }
    }
  }),

  actions: {
    toggleOfferOptions() {
      this.toggleProperty("displayOfferOptions");
    },

    addItem() {
      var draftItemId = this.get("model.items").filterBy("state", "draft").get("firstObject.id") || "new";
      this.transitionToRoute('item.edit_images', draftItemId);
    },

    startReview() {
      if(this.get("isStartReviewClicked")) { return; }
      var offer = this.store.peekRecord('offer', this.get('offer.id'));
      this.set("isStartReviewClicked", true);
      var adapter = getOwner(this).lookup('adapter:application');
      var url = adapter.buildURL('offer', offer.get('id')) + '/review';

      adapter.ajax(url, 'PUT')
        .then(data => this.store.pushPayload(data))
        .finally(() => this.set("isStartReviewClicked", false));
    },

    cancelOffer() {
      this.send("toggleOfferOptions");
      var offer = this.get("model");
      this.get("messageBox").confirm(this.get("i18n").t("delete_confirm"), () => {
        this.set("cancelByMe", true);
        var loadingView = getOwner(this).lookup('component:loading').append();
        offer.deleteRecord();
        offer.save()
          .then(() => {
            this.transitionToRoute(this.get("backLinkPath"));
          })
          .catch(error => { offer.rollback(); throw error; })
          .finally(() => {loadingView.destroy(); this.set("cancelByMe", false);});
        });
    },

    submitOffer() {
      this.toggleProperty("displayOfferOptions");
      var loadingView = getOwner(this).lookup('component:loading').append();
      var offer = this.get("model");
      offer.setProperties({ state_event: 'submit' });

      offer.save()
        .finally(() => loadingView.destroy());
    }
  }
});
