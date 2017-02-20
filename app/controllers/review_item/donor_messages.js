import Ember from "ember";
import MessagesBaseController from "shared-goodcity/controllers/messages_base";

export default MessagesBaseController.extend({
  review_item: Ember.inject.controller('review_item'),
  item: Ember.computed.alias("review_item.model")
});
