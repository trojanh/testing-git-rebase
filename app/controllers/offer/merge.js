import Ember from 'ember';
import AjaxPromise from 'goodcity/utils/ajax-promise';
const { getOwner } = Ember;

export default Ember.Controller.extend({
  sortProperties: ["updatedAt:desc"],
  arrangedContent: Ember.computed.sort("offersForMerge", "sortProperties"),

  offerDonor: Ember.computed.alias("model.createdBy"),
  messageBox: Ember.inject.service(),
  i18n: Ember.inject.service(),

  locale: function(str){
    return this.get("i18n").t(str);
  },

  allOffers: Ember.computed(function(){
    return this.store.peekAll("offer");
  }),

  offersForMerge: Ember.computed("allOffers.@each.state", "model", "offerDonor", function(){
    return this.get("allOffers")
      .filterBy("createdBy", this.get("offerDonor"))
      .filterBy("baseForMerge", true)
      .rejectBy("id", this.get("model.id"));
  }),

  actions: {
    confirmMergeOffer(offer) {
        this.get("messageBox").custom(
        this.locale("offer.merge.message"),
        this.locale("offer.merge.merge"), () => this.send("mergeOffer", offer),
        this.locale("cancel")
      );
    },

    mergeOffer(baseOffer) {
      var loadingView = getOwner(this).lookup('component:loading').append();

      var offer = this.get("model");
      var url   = "/offers/" + offer.id + "/merge_offer";

      new AjaxPromise(url, "PUT", this.get('session.authToken'), { base_offer_id: baseOffer.id })
        .then(data => {
          loadingView.destroy();
          if(data.status) {
            this.transitionToRoute("review_offer.items", baseOffer);
          } else {
            this.get("messageBox").alert(this.locale('offer.merge.error'));
          }
        });
    },
  },

});
