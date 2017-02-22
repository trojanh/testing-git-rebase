import DS from 'ember-data';
import '../computed/foreign-key';
import Ember from 'ember';

var attr = DS.attr,
    hasMany = DS.hasMany,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({
  quantity:        attr('number'),
  length:          attr('number'),
  width:           attr('number'),
  height:          attr('number'),
  notes:           attr('string'),
  state:           attr('string', {defaultValue:'expecting'}),
  state_event:     attr('string'),
  receivedAt:      attr('date'),
  rejectedAt:      attr('date'),
  createdAt:       attr('date'),
  updatedAt:       attr('date'),
  item:            belongsTo('item', { async: false }),
  packageType:     belongsTo('package_type', { async: false }),
  location:        belongsTo('location', { async: false }),
  packageImages:   hasMany('package_image', { async: false }),
  offerId:         attr('number'),
  inventoryNumber: attr('string'),
  grade:           attr('string'),
  sentOn:          attr('date'),
  designationId:   attr('number'),
  favouriteImageId: attr('number'),
  packagesLocationsAttributes: attr(),

  isDispatched: Ember.computed.bool('sentOn'),
  isDesignated: Ember.computed('designationId', 'sentOn', 'inventoryNumber', function () {
    return this.get('designationId') && this.get('sentOn') === null && this.get('inventoryNumber');
  }),

  donorCondition:   belongsTo('donor_condition', { async: false }),
  donorConditionId: Ember.computed.foreignKey('donorCondition.id'),

  isReceived: Ember.computed.equal("state", "received"),

  packageName: Ember.computed('packageType', function(){
    return this.get('packageType.name');
  }),

  packageTypeId:   Ember.computed.foreignKey('packageType.id'),

  dimensions: Ember.computed('width', 'height', 'length', function(){
    var res = '';
    var append = val => {
      if (val) { res += !res ? val : ' x ' + val; }
    };
    append(this.get('width'));
    append(this.get('height'));
    append(this.get('length'));
    return !res ? '' : res + 'cm';
  })
});
