import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),
  displayUserPrompt: false,
  selectedImage: null,

  // images: Ember.computed.alias("package.item.images"),

  currentPackage: Ember.computed("package", function() {
    return this.get("store").peekRecord("package", this.get("package.id")) || this.get("package");
  }),

  images: Ember.computed("currentPackage.item.images.[]", "currentPackage.packageImages.[]", function() {
    if(this.get("currentPackage.packageImages.length") > 0) {
      return this.get("currentPackage.packageImages");
    } else {
      return this.get("currentPackage.item.images");
    }
  }),

  actions: {

    selectImage(image) {
      this.get("images").setEach("selected", false);
      image.set("selected", true);
      this.set("selectedImage", image);
    },

    setPackageImage() {
      var image = this.get("selectedImage");
      this.get("package").favouriteImage = image;
      this.sendAction("setPackageImage", this.get("index"), image);
    },

    displayImagesListOverlay() {
      if(this.get("images").length > 0) {
        this.set("displayUserPrompt", true);
        var favouriteImage = this.get("package.favouriteImage");
        if(favouriteImage) { this.send("selectImage", favouriteImage); }
      }
    },
  },

});
