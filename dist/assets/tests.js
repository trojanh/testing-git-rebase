define('goodcity/tests/acceptance/accept-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'ember-data-factory-guy', 'ember-data-factory-guy/factory-guy-test-helper'], function (exports, _ember, _goodcityTestsHelpersStartApp, _emberDataFactoryGuy, _emberDataFactoryGuyFactoryGuyTestHelper) {

  var App, offer, item1, item2, package1, package2, item3, package3, item4, package4;

  module('Reviewer: Accept Item Tab', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
      _emberDataFactoryGuyFactoryGuyTestHelper['default'].setup();

      offer = _emberDataFactoryGuy['default'].make("offer", { state: "under_review" });
      item1 = _emberDataFactoryGuy['default'].make("item_with_type", { offer: offer, state: "accepted" });
      package1 = _emberDataFactoryGuy['default'].make("package", { item: item1, packageType: item1.get('packageType') });
      package2 = _emberDataFactoryGuy['default'].make("package", { item: item1, packageType: item1.get('packageType') });

      item2 = _emberDataFactoryGuy['default'].make("item", { offer: offer });

      item3 = _emberDataFactoryGuy['default'].make("item_with_type", { offer: offer, donorDescription: null, donorCondition: null });
      package3 = _emberDataFactoryGuy['default'].make("package", { item: item3, packageType: item3.get('packageType') });

      item4 = _emberDataFactoryGuy['default'].make("item_with_type", { offer: offer, state: "rejected" });
      package4 = _emberDataFactoryGuy['default'].make("package", { item: item4, packageType: item4.get('packageType') });
    },

    afterEach: function afterEach() {
      Em.run(function () {
        _emberDataFactoryGuyFactoryGuyTestHelper['default'].teardown();
      });
      _ember['default'].run(App, 'destroy');
    }
  });

  test("visit accept item tab without item_type", function () {
    visit("/offers/" + offer.id + "/review_item/" + item2.id + "/accept");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item2.id + "/accept");
      equal($('input[disabled]').val(), "");
      equal($('p.no-items').text(), "Please choose Item Type first!");
    });
  });

  test("visit accepted item with item_type", function () {
    visit("/offers/" + offer.id + "/review_item/" + item1.id + "/accept");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item1.id + "/accept");
      equal($('input[disabled]').val(), item1.get('packageType.name'));

      // two package components
      equal($(".detail_container").length, 2);

      // display name of selected package type
      equal($.trim($(".detail_container:eq(0)").text()).indexOf(package1.get('packageType.name')) > 0, true);

      equal($.trim($(".detail_container:eq(1)").text()).indexOf(package2.get('packageType.name')) > 0, true);

      // display package component notes
      equal($(".detail_container:eq(0) input[name='comment']").val(), package1.get('notes'));
      equal($(".detail_container:eq(1) input[name='comment']").val(), package2.get('notes'));

      // display quantity value
      equal(parseInt($(".detail_container:eq(0) input[name='qty']").val()), package1.get('quantity'));
      equal(parseInt($(".detail_container:eq(1) input[name='qty']").val()), package2.get('quantity'));

      // display length value
      equal(parseInt($(".detail_container:eq(0) input[name='length']").val()), package1.get('length'));
      equal(parseInt($(".detail_container:eq(1) input[name='length']").val()), package2.get('length'));

      // display width value
      equal(parseInt($(".detail_container:eq(0) input[name='width']").val()), package1.get('width'));
      equal(parseInt($(".detail_container:eq(1) input[name='width']").val()), package2.get('width'));

      // display height value
      equal(parseInt($(".detail_container:eq(0) input[name='height']").val()), package1.get('height'));
      equal(parseInt($(".detail_container:eq(1) input[name='height']").val()), package2.get('height'));

      // Display buttons
      equal($(".accept_buttons button").length, 1);

      // Item Details
      equal($(".edit-item-link").length, 1);
      equal($('.item-details textarea').length, 0);
      equal($('.item-details .radio-buttons li').length, 0);

      // Display Item Details Form
      click($(".edit-item-link"));
      andThen(function () {
        equal($('.item-details textarea').val(), item1.get('donorDescription'));
        equal($('.item-details .radio-buttons li').length, 4);
      });
    });
  });

  test("visit submitted item with item_type", function () {
    visit("/offers/" + offer.id + "/review_item/" + item3.id + "/accept");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item3.id + "/accept");
      equal($('input[disabled]').val(), item3.get('packageType.name'));

      // one package components
      equal($(".detail_container").length, 1);

      // Display buttons
      equal($(".accept_buttons button").length, 2);

      // Item Details Form
      equal($('.item-details textarea').val(), "");
      equal($('.item-details .radio-buttons li').length, 4);
    });
  });

  test("visit rejected item with item_type", function () {
    visit("/offers/" + offer.id + "/review_item/" + item4.id + "/accept");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item4.id + "/accept");
      equal($('input[disabled]').val(), item4.get('packageType.name'));

      // one package components
      equal($(".detail_container").length, 1);

      // Display buttons
      equal($(".accept_buttons button").length, 2);
    });
  });

  test("visit rejected item page", function () {
    visit("/offers/" + offer.id + "/review_item/" + item4.id + "/reject");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item4.id + "/reject");
      equal($('input[disabled]').val(), item4.get('packageType.name'));

      // hide item-edit link
      equal($(".edit-item-link").length, 0);
    });
  });
});
define('goodcity/tests/acceptance/accept-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/accept-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/accept-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/app-menu-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'ember-data-factory-guy', 'ember-data-factory-guy/factory-guy-test-helper'], function (exports, _ember, _goodcityTestsHelpersStartApp, _emberDataFactoryGuy, _emberDataFactoryGuyFactoryGuyTestHelper) {

  var App, offer, offer1, reviewer1;

  module('App Menu', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
      _emberDataFactoryGuyFactoryGuyTestHelper['default'].setup();

      reviewer1 = _emberDataFactoryGuy['default'].make("user", { isReviwer: true });
      window.localStorage.currentUserId = reviewer1.id;
      offer = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "under_review", reviewed_by: reviewer1 });
      offer1 = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "is_reviewed", reviewed_by: reviewer1 });
    },
    afterEach: function afterEach() {
      Em.run(function () {
        _emberDataFactoryGuyFactoryGuyTestHelper['default'].teardown();
      });
      _ember['default'].run(App, 'destroy');
    }
  });

  test("In progress tab count", function () {
    visit("/offers/in_progress/reviewing");

    andThen(function () {
      equal(currentURL(), "/offers/in_progress/reviewing");
      equal(find('a[href="/offers/in_progress"]').text(), "In Progress (2)");
    });
  });
});
define('goodcity/tests/acceptance/app-menu-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/app-menu-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/app-menu-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/authorization-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app'], function (exports, _ember, _goodcityTestsHelpersStartApp) {

  var App;

  module('Authorization', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 1);
    },
    afterEach: function afterEach() {
      _ember['default'].run(App, 'destroy');
    }
  });

  test("On restricted page doesn't redirect if staff", function () {
    visit('/offers');

    andThen(function () {
      equal(currentURL(), '/offers/submitted');
    });
  });
});
define('goodcity/tests/acceptance/authorization-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/authorization-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/authorization-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/closed-offers-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'ember-data-factory-guy', 'ember-data-factory-guy/factory-guy-test-helper'], function (exports, _ember, _goodcityTestsHelpersStartApp, _emberDataFactoryGuy, _emberDataFactoryGuyFactoryGuyTestHelper) {

  var App, offer, item;

  module('Closed Offer', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
      _emberDataFactoryGuyFactoryGuyTestHelper['default'].setup();
      offer = _emberDataFactoryGuy['default'].make("offer", { state: "closed" });
      item = _emberDataFactoryGuy['default'].make("item", { state: "rejected", offer: offer });
    },
    afterEach: function afterEach() {
      Em.run(function () {
        _emberDataFactoryGuyFactoryGuyTestHelper['default'].teardown();
      });
      _ember['default'].run(App, 'destroy');
    }
  });

  test("display closed offer with rejected items", function () {
    visit("/offers/" + offer.id + "/review_offer/items");

    andThen(function () {
      equal(currentURL(), "/offers/" + offer.id + "/review_offer/items");
      equal(find(".reject_badge").length, 1);
    });
  });

  test("display logistics tab of closed offer", function () {
    visit("/offers/" + offer.id + "/review_offer/logistics");

    andThen(function () {
      equal(currentURL(), "/offers/" + offer.id + "/review_offer/logistics");

      var logistics_text = $.trim($('.noTransportItems').text().replace(/\s+/g, " "));
      equal(logistics_text, "No items to transport. This offer is closed now.");
    });
  });
});
define('goodcity/tests/acceptance/closed-offers-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/closed-offers-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/closed-offers-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/donor-details-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'ember-data-factory-guy', 'ember-data-factory-guy/factory-guy-test-helper'], function (exports, _ember, _goodcityTestsHelpersStartApp, _emberDataFactoryGuy, _emberDataFactoryGuyFactoryGuyTestHelper) {

  var App, user, offer1, offer2, offer3, offer4;

  module('Reviewer: Display Donor Details Tab', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
      _emberDataFactoryGuyFactoryGuyTestHelper['default'].setup();

      user = _emberDataFactoryGuy['default'].make("user");
      offer1 = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "under_review", createdBy: user });
      offer2 = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "submitted", createdBy: user });
      offer3 = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "received", createdBy: user });
      offer4 = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "draft", createdBy: user });
    },

    afterEach: function afterEach() {
      Em.run(function () {
        _emberDataFactoryGuyFactoryGuyTestHelper['default'].teardown();
      });
      _ember['default'].run(App, 'destroy');
    }
  });

  test("verify donor details", function () {

    $.mockjax({ url: "/api/v1/twilio_outbound/generate_call_toke*", responseText: {} });
    window.Twilio = {
      Device: {
        setup: function setup() {},
        error: function error() {},
        disconnectAll: function disconnectAll() {},
        disconnect: function disconnect() {}
      }
    };

    window.webkitRTCPeerConnection = true;

    visit("/offers/1/review_offer/donor_details");
    andThen(function () {
      equal(currentURL(), "/offers/1/review_offer/donor_details");

      equal($(".donor_details .no-avatar").text(), "K");
      equal($(".donor_details .donor").text().indexOf('Kendrick Kiehn') >= 0, true);
      equal($.trim($(".donor_details .donor").text()).indexOf('5111 1111') >= 0, true);
      equal($(".donor_details li").length, 3);
      equal($.trim($(".donor_details .row .row:eq(5)").text()).indexOf('Total offers') >= 0, true);
      equal($.trim($(".donor_details .row .row:eq(5)").text()).indexOf('4') >= 0, true);
    });
  });
});
define('goodcity/tests/acceptance/donor-details-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/donor-details-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/donor-details-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/edit-images-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'ember-data-factory-guy', 'ember-data-factory-guy/factory-guy-test-helper'], function (exports, _ember, _goodcityTestsHelpersStartApp, _emberDataFactoryGuy, _emberDataFactoryGuyFactoryGuyTestHelper) {

  var App, offer;

  module('Add new Item', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
      _emberDataFactoryGuyFactoryGuyTestHelper['default'].setup();
      offer = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "under_review" });
    },
    afterEach: function afterEach() {
      Em.run(function () {
        _emberDataFactoryGuyFactoryGuyTestHelper['default'].teardown();
      });
      _ember['default'].run(App, 'destroy');
    }
  });

  test("create without Image", function () {
    visit("/offers/" + offer.id + "/items/new/edit_images");

    andThen(function () {
      equal($(".noImage a:contains('Cannot provide photo')").length, 1);
      click(find("a:contains('Cannot provide photo')"));
      andThen(function () {
        equal(currentURL(), "/offers/101/review_item/3/accept");
      });
    });
  });
});
define('goodcity/tests/acceptance/edit-images-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/edit-images-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/edit-images-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/finished-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'ember-data-factory-guy', 'ember-data-factory-guy/factory-guy-test-helper', 'goodcity/tests/helpers/custom-helpers'], function (exports, _ember, _goodcityTestsHelpersStartApp, _emberDataFactoryGuy, _emberDataFactoryGuyFactoryGuyTestHelper, _goodcityTestsHelpersCustomHelpers) {

  var App, reviewer, offer1, item1, offer2;

  module('Finished Offers', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
      _emberDataFactoryGuyFactoryGuyTestHelper['default'].setup();
      reviewer = _emberDataFactoryGuy['default'].make('user', { id: 3 });

      offer1 = _emberDataFactoryGuy['default'].make("offer", { state: "closed", reviewedBy: reviewer });
      item1 = _emberDataFactoryGuy['default'].make("item", { state: "rejected", offer: offer1 });

      offer2 = _emberDataFactoryGuy['default'].make("offer", { state: "received", reviewedBy: reviewer });
    },
    afterEach: function afterEach() {
      _ember['default'].run(App, 'destroy');
    }
  });

  test("redirect to finished offers page", function () {
    visit("/offers/finished");

    andThen(function () {

      var assertions = function assertions() {
        equal(currentURL(), "/offers/finished/received");
        equal(find("ul.list li").length, 2);
        equal(find("ul.list img").length, 1);

        // under-review status
        equal($('.time_indicator').text().indexOf('Received by ') > 0, true);
        var itemStatus = $('li.inbox_page:first span.info div:last').text().replace(/\s{1,}/g, ' ');

        // items accept-reject status
        equal(itemStatus, " 0 Received, 0 missing, 0 rejected ");
      };

      runloopFix(assertions);
    });
  });

  test("redirect to cancelled offers page", function () {
    visit("/offers/finished/cancelled");

    andThen(function () {
      equal(currentURL(), "/offers/finished/cancelled");
      equal(find("ul.list li").length, 2);
      equal(find("ul.list img").length, 1);

      // cancelled status
      equal($('.time_indicator').text().indexOf('Closed') > 0, true);

      // items accept-reject status
      var itemStatus = $('li.inbox_page:first span.info div:last').text().replace(/\s{1,}/g, ' ');
      equal(itemStatus, " 0 Accepted, 1 rejected, 0 pending ");
    });
  });
});
define('goodcity/tests/acceptance/finished-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/finished-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/finished-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/index-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app'], function (exports, _ember, _goodcityTestsHelpersStartApp) {

  var App;

  module('Home Page', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 1);
    },
    afterEach: function afterEach() {
      _ember['default'].run(App, 'destroy');
    }
  });

  test("redirect to offers page if logged-in as Reviewer", function () {
    App = (0, _goodcityTestsHelpersStartApp['default'])({}, 1);
    visit("/");

    andThen(function () {
      equal(currentURL(), "/offers/my_list/reviewing");
    });
  });

  test("redirect to offers page if logged-in as Supervisor", function () {
    App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
    visit("/");

    andThen(function () {
      equal(currentURL(), "/offers/submitted");
    });
  });

  test("redirect to login page if try to visit home page", function () {
    App = (0, _goodcityTestsHelpersStartApp['default'])();
    lookup('service:session').set('authToken', null);

    visit("/");

    andThen(function () {
      equal(currentURL(), "/login");
    });
  });
});
define('goodcity/tests/acceptance/index-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/index-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/index-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/login-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'goodcity/tests/factories/user_profile', 'ember-data-factory-guy', 'ember-data-factory-guy/factory-guy-test-helper'], function (exports, _ember, _goodcityTestsHelpersStartApp, _goodcityTestsFactoriesUser_profile, _emberDataFactoryGuy, _emberDataFactoryGuyFactoryGuyTestHelper) {

  var App, hk_user, non_hk_user;

  module('Acceptance: Login', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
      _emberDataFactoryGuyFactoryGuyTestHelper['default'].setup();

      hk_user = _emberDataFactoryGuy['default'].make('with_hk_mobile');
      non_hk_user = _emberDataFactoryGuy['default'].make('with_non_hk_mobile');

      lookup("controller:subscriptions").pusher = {
        get: function get() {
          return {};
        },
        wire: function wire() {}
      };
    },
    afterEach: function afterEach() {
      _ember['default'].run(function () {
        _emberDataFactoryGuyFactoryGuyTestHelper['default'].teardown();
      });
      _ember['default'].run(App, 'destroy');
    }
  });

  test("User able to enter mobile number and get the sms code", function () {
    expect(1);
    logoutUser('/login');
    fillIn('#mobile', hk_user.get("mobile"));
    triggerEvent('#mobile', 'blur');
    click("#getsmscode");

    andThen(function () {
      equal(currentURL(), "/authenticate");
    });
  });

  test("User is able to enter sms code and confirm and redirected to offers", function () {
    expect(2);

    var authToken = window.localStorage.authToken;
    logoutUser('/authenticate');
    visit('/authenticate');
    fillIn('#pin', "1234");
    triggerEvent('#pin', 'blur');

    andThen(function () {
      equal(find('#pin').val().length, 4);
      window.localStorage.authToken = authToken;
    });

    click("#submit_pin");

    andThen(function () {
      equal(currentURL(), "/offers/submitted");
    });
  });

  test("Logout clears authToken", function () {
    expect(1);

    visit("/offers");
    click("a:contains('Logout')");
    andThen(function () {
      equal(typeof window.localStorage.authToken, "undefined");
    });
  });

  test("User is able to resend the sms code", function () {
    expect(1);

    $.mockjax({ url: "/api/v1/auth/send_pi*", responseText: {
        "otp_auth_key": "/JqONEgEjrZefDV3ZIQsNA=="
      } });

    logoutUser('/authenticate');
    visit('/authenticate');

    click("#resend-pin");

    andThen(function () {
      equal(window.localStorage.otpAuthKey, '"/JqONEgEjrZefDV3ZIQsNA=="');
    });
  });
});
define('goodcity/tests/acceptance/login-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/login-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/login-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/logistic-tab-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'ember-data-factory-guy', 'ember-data-factory-guy/factory-guy-test-helper'], function (exports, _ember, _goodcityTestsHelpersStartApp, _emberDataFactoryGuy, _emberDataFactoryGuyFactoryGuyTestHelper) {

  var App, offer, item, reviewer, offer2, item2, offer3, item3, delivery1, ggv_order1, offer5, item5, delivery2, ggv_order2, offer6, item6, offer7, t;

  module('Review Offer Logistics', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
      _emberDataFactoryGuyFactoryGuyTestHelper['default'].setup();
      lookup('service:session').set('isAdmin', true);
      var i18n = App.__container__.lookup('service:i18n');
      t = i18n.t.bind(i18n);

      reviewer = _emberDataFactoryGuy['default'].make("user");
      offer = _emberDataFactoryGuy['default'].make("offer", { state: "under_review", reviewedBy: reviewer });
      item = _emberDataFactoryGuy['default'].make("item", { offer: offer, state: "submitted" });
      offer2 = _emberDataFactoryGuy['default'].make("offer", { state: "scheduled" });
      item2 = _emberDataFactoryGuy['default'].make("item", { state: "accepted", offer: offer2 });

      offer3 = _emberDataFactoryGuy['default'].make("offer", { state: "under_review" });
      item3 = _emberDataFactoryGuy['default'].make("item", { state: "rejected", offer: offer3 });

      ggv_order1 = _emberDataFactoryGuy['default'].make("gogovan_order");
      delivery1 = _emberDataFactoryGuy['default'].make("delivery", { deliveryType: "Gogovan", gogovanOrder: ggv_order1 });
      offer5 = _emberDataFactoryGuy['default'].make("offer", { state: "scheduled", delivery: delivery1 });
      item5 = _emberDataFactoryGuy['default'].make("item", { state: "accepted", offer: offer5 });

      ggv_order2 = _emberDataFactoryGuy['default'].make("gogovan_active_order", { ggvUuid: "123456", bookingId: "654321", driverMobile: "12345678" });
      delivery2 = _emberDataFactoryGuy['default'].make("delivery", { deliveryType: "Gogovan", gogovanOrder: ggv_order2 });
      offer6 = _emberDataFactoryGuy['default'].make("offer", { state: "scheduled", delivery: delivery2 });
      item6 = _emberDataFactoryGuy['default'].make("item", { state: "accepted", offer: offer6 });

      offer7 = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "received", deliveredBy: "Gogovan" });
    },
    afterEach: function afterEach() {
      Em.run(function () {
        _emberDataFactoryGuyFactoryGuyTestHelper['default'].teardown();
      });
      _ember['default'].run(App, 'destroy');
    }
  });

  test("for pending review of items", function () {
    visit("/offers/" + offer.id + "/review_offer/logistics");

    andThen(function () {
      equal($.trim($('p.no-items').text()), "Please finish reviewing items first!");
    });
  });

  test("for completed review of items", function () {
    visit("/offers/4/review_offer/logistics");

    andThen(function () {
      equal($(".info-text").text(), "Please complete review first");
    });
  });

  test("for rejected offer-items", function () {
    visit('/offers/' + offer3.id + "/review_offer/logistics");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer3.id + "/review_offer/logistics");
      equal($(".info-text").text(), "No items to transport.");
    });
  });

  test("for scheduled offer", function () {
    visit('/offers/' + offer2.id + "/review_offer/logistics");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer2.id + "/review_offer/logistics");

      equal($.trim($(".delivery-details .row:eq(5)").text()), "Accepted items to be transported");
      equal($(".items_list img").length, 1);
      equal($('.transport-buttons a').length, 2);
    });
  });

  test("cancel booking of scheduled offer with pending GGV order state", function () {
    // todo: remove workaround for message box button actions not firing only under test environment
    lookup("service:messageBox").custom = function (message, btn1Text, btn1Callback, btn2Text, btn2Callback) {
      btn2Callback();
    };

    visit('/offers/' + offer5.id + "/review_offer/logistics");

    andThen(function () {
      equal(currentURL(), "/offers/" + offer5.id + "/review_offer/logistics");
    });

    click("a:contains('Cancel Booking')");
    // confirm prompt invoked, ok automatically called with above workaround

    andThen(function () {
      equal(currentURL(), "/offers/" + offer5.id + "/review_offer/items");
    });
  });

  test("cancel booking of scheduled offer with active GGV order state", function () {
    visit('/offers/' + offer6.id + "/review_offer/logistics");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer6.id + "/review_offer/logistics");

      click(find("a:contains('Cancel Booking')"));
      andThen(function () {
        equal(currentURL(), "/offers/" + offer6.id + "/delivery/" + delivery2.id + "/cancel_booking");
      });
    });
  });

  test("for scheduled offer with pending GGV order state", function () {
    visit('/offers/' + offer5.id + "/review_offer/logistics");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer5.id + "/review_offer/logistics");

      equal($.trim($(".delivery-details .row:eq(0)").text()).indexOf('Awaiting Driver Confirmation') >= 0, true);
      equal($.trim($(".delivery-details .row:eq(0)").text()).indexOf('Driver & vehicle details will appear here once a driver accepts your booking.') > 0, true);

      equal($.trim($('.delivery-details .row:eq(3)').text()), "Accepted items to be transported");
      equal($(".items_list img").length, 1);
      equal($('.transport-buttons a').length, 2);
    });
  });

  test("for scheduled offer with active GGV order state", function () {
    visit('/offers/' + offer6.id + "/review_offer/logistics");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer6.id + "/review_offer/logistics");

      equal($.trim($(".transport-content .row:eq(0)").text()).indexOf('Booking Confirmed') >= 0, true);

      // driver name
      equal($.trim($(".delivery-details .gogovan_status .row:eq(0)").text()).indexOf(ggv_order2.get('driverName')) > 0, true);

      // driver mobile
      equal($.trim($(".delivery-details .gogovan_status").text()).indexOf("1234 5678") > 0, true);

      // driver License
      equal($.trim($(".delivery-details .gogovan_status .row:eq(2)").text()).indexOf(ggv_order2.get('driverLicense')) > 0, true);

      equal($.trim($(".delivery-details .gogovan_status .row:eq(3)").text()).indexOf(ggv_order2.get('price')) > 0, true);

      equal($.trim($('.delivery-details .row:eq(7)').text()), "Accepted items to be transported");
      equal($(".items_list img").length, 1);
      equal($('.transport-buttons a').length, 2);

      equal($(".booking-id div:first").text().trim(), t("delivery_details.id"));
      equal($(".booking-id div:last").text().trim().indexOf("654321") >= 0, true);
      equal($(".booking-id div:last a").text().trim().indexOf(t("delivery_details.driver_screen")) >= 0, true);
      equal($(".delivery-details .row:eq(9) div a").text().trim().indexOf("Driver Screen") >= 0, true);
    });
  });

  test("for received offer", function () {
    visit('/offers/' + offer7.id + "/review_offer/logistics");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer7.id + "/review_offer/logistics");
      var text = $(".transport-content div:first").text().trim();
      equal(text.indexOf("Goods received on") >= 0, true);
      equal(text.indexOf("via Gogovan") >= 0, true);
    });
  });
});
define('goodcity/tests/acceptance/logistic-tab-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/logistic-tab-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/logistic-tab-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/my-list-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'ember-data-factory-guy', 'ember-data-factory-guy/factory-guy-test-helper'], function (exports, _ember, _goodcityTestsHelpersStartApp, _emberDataFactoryGuy, _emberDataFactoryGuyFactoryGuyTestHelper) {

  var App, offer1, reviewer, reviewerName, offer2, item1, item2, delivery, offer3, item3, item4, offer4, item5, ggv_order;

  module('My Offers', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
      _emberDataFactoryGuyFactoryGuyTestHelper['default'].setup();
      reviewer = _emberDataFactoryGuy['default'].make('user', { id: 3 });
      offer1 = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "under_review", reviewedBy: reviewer });
      reviewerName = reviewer.get('firstName') + " " + reviewer.get('lastName');

      offer2 = _emberDataFactoryGuy['default'].make("offer", { state: "reviewed", reviewedBy: reviewer });
      item1 = _emberDataFactoryGuy['default'].make("item", { state: "accepted", offer: offer2 });
      item2 = _emberDataFactoryGuy['default'].make("item", { state: "rejected", offer: offer2 });

      ggv_order = _emberDataFactoryGuy['default'].make("gogovan_order", { status: "pending" });
      delivery = _emberDataFactoryGuy['default'].make('delivery', { deliveryType: "Gogovan", gogovanOrder: ggv_order });
      offer3 = _emberDataFactoryGuy['default'].make("offer", { state: "scheduled", delivery: delivery, reviewedBy: reviewer });
      item3 = _emberDataFactoryGuy['default'].make("item", { state: "accepted", offer: offer3 });
      item4 = _emberDataFactoryGuy['default'].make("item", { state: "rejected", offer: offer3 });

      offer4 = _emberDataFactoryGuy['default'].make("offer", { state: "closed", reviewedBy: reviewer });
      item5 = _emberDataFactoryGuy['default'].make("item", { state: "rejected", offer: offer4 });
    },
    afterEach: function afterEach() {
      Em.run(function () {
        _emberDataFactoryGuyFactoryGuyTestHelper['default'].teardown();
      });
      _ember['default'].run(App, 'destroy');
    }
  });

  test("redirect to reviewing offers page", function () {
    visit("/offers/my_list");

    andThen(function () {
      equal(currentURL(), "/offers/my_list/reviewing");
      equal(find("ul.list li").length, 1);
      equal(find("ul.list img").length, 1);

      // under-review status
      equal($('.time_indicator').text().indexOf('Started by ') > 0, true);
      var itemStatus = $('li.inbox_page:first span.info div:last').text().replace(/\s{1,}/g, ' ');

      // items accept-reject status
      equal(itemStatus, " 0 Accepted, 0 rejected, 2 pending ");
    });
  });

  test("redirect to reviewed offers page", function () {
    visit("/offers/my_list/reviewed");

    andThen(function () {
      equal(currentURL(), "/offers/my_list/reviewed");
      equal(find("ul.list li").length, 1);
      equal(find("ul.list img").length, 1);

      // reviewed status
      equal($('.time_indicator').text().indexOf('Reviewed') > 0, true);
      equal($('.time_indicator').text().indexOf('User to plan transport.') > 0, true);

      // items accept-reject status
      var itemStatus = $('li.inbox_page:first span.info div:last').text().replace(/\s{1,}/g, ' ');
      equal(itemStatus, " 1 Accepted, 1 rejected, 0 pending ");
    });
  });

  test("redirect to scheduled offers page", function () {
    visit("/offers/my_list/scheduled");

    andThen(function () {
      equal(currentURL(), "/offers/my_list/scheduled");
      equal(find("ul.list li").length, 1);
      equal(find("ul.list img").length, 1);

      // scheduled status
      equal($('.time_indicator').text().indexOf('Van ordered') >= 0, true);

      // items accept-reject status
      var itemStatus = $('li.inbox_page:first span.info div:last').text().replace(/\s{1,}/g, ' ');
      equal(itemStatus, " 1 Accepted, 1 rejected, 0 pending ");
    });
  });

  test("redirect to finished offers page", function () {
    visit("/offers/my_list/finished");

    andThen(function () {
      equal(currentURL(), "/offers/my_list/finished");
      equal(find("ul.list li").length, 2);
      equal(find("ul.list img").length, 1);

      // reviewed status
      equal($('.time_indicator').text().indexOf('Closed') > 0, true);

      // items accept-reject status
      var itemStatus = $('li.inbox_page:first span.info div:last').text().replace(/\s{1,}/g, ' ');
      equal(itemStatus, " 0 Accepted, 1 rejected, 0 pending ");
    });
  });
});
define('goodcity/tests/acceptance/my-list-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/my-list-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/my-list-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/my-notifications-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'ember-data-factory-guy', 'ember-data-factory-guy/factory-guy-test-helper', 'goodcity/tests/helpers/custom-helpers'], function (exports, _ember, _goodcityTestsHelpersStartApp, _emberDataFactoryGuy, _emberDataFactoryGuyFactoryGuyTestHelper, _goodcityTestsHelpersCustomHelpers) {
  // import syncDataStub from '../helpers/empty-sync-data-stub';

  var App, offer, item, message1, message2, message3, message4, message5;

  module('Reviewer: Notifications', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
      _emberDataFactoryGuyFactoryGuyTestHelper['default'].setup();

      offer = _emberDataFactoryGuy['default'].make("offer", { state: "under_review" });
      item = _emberDataFactoryGuy['default'].make("item", { state: "submitted", offer: offer });
      message1 = _emberDataFactoryGuy['default'].make("message", { offer: offer, item: item });
      message2 = _emberDataFactoryGuy['default'].make("message", { offer: offer, item: item, body: "Message from Donor" });
      message3 = _emberDataFactoryGuy['default'].make("message", { offer: offer, item: item, body: "Message from Supervisor", isPrivate: true, state: "read" });
      message4 = _emberDataFactoryGuy['default'].make("message", { offer: offer, item: null, body: "General Message for offer" });
      message5 = _emberDataFactoryGuy['default'].make("message", { offer: offer, item: null, state: "read", isPrivate: true });
    },

    afterEach: function afterEach() {
      Em.run(function () {
        _emberDataFactoryGuyFactoryGuyTestHelper['default'].teardown();
      });
      _ember['default'].run(App, 'destroy');
    }
  });

  test("display threads with icons and unread message count", function () {
    visit('/my_notifications');
    andThen(function () {
      var assertions = function assertions() {
        //Item thread with donor
        var item_thread = $(".thread:first");
        //item image, unread count and heading
        equal($(item_thread).find(".thread_image img").length > 0, true);
        equal($(item_thread).find(".unread_length").text(), 2);
        equal($(item_thread).find(".message-text").text().indexOf(item.get("donorDescription")) >= 0, true);

        //Item thread with supervisor
        var item_private_thread = $(".thread")[1];
        //group icon, unread count and message
        equal($(item_private_thread).find(".fa-users").length > 0, true);
        equal($(item_private_thread).find(".unread_length").length, 0);
        equal($(item_private_thread).find(".thread_last_message").text().trim(), message3.get("body"));

        //Offer thread message with donor
        var offer_thread = $(".thread")[2];
        //thread icon and heading
        equal($(offer_thread).find(".thread_image .fa-bullhorn").length > 0, true);
        equal($(offer_thread).find(".message-text").text().trim().indexOf(offer.get("createdBy.fullName") + "'s Offer") >= 0, true);

        // PENDING: not rendering last thread
        // Offer with supervisor
        // var offer_private_thread = $(".thread")[3];
        // equal($(offer_thread).find(".fa-bullhorn").length > 0, true);
        // equal($(offer_private_thread).find(".fa-users").length > 0, true);
      };

      runloopFix(assertions);
    });
  });

  test("display unread notification count on notification-bell icon", function () {
    visit('/offers');
    andThen(function () {
      equal(currentURL(), "/offers/submitted");
      equal($("span.unread .unread_length").text(), 3);
    });
  });

  test("redirect to notifications page on click of notification-bell icon", function () {
    visit('/offers');
    andThen(function () {
      equal(currentURL(), "/offers/submitted");
      equal($("span.unread .unread_length").text(), 3);

      click("a.all_unread_messages_count");
      andThen(function () {
        equal(currentURL(), "/my_notifications");
      });
    });
  });

  test("filter unread notifications", function () {
    visit("/my_notifications");
    andThen(function () {
      var assertions = function assertions() {
        equal(currentURL(), "/my_notifications");

        click(".my-notifications a:eq(0)");
        andThen(function () {
          equal($(".thread").length, 2);
        });
      };

      runloopFix(assertions);
    });
  });
});
define('goodcity/tests/acceptance/my-notifications-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/my-notifications-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/my-notifications-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/not-found-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'goodcity/tests/helpers/test-skip', 'ember-data-factory-guy'], function (exports, _ember, _goodcityTestsHelpersStartApp, _goodcityTestsHelpersTestSkip, _emberDataFactoryGuy) {

  var App, offer, t;

  module('Display not found error', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])();
      _ember['default'].run.later = function () {
        return true;
      };
      offer = _emberDataFactoryGuy['default'].make("offer");
      var i18n = App.__container__.lookup('service:i18n');
      t = i18n.t.bind(i18n);
      App.__container__.lookup("service:logger").error = function () {};
    },
    afterEach: function afterEach() {
      _ember['default'].run(App, 'destroy');
    }
  });

  // Test cases with responses as error-statuscodes fails
  // https://github.com/emberjs/ember.js/issues/12791

  (0, _goodcityTestsHelpersTestSkip['default'])("Display error popup for invalid offer", function () {
    $('.reveal-modal').remove();
    visit("/offers/invalid/review_offer/items");

    andThen(function () {
      equal(_ember['default'].$("#messageBoxText").text(), t("404_error").toString());
      _ember['default'].$('#errorModal').foundation('reveal', 'close');
    });
  });

  (0, _goodcityTestsHelpersTestSkip['default'])("Display error popup for invalid item", function () {
    $('.reveal-modal').remove();
    visit("/offers/" + offer.id + "/review_item/invalid/accept");
    $.mockjax({ url: "/api/v1/items/*", status: 404 });

    andThen(function () {
      equal(_ember['default'].$("#messageBoxText").text(), t("404_error").toString());
      _ember['default'].$('#errorModal').foundation('reveal', 'close');
    });
  });

  test("Display not-found page for invalid url", function () {
    $('.reveal-modal').remove();
    visit("/invalid_url");
    andThen(function () {
      equal(currentURL(), "/invalid_url");
      notEqual(_ember['default'].$(".xy-center").text().indexOf(t("not_found")), -1, "not found message found");
    });
  });
});
define('goodcity/tests/acceptance/not-found-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/not-found-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/not-found-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/offers-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'goodcity/tests/helpers/custom-helpers'], function (exports, _ember, _goodcityTestsHelpersStartApp, _goodcityTestsHelpersCustomHelpers) {

  var App;

  module('Submitted Offers', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
    },
    afterEach: function afterEach() {
      _ember['default'].run(App, 'destroy');
    }
  });

  test("redirect to offers page", function () {
    visit("/offers");

    andThen(function () {

      var assertions = function assertions() {
        equal(currentURL(), "/offers/submitted");
        equal(find("ul.list li").length, 1);
        equal(find("ul.list img").length, 1);

        // submitted status
        equal($('.time_indicator').text().indexOf('Submitted') > 0, true);
        var itemStatus = $('li.inbox_page:first span.info div:last').text().replace(/\s{1,}/g, ' ');

        // items accept-reject status
        equal(itemStatus, " 0 Accepted, 0 rejected, 1 pending ");
      };

      runloopFix(assertions);
    });
  });

  test("display submitted offer", function () {
    visit("/offers");

    andThen(function () {
      var assertions = function assertions() {

        equal(currentURL(), "/offers/submitted");
        click("ul.list li:first a");
        andThen(function () {
          equal(currentURL(), "/offers/3/review_offer/items");
          equal(find("a:contains('Start Review')").length, 1);
        });
      };

      runloopFix(assertions);
    });
  });
});
define('goodcity/tests/acceptance/offers-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/offers-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/offers-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/received-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'ember-data-factory-guy', 'ember-data-factory-guy/factory-guy-test-helper'], function (exports, _ember, _goodcityTestsHelpersStartApp, _emberDataFactoryGuy, _emberDataFactoryGuyFactoryGuyTestHelper) {

  var App, offer1, item1, package1, package2, package3;

  module('Received Offers', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
      _emberDataFactoryGuyFactoryGuyTestHelper['default'].setup();
      item1 = _emberDataFactoryGuy['default'].make("item", { state: "accepted" });
      offer1 = _emberDataFactoryGuy['default'].make("offer", { state: "received", items: [item1] });
      package1 = _emberDataFactoryGuy['default'].make("package", { offerId: parseInt(offer1.id), state: "received", item: item1 });
      package2 = _emberDataFactoryGuy['default'].make("package", { offerId: parseInt(offer1.id), state: "expecting", item: item1 });
      package3 = _emberDataFactoryGuy['default'].make("package", { offerId: parseInt(offer1.id), state: "missing", item: item1 });
    },
    afterEach: function afterEach() {
      Em.run(function () {
        _emberDataFactoryGuyFactoryGuyTestHelper['default'].teardown();
      });
      _ember['default'].run(App, 'destroy');
    }
  });

  test("expecting, received and missing count", function () {
    visit("/offers/" + offer1.id + "/review_offer/receive");

    andThen(function () {
      //expecting
      var href = "/offers/" + offer1.id + "/review_offer/receive";
      equal($('a[href="' + href + '"]:last').text().trim(), "Expecting(1)");
      //received
      var href1 = href + "?state=received";
      equal($('a[href="' + href1 + '"]:last').text().trim(), "Received(1)");
      //missing
      href1 = href + "?state=missing";
      equal($('a[href="' + href1 + '"]').text().trim(), "Missing(1)");
    });
  });
});
define('goodcity/tests/acceptance/received-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/received-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/received-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/review-in-progress-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'ember-data-factory-guy', 'ember-data-factory-guy/factory-guy-test-helper', 'goodcity/tests/helpers/custom-helpers'], function (exports, _ember, _goodcityTestsHelpersStartApp, _emberDataFactoryGuy, _emberDataFactoryGuyFactoryGuyTestHelper, _goodcityTestsHelpersCustomHelpers) {

  var App, offer1, reviewer, reviewerName, offer2, item1, item2;

  module('In Review Offers', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
      _emberDataFactoryGuyFactoryGuyTestHelper['default'].setup();
      reviewer = _emberDataFactoryGuy['default'].make('user', { id: 3 });
      offer1 = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "under_review", reviewedBy: reviewer });
      reviewerName = reviewer.get('firstName') + " " + reviewer.get('lastName');

      offer2 = _emberDataFactoryGuy['default'].make("offer", { state: "reviewed", reviewedBy: reviewer });
      item1 = _emberDataFactoryGuy['default'].make("item", { state: "accepted", offer: offer2 });
      item2 = _emberDataFactoryGuy['default'].make("item", { state: "rejected", offer: offer2 });
    },
    afterEach: function afterEach() {
      Em.run(function () {
        _emberDataFactoryGuyFactoryGuyTestHelper['default'].teardown();
      });
      _ember['default'].run(App, 'destroy');
    }
  });

  test("redirect to reviewing offers page", function () {
    visit("/offers/in_progress");

    andThen(function () {
      var assertions = function assertions() {
        equal(currentURL(), "/offers/in_progress/reviewing");
        equal(find("ul.list li").length, 2);
        equal(find("ul.list img").length, 2);

        // under-review status
        equal($('.time_indicator').text().indexOf('Started by ') > 0, true);
        var itemStatus = $('li.inbox_page:first span.info div:last').text().replace(/\s{1,}/g, ' ');

        equal(itemStatus, " 0 Accepted, 0 rejected, 2 pending ");
      };

      runloopFix(assertions);
    });
  });

  test("redirect to reviewed offers page", function () {
    visit("/offers/in_progress/reviewed");

    andThen(function () {
      var assertions = function assertions() {
        equal(currentURL(), "/offers/in_progress/reviewed");
        equal(find("ul.list li").length, 1);
        equal(find("ul.list img").length, 1);

        // reviewed status
        equal($('.time_indicator').text().indexOf('Reviewed') > 0, true);
        equal($('.time_indicator').text().indexOf('User to plan transport.') > 0, true);

        // items accept-reject status
        var itemStatus = $('li.inbox_page:first span.info div:last').text().replace(/\s{1,}/g, ' ');
        equal(itemStatus, " 1 Accepted, 1 rejected, 0 pending ");
      };

      runloopFix(assertions);
    });
  });
});
define('goodcity/tests/acceptance/review-in-progress-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/review-in-progress-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/review-in-progress-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/review-item-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app'], function (exports, _ember, _goodcityTestsHelpersStartApp) {

  var App;

  module('Display review Item', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
    },
    afterEach: function afterEach() {
      _ember['default'].run(App, 'destroy');
    }
  });

  test("Display Item under review", function () {
    expect(6);
    visit("/offers/1/review_item/4");

    andThen(function () {
      equal(currentURL(), "/offers/1/review_item/4/accept");
      equal(/Review Item:/i.test($('body').text()), true);
      equal(/Velit fugit amet quos ut minima quis/i.test($('body').text()), true);
      equal(/Condition: New/i.test($('body').text()), true);
      equal($('input[disabled]').val(), "");
      equal(find("img.thumb").length, 1);
    });
  });

  test("Back button redirects to review offer page", function () {
    expect(1);
    visit("/offers/1/review_item/4");
    click("a:contains('Back')");

    andThen(function () {
      equal(currentURL(), "/offers/1/review_offer/items");
    });
  });
});
define('goodcity/tests/acceptance/review-item-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/review-item-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/review-item-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/reviewer-item-messages-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'ember-data-factory-guy', 'ember-data-factory-guy/factory-guy-test-helper'], function (exports, _ember, _goodcityTestsHelpersStartApp, _emberDataFactoryGuy, _emberDataFactoryGuyFactoryGuyTestHelper) {

  var App, offer, item, message1, message2, message3;

  module('Reviewer: Display Item Messages', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
      _emberDataFactoryGuyFactoryGuyTestHelper['default'].setup();

      offer = _emberDataFactoryGuy['default'].make("offer", { state: "under_review" });
      item = _emberDataFactoryGuy['default'].make("item", { state: "submitted", offer: offer });
      message1 = _emberDataFactoryGuy['default'].make("message", { offer: offer, item: item, createdAt: new Date("2015/1/1") });
      message2 = _emberDataFactoryGuy['default'].make("message", { offer: offer, item: item, body: "Message from Donor", createdAt: new Date("2015/1/2") });
      message3 = _emberDataFactoryGuy['default'].make("message", { offer: offer, item: item, body: "Message from Supervisor", isPrivate: true });
    },

    afterEach: function afterEach() {
      Em.run(function () {
        _emberDataFactoryGuyFactoryGuyTestHelper['default'].teardown();
      });
      _ember['default'].run(App, 'destroy');
    }
  });

  test("item-messages from donor", function () {
    visit('/offers/' + offer.id + "/review_item/" + item.id + "/donor_messages");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item.id + "/donor_messages");
      equal($('.message_details').length, 2);

      var offer_message_thread_text = $('.message_details:last').parent().text();
      equal(offer_message_thread_text.indexOf(message2.get('body')) >= 0, true);
    });
  });

  test("item-messages from Supervisor", function () {
    visit('/offers/' + offer.id + "/review_item/" + item.id + "/supervisor_messages");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item.id + "/supervisor_messages");
      equal($('.message_details').length, 1);

      var offer_message_thread_text = $('.message_details:last').parent().text();
      equal(offer_message_thread_text.indexOf(message3.get('body')) >= 0, true);
    });
  });

  test("item-messages from donor should add unread bubble in donor message tab", function () {
    visit('/offers/' + offer.id + "/review_item/" + item.id + "/supervisor_messages");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item.id + "/supervisor_messages");

      _emberDataFactoryGuy['default'].make("message", { offer: offer, item: item, body: "Second Message from Donor" });

      // if message received from donor, add unread bubble mark
      equal($("a[href='/offers/" + offer.id + "/review_item/" + item.id + "/donor_messages'] i.unread").length, 1);
    });
  });

  test("offer-messages from staff should add unread bubble in supervisor message tab", function () {
    visit('/offers/' + offer.id + "/review_item/" + item.id + "/donor_messages");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item.id + "/donor_messages");

      _emberDataFactoryGuy['default'].make("message", { offer: offer, item: item, body: "Second Message from Supervisor", isPrivate: true });

      // if message received from donor, add unread bubble mark
      equal($("a[href='/offers/" + offer.id + "/review_item/" + item.id + "/supervisor_messages'] i.unread").length, 1);
    });
  });
});
define('goodcity/tests/acceptance/reviewer-item-messages-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/reviewer-item-messages-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/reviewer-item-messages-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/reviewer-item-status-message-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'ember-data-factory-guy', 'ember-data-factory-guy/factory-guy-test-helper'], function (exports, _ember, _goodcityTestsHelpersStartApp, _emberDataFactoryGuy, _emberDataFactoryGuyFactoryGuyTestHelper) {

  var App, offer1, offer2, item2, item1, item3, item4, offer3, item5;

  module('Reviewer: Display Item Status', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
      _emberDataFactoryGuyFactoryGuyTestHelper['default'].setup();

      offer1 = _emberDataFactoryGuy['default'].make("offer", { state: "submitted" });
      item1 = _emberDataFactoryGuy['default'].make("item", { offer: offer1, state: "submitted" });

      offer2 = _emberDataFactoryGuy['default'].make("offer", { state: "under_review" });
      item2 = _emberDataFactoryGuy['default'].make("item", { offer: offer2, state: "submitted" });
      item3 = _emberDataFactoryGuy['default'].make("item", { offer: offer2, state: "accepted" });
      item4 = _emberDataFactoryGuy['default'].make("item", { offer: offer2, state: "rejected" });

      offer3 = _emberDataFactoryGuy['default'].make("offer", { state: "cancelled" });
      item5 = _emberDataFactoryGuy['default'].make("item", { offer: offer3, state: "accepted" });
    },

    afterEach: function afterEach() {
      Em.run(function () {
        _emberDataFactoryGuyFactoryGuyTestHelper['default'].teardown();
      });
      _ember['default'].run(App, 'destroy');
    }
  });

  test("Display item status for submitted item", function () {
    visit('/offers/' + offer1.id + "/review_item/" + item1.id + "/accept");

    andThen(function () {
      equal(currentURL(), '/offers/' + offer1.id + "/review_item/" + item1.id + "/accept");
      equal($.trim(find('.status-message').text()), "This item is awaiting review.");
    });
  });

  test("Display item status for under review item", function () {
    visit('/offers/' + offer2.id + "/review_item/" + item2.id + "/accept");

    andThen(function () {
      equal(currentURL(), '/offers/' + offer2.id + "/review_item/" + item2.id + "/accept");
      equal($.trim(find('.status-message').text()), "This item is being reviewed.");
    });
  });

  test("Display item status for accepted item", function () {
    visit('/offers/' + offer2.id + "/review_item/" + item3.id + "/accept");

    andThen(function () {
      equal(currentURL(), '/offers/' + offer2.id + "/review_item/" + item3.id + "/accept");
      equal($.trim(find('.status-message').text()), "This item has been accepted.");
    });
  });

  test("Display offer status for reviewed offer", function () {
    visit('/offers/' + offer2.id + "/review_item/" + item4.id + "/reject");

    andThen(function () {
      equal(currentURL(), '/offers/' + offer2.id + "/review_item/" + item4.id + "/reject");
      equal($.trim(find('.status-message').text()), "This item has been rejected.");
    });
  });

  test("Display offer status for reviewed offer", function () {
    visit('/offers/' + offer3.id + "/review_item/" + item5.id + "/accept");

    andThen(function () {
      equal(currentURL(), '/offers/' + offer3.id + "/review_item/" + item5.id + "/accept");

      var donor_name = offer3.get("createdBy.firstName") + " " + offer3.get("createdBy.lastName");

      equal($('.status-message').text().trim().indexOf("The offer this item belongs to has been cancelled by " + donor_name + " on") >= 0, true);
    });
  });
});
define('goodcity/tests/acceptance/reviewer-item-status-message-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/reviewer-item-status-message-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/reviewer-item-status-message-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/reviewer-offer-messages-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'ember-data-factory-guy', 'ember-data-factory-guy/factory-guy-test-helper', 'goodcity/tests/helpers/test-skip'], function (exports, _ember, _goodcityTestsHelpersStartApp, _emberDataFactoryGuy, _emberDataFactoryGuyFactoryGuyTestHelper, _goodcityTestsHelpersTestSkip) {

  var App, offer, message1, message2, message3, message4, message5, user1, user2, offer1;

  module('Reviewer: Display Offer Messages', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
      _emberDataFactoryGuyFactoryGuyTestHelper['default'].setup();
      user1 = _emberDataFactoryGuy['default'].make("user");
      user2 = _emberDataFactoryGuy['default'].make("user_with_image");
      offer = _emberDataFactoryGuy['default'].make("offer", { state: "under_review" });
      offer1 = _emberDataFactoryGuy['default'].make("offer", { createdBy: user1, state: "under_review" });
      message4 = _emberDataFactoryGuy['default'].make("message", { offer: offer1, sender: user2, item: null, body: "Message from donor1", createdAt: new Date("2015/1/1") });
      message5 = _emberDataFactoryGuy['default'].make("message", { offer: offer1, sender: user1, item: null, body: "Message from donor2", createdAt: new Date("2015/1/2") });
      message1 = _emberDataFactoryGuy['default'].make("message", { offer: offer, item: null, createdAt: new Date("2015/1/3") });
      message2 = _emberDataFactoryGuy['default'].make("message", { offer: offer, item: null, body: "Message from Donor", createdAt: new Date("2015/1/4") });
      message3 = _emberDataFactoryGuy['default'].make("message", { offer: offer, item: null, body: "Message from Supervisor", isPrivate: true });
    },

    afterEach: function afterEach() {
      Em.run(function () {
        _emberDataFactoryGuyFactoryGuyTestHelper['default'].teardown();
      });
      _ember['default'].run(App, 'destroy');
    }
  });

  test("offer-messages from donor", function () {
    visit('/offers/' + offer.id + "/donor_messages");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer.id + "/donor_messages");
      equal($('.message_details').length, 2);

      var offer_message_thread_text = $('.message_details:last').parent().text();
      equal(offer_message_thread_text.indexOf(message2.get('body')) >= 0, true);
    });
  });

  test("offer-messages from Supervisor", function () {
    visit('/offers/' + offer.id + "/supervisor_messages");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer.id + "/supervisor_messages");
      equal($('.message_details').length, 1);

      var offer_message_thread_text = $('.message_details:last').parent().text();
      equal(offer_message_thread_text.indexOf(message3.get('body')) >= 0, true);
    });
  });

  test("offer-messages from donor should add unread bubble in donor message tab", function () {
    visit('/offers/' + offer.id + "/supervisor_messages");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer.id + "/supervisor_messages");

      _emberDataFactoryGuy['default'].make("message", { offer: offer, item: null, body: "Second Message from Donor" });

      // if message received from donor, add unread bubble mark
      equal($("a[href='/offers/" + offer.id + "/donor_messages'] i.unread").length, 1);
    });
  });

  test("offer-messages from staff should add unread bubble in supervisor message tab", function () {
    visit('/offers/' + offer.id + "/donor_messages");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer.id + "/donor_messages");

      _emberDataFactoryGuy['default'].make("message", { offer: offer, item: null, body: "Second Message from Supervisor", isPrivate: true });

      // if message received from donor, add unread bubble mark
      equal($("a[href='/offers/" + offer.id + "/supervisor_messages'] i.unread").length, 1);
    });
  });

  (0, _goodcityTestsHelpersTestSkip['default'])("offer-message with image", function () {
    visit('/offers/' + offer1.id + "/donor_messages");
    andThen(function () {
      var src = $(".received_message#" + message4.id + " img").attr("src");
      equal(src.indexOf("cloudinary") > 0, true);
    });
  });
});
define('goodcity/tests/acceptance/reviewer-offer-messages-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/reviewer-offer-messages-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/reviewer-offer-messages-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/reviewer-offer-status-messages-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'ember-data-factory-guy', 'ember-data-factory-guy/factory-guy-test-helper'], function (exports, _ember, _goodcityTestsHelpersStartApp, _emberDataFactoryGuy, _emberDataFactoryGuyFactoryGuyTestHelper) {

  var App, offer1, offer2, reviewer, reviewerName, offer7, offer3, offer4, delivery1, delivery2, offer5, delivery3, offer6, offer8, item8, offer9, item9, offer10, schedule, ggv_order11, delivery11, offer11, offer12;

  module('Reviewer: Display Offer Status', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
      _emberDataFactoryGuyFactoryGuyTestHelper['default'].setup();

      reviewer = _emberDataFactoryGuy['default'].make("user");
      offer1 = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "submitted" });

      offer2 = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "under_review", reviewedBy: reviewer });
      reviewerName = reviewer.get("firstName") + " " + reviewer.get("lastName");

      offer3 = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "reviewed" });

      schedule = _emberDataFactoryGuy['default'].make('schedule', { scheduledAt: '12/01/2014' });
      delivery1 = _emberDataFactoryGuy['default'].make('delivery', { deliveryType: "Alternate", schedule: schedule });
      offer4 = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "scheduled", delivery: delivery1 });

      delivery2 = _emberDataFactoryGuy['default'].make('delivery', { deliveryType: "Gogovan", schedule: schedule });
      offer5 = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "scheduled", delivery: delivery2 });

      delivery3 = _emberDataFactoryGuy['default'].make('delivery', { deliveryType: "Drop Off", schedule: schedule });
      offer6 = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "scheduled", delivery: delivery3 });

      offer7 = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "closed", reviewedBy: reviewer });

      offer8 = _emberDataFactoryGuy['default'].make("offer", { state: "under_review" });
      item8 = _emberDataFactoryGuy['default'].make("item", { state: "rejected", offer: offer8 });

      offer9 = _emberDataFactoryGuy['default'].make("offer", { state: "under_review" });
      item9 = _emberDataFactoryGuy['default'].make("item", { state: "accepted", offer: offer9 });

      offer10 = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "received" });

      ggv_order11 = _emberDataFactoryGuy['default'].make("gogovan_active_order");
      delivery11 = _emberDataFactoryGuy['default'].make("delivery", { deliveryType: "Gogovan", gogovanOrder: ggv_order11 });
      offer11 = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "scheduled", delivery: delivery11 });
      offer12 = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "cancelled" });
    },

    afterEach: function afterEach() {
      Em.run(function () {
        _emberDataFactoryGuyFactoryGuyTestHelper['default'].teardown();
      });
      _ember['default'].run(App, 'destroy');
    }
  });

  test("Display offer status for submitted offer", function () {
    visit('/offers/' + offer1.id + "/review_offer/items");

    andThen(function () {
      equal(currentURL(), "/offers/" + offer1.id + "/review_offer/items");
      equal($.trim(find('.status-message').text()), "Start Review");
    });
  });

  // display initial char with message
  test("Display offer status for offer under review", function () {
    visit('/offers/' + offer2.id + "/review_offer/items");

    andThen(function () {
      equal(currentURL(), "/offers/" + offer2.id + "/review_offer/items");

      // message detail
      var status = $.trim(find('.status-message').text());
      equal(status.indexOf("Started by " + reviewerName) >= 0, true);
      equal(status.indexOf(reviewer.get('nameInitial')) >= 0, true);
    });
  });

  test("Display offer status for reviewed offer", function () {
    visit('/offers/' + offer3.id + "/review_offer/items");

    andThen(function () {
      equal(currentURL(), "/offers/" + offer3.id + "/review_offer/items");

      // var message = $.trim(find('.status-message').text().replace(/\n/g, ''));
      // equal(message, "Reviewed less than a minute ago. User to plan transport." );
    });
  });

  test("Display offer status for scheduled offer: Collection", function () {
    visit('/offers/' + offer4.id + "/review_offer/items");

    andThen(function () {
      equal(currentURL(), "/offers/" + offer4.id + "/review_offer/items");
      equal($.trim(find('.status-message').text().replace(/\s{2,}/g, ' ')), "Collection Mon 1st Dec Afternoon");
    });
  });

  test("Display offer status for scheduled offer: Gogovan pending", function () {
    visit('/offers/' + offer5.id + "/review_offer/items");

    andThen(function () {
      equal(currentURL(), "/offers/" + offer5.id + "/review_offer/items");
      equal($.trim(find('.status-message').text().replace(/\s{2,}/g, ' ')), "Van ordered Afternoon, 2pm-4pm Mon 1st Dec");
    });
  });

  test("Display offer status for scheduled offer: Gogovan active", function () {
    visit('/offers/' + offer11.id + "/review_offer/items");

    andThen(function () {
      equal(currentURL(), "/offers/" + offer11.id + "/review_offer/items");
      var status = $.trim(find('.status-message').text().replace(/\s{2,}/g, ' '));
      equal(status.indexOf("Van confirmed Afternoon, 2pm-4pm") >= 0, true);
    });
  });

  test("Display offer status for scheduled offer: Drop Off", function () {
    visit('/offers/' + offer6.id + "/review_offer/items");

    andThen(function () {
      equal(currentURL(), "/offers/" + offer6.id + "/review_offer/items");
      equal($.trim(find('.status-message').text().replace(/\s{2,}/g, ' ')), "Drop-off Mon 1st Dec Afternoon");
    });
  });

  test("Display offer status for closed offer", function () {
    visit('/offers/' + offer7.id + "/review_offer/items");

    andThen(function () {
      equal(currentURL(), "/offers/" + offer7.id + "/review_offer/items");
      // equal($.trim(find('.status-message').text()), "Offer closed by " + reviewerName + " less than a minute ago");
    });
  });

  test("Display offer status for all rejected items", function () {
    visit('/offers/' + offer8.id + "/review_offer/items");

    andThen(function () {
      equal(currentURL(), "/offers/" + offer8.id + "/review_offer/items");
      equal($.trim(find('.status-message').text()).indexOf("No items needed") >= 0, true);
    });
  });

  test("Display offer status for all reviewed items", function () {
    visit('/offers/' + offer9.id + "/review_offer/items");

    andThen(function () {
      equal(currentURL(), "/offers/" + offer9.id + "/review_offer/items");
      equal(find('.status-message').text().replace(/ /g, ' ').indexOf("All items reviewed") >= 0, true);
    });
  });

  test("Display offer status for received offer-items", function () {
    visit('/offers/' + offer10.id + "/review_offer/items");

    andThen(function () {
      equal(currentURL(), "/offers/" + offer10.id + "/review_offer/items");
      var donor_name = offer10.get("createdBy.firstName") + " " + offer10.get("createdBy.lastName");
      equal($('.status-message').text().trim().indexOf("Goods donated by " + donor_name + " received") >= 0, true);
    });
  });

  test("Display offer status for cancelled offer", function () {
    visit('/offers/' + offer12.id + "/review_offer/items");

    andThen(function () {
      equal(currentURL(), "/offers/" + offer12.id + "/review_offer/items");
      var donor_name = offer12.get("closedBy.firstName") + " " + offer12.get("closedBy.lastName");
      equal($('.status-message').text().trim().indexOf("Cancelled by " + donor_name) >= 0, true);
    });
  });
});
define('goodcity/tests/acceptance/reviewer-offer-status-messages-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/reviewer-offer-status-messages-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/reviewer-offer-status-messages-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/reviewer-offer-tab-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'ember-data-factory-guy', 'ember-data-factory-guy/factory-guy-test-helper'], function (exports, _ember, _goodcityTestsHelpersStartApp, _emberDataFactoryGuy, _emberDataFactoryGuyFactoryGuyTestHelper) {

  var App, offer, item1, item2, item3, message1, message2, donor, msg_time;

  module('Reviewer: Display Offer Tab', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
      _emberDataFactoryGuyFactoryGuyTestHelper['default'].setup();

      offer = _emberDataFactoryGuy['default'].make("offer", { state: "under_review" });
      msg_time = new Date().setHours(0, 0, 0);
      message1 = _emberDataFactoryGuy['default'].make("message", { sender: donor, offer: offer, item: null, createdAt: msg_time });
      item1 = _emberDataFactoryGuy['default'].make("item", { state: "accepted", offer: offer });
      item2 = _emberDataFactoryGuy['default'].make("item", { state: "rejected", offer: offer });
      item3 = _emberDataFactoryGuy['default'].make("item", { state: "submitted", offer: offer });
      message2 = _emberDataFactoryGuy['default'].make("message", { sender: donor, offer: offer, item: item3 });
    },

    afterEach: function afterEach() {
      Em.run(function () {
        _emberDataFactoryGuyFactoryGuyTestHelper['default'].teardown();
      });
      _ember['default'].run(App, 'destroy');
    }
  });

  test("item status badge on item-image", function () {
    visit('/offers/' + offer.id + "/review_offer/items");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer.id + "/review_offer/items");

      // display 'Accepted' status for accepted-item
      equal($(".item-image .accept_badge").not(".hidden").length, 1);

      // display 'Rejected' status for accepted-item
      equal($(".item-image .reject_badge").not(".hidden").length, 1);
    });
  });

  test("offer-messages thread details", function () {
    visit('/offers/' + offer.id + "/review_offer/items");
    andThen(function () {
      // display 'General Messages' thread
      equal($('div:contains("General Messages"):last').length, 1);

      var offer_message_thread_text = $('div:contains("General Messages"):last').closest('span.info').text();

      // display latest offer message in 'General Messages' thread
      equal(offer_message_thread_text.indexOf(message1.get('body')) > 0, true);

      // display unread offer message count in 'General Messages' thread
      equal(offer_message_thread_text.indexOf('1') > 0, true);
    });
  });

  test("ordering of message threads", function () {
    visit('/offers/' + offer.id + "/review_offer/items");
    andThen(function () {
      // latest item message thread
      var latest_message_thread = $('.list li:eq(0)').text();
      equal(latest_message_thread.indexOf(item3.get('donorDescription')) > 0, true);

      // second offer message thread
      var offer_message_thread = $('.list li:eq(1)').text();
      equal(offer_message_thread.indexOf("General Messages") > 0, true);
    });
  });

  test("visit pending review item", function () {
    visit('/offers/' + offer.id + "/review_offer/items");
    andThen(function () {
      click(".list li a:contains('" + item3.get('donorDescription') + "')");
      andThen(function () {
        equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item3.id + "/accept");
      });
    });
  });

  test("visit accepted item", function () {
    visit('/offers/' + offer.id + "/review_offer/items");
    andThen(function () {
      click(".list li a:contains('" + item1.get('donorDescription') + "')");
      andThen(function () {
        equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item1.id + "/accept");
      });
    });
  });

  test("visit rejected item", function () {
    visit('/offers/' + offer.id + "/review_offer/items");
    andThen(function () {
      click(".list li a:contains('" + item2.get('donorDescription') + "')");
      andThen(function () {
        equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item2.id + "/reject");
      });
    });
  });

  test("visit offer message threads", function () {
    visit('/offers/' + offer.id + "/review_offer/items");
    andThen(function () {
      //offer message thread
      click(".list li a:contains('General Messages')");
      andThen(function () {
        equal(currentURL(), "/offers/" + offer.id + "/donor_messages");
      });
    });
  });
});
define('goodcity/tests/acceptance/reviewer-offer-tab-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/reviewer-offer-tab-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/reviewer-offer-tab-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/reviewer-reject-item-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'ember-data-factory-guy', 'ember-data-factory-guy/factory-guy-test-helper', 'goodcity/tests/helpers/test-skip'], function (exports, _ember, _goodcityTestsHelpersStartApp, _emberDataFactoryGuy, _emberDataFactoryGuyFactoryGuyTestHelper, _goodcityTestsHelpersTestSkip) {

  var App, offer, item1, item2;

  module('Reviewer: Rejct Item Tab', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
      _emberDataFactoryGuyFactoryGuyTestHelper['default'].setup();

      offer = _emberDataFactoryGuy['default'].make("offer", { state: "under_review" });
      item1 = _emberDataFactoryGuy['default'].make("item_with_type", { offer: offer });
      item2 = _emberDataFactoryGuy['default'].make("item", { offer: offer });
    },

    afterEach: function afterEach() {
      Em.run(function () {
        _emberDataFactoryGuyFactoryGuyTestHelper['default'].teardown();
      });
      _ember['default'].run(App, 'destroy');
    }
  });

  test("visit rejected item without item_type", function () {
    visit("/offers/" + offer.id + "/review_item/" + item2.id + "/reject");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item2.id + "/reject");
      equal($('input[disabled]').val(), "");
      equal($('p.no-items').text(), "Please choose Item Type first!");
    });
  });

  (0, _goodcityTestsHelpersTestSkip['default'])("visit rejected item with item_type", function () {
    visit("/offers/" + offer.id + "/review_item/" + item1.id + "/reject");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item1.id + "/reject");
      equal($('input[disabled]').val(), item1.get('packageType.name'));
      equal($(".reject-offer ul li").length, 4);

      //placeholder message in recjectio comments textarea
      equal($('textarea').attr('placeholder'), "Message to donor about the rejection of this item");
    });
  });

  test("validate at least one option selected", function () {
    visit("/offers/" + offer.id + "/review_item/" + item1.id + "/reject");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item1.id + "/reject");
      click('.rejectOffer');
      andThen(function () {
        equal($.trim($(".error-box").text()), "Please choose a reason.");
      });
    });
  });

  (0, _goodcityTestsHelpersTestSkip['default'])("display message for quality option", function () {
    visit("/offers/" + offer.id + "/review_item/" + item1.id + "/reject");
    andThen(function () {
      equal(currentURL(), "/offers/" + offer.id + "/review_item/" + item1.id + "/reject");
      click($('input[type=radio]:eq(0)'));
      andThen(function () {
        // set textarea conent on click of radio option
        equal($('textarea').val(), "Unfortunately we cannot receive this item. Some categories of items are very difficult for us to distribute unless they are in excellent condition.");

        // clear message conent on click of x-icon
        click($('.remove-text'));
        andThen(function () {
          equal($('textarea').val(), "");
        });
      });
    });
  });
});
define('goodcity/tests/acceptance/reviewer-reject-item-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/reviewer-reject-item-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/reviewer-reject-item-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/scheduled-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'ember-data-factory-guy', 'ember-data-factory-guy/factory-guy-test-helper', 'goodcity/tests/helpers/test-skip'], function (exports, _ember, _goodcityTestsHelpersStartApp, _emberDataFactoryGuy, _emberDataFactoryGuyFactoryGuyTestHelper, _goodcityTestsHelpersTestSkip) {

  var App, offer1, delivery1, offer2, delivery2, offer3, delivery3, schedule4, offer4, delivery4, ggv_order;

  module('Scheduled Offers', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
      _emberDataFactoryGuyFactoryGuyTestHelper['default'].setup();

      delivery1 = _emberDataFactoryGuy['default'].make('delivery', { deliveryType: "Gogovan" });
      offer1 = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "scheduled", delivery: delivery1 });

      ggv_order = _emberDataFactoryGuy['default'].make("gogovan_order", { status: "pending" });
      schedule4 = _emberDataFactoryGuy['default'].make('schedule', {
        scheduledAt: new Date(new Date().setDate(new Date().getDate() + 30)) });
      delivery4 = _emberDataFactoryGuy['default'].make('delivery', { deliveryType: "Gogovan", schedule: schedule4, gogovanOrder: ggv_order });
      offer4 = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "scheduled", delivery: delivery4 });

      delivery2 = _emberDataFactoryGuy['default'].make('delivery', { deliveryType: "Alternate" });
      offer2 = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "scheduled", delivery: delivery2 });

      delivery3 = _emberDataFactoryGuy['default'].make('delivery', { deliveryType: "Drop Off" });
      offer3 = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "scheduled", delivery: delivery3 });
    },
    afterEach: function afterEach() {
      Em.run(function () {
        _emberDataFactoryGuyFactoryGuyTestHelper['default'].teardown();
      });
      _ember['default'].run(App, 'destroy');
    }
  });

  (0, _goodcityTestsHelpersTestSkip['default'])("viewing collection schedule", function () {
    visit("/offers/scheduled");

    andThen(function () {
      equal(currentURL(), "/offers/scheduled/collection");
      equal(find("ul.list li").length, 1);
      equal(find("ul.list img").length, 1);
      equal($('.time_indicator').text().indexOf('Collection') > 0, true);
      equal($.trim(find('.dynamic_filter select option').first().text()), "All offers (1)");
    });
  });

  (0, _goodcityTestsHelpersTestSkip['default'])("viewing gogovan delivery schedule", function () {
    visit("/offers/scheduled/gogovan");

    andThen(function () {
      equal(currentURL(), "/offers/scheduled/gogovan");
      equal(find("ul.list li").length, 2);
      equal(find("ul.list img").length, 2);
      equal($('.time_indicator').text().indexOf('Van ordered') > 0, true);
    });
  });

  (0, _goodcityTestsHelpersTestSkip['default'])("filtering gogovan delivery schedule", function () {
    visit("/offers/scheduled/gogovan");

    andThen(function () {
      equal(currentURL(), "/offers/scheduled/gogovan");

      var option = find('.dynamic_filter select option:contains("After next week (1)")').val();
      $('.dynamic_filter select').val(option).change();

      andThen(function () {
        equal($.trim(find('.dynamic_filter select :selected').text()), "After next week (1)");
        equal(find("ul.list li").length, 1);
        equal(find("ul.list img").length, 1);
        equal($('.time_indicator').text().indexOf('Van ordered') > 0, true);
      });
    });
  });

  (0, _goodcityTestsHelpersTestSkip['default'])("viewing other delivery schedule", function () {
    visit("/offers/scheduled/other_delivery");

    andThen(function () {
      equal(currentURL(), "/offers/scheduled/other_delivery");
      equal(find("ul.list li").length, 1);
      equal(find("ul.list img").length, 1);
      equal($('.time_indicator').text().indexOf('Drop-off') > 0, true);
    });
  });
});
define('goodcity/tests/acceptance/scheduled-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/scheduled-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/scheduled-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/search-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'ember-data-factory-guy', 'ember-data-factory-guy/factory-guy-test-helper'], function (exports, _ember, _goodcityTestsHelpersStartApp, _emberDataFactoryGuy, _emberDataFactoryGuyFactoryGuyTestHelper) {

  var App, offer, user, ggvOrder, delivery, address, contact, item;

  module('Search Offers', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])({}, 2);
      _emberDataFactoryGuyFactoryGuyTestHelper['default'].setup();
      _ember['default'].run.debounce = function (context, func) {
        return func.call(context);
      };

      user = _emberDataFactoryGuy['default'].make("user", { firstName: "John", mobile: "99999999" });
      offer = _emberDataFactoryGuy['default'].make("offer_with_items", { state: "scheduled", createdBy: user });
      item = _emberDataFactoryGuy['default'].make("item", { offer: offer, state: "accepted" });

      ggvOrder = _emberDataFactoryGuy['default'].make("gogovan_active_order");
      contact = _emberDataFactoryGuy['default'].make("contact");
      delivery = _emberDataFactoryGuy['default'].make("delivery", { gogovanOrder: ggvOrder, offer: offer, contact: contact });
      address = _emberDataFactoryGuy['default'].make("address", { 'addressable': contact });
    },
    afterEach: function afterEach() {
      Em.run(function () {
        _emberDataFactoryGuyFactoryGuyTestHelper['default'].teardown();
      });
      _ember['default'].run(App, 'destroy');
    }
  });

  test("search offers by donor name", function () {
    visit("/search");

    andThen(function () {
      equal(currentURL(), "/search");
      fillIn('#searchText', user.get("firstName"));

      andThen(function () {
        equal(find('ul li').length, 1);
      });
    });
  });

  test("search offers by item description", function () {
    visit("/search");

    andThen(function () {
      equal(currentURL(), "/search");
      fillIn('#searchText', item.get("donorDescription"));

      andThen(function () {
        equal(find('ul li').length, 1);
      });
    });
  });

  test("search offers by donor mobile", function () {
    visit("/search");

    andThen(function () {
      equal(currentURL(), "/search");
      fillIn('#searchText', user.get("mobile"));

      andThen(function () {
        equal(find('ul li').length, 1);
      });
    });
  });

  test("search offers by vehicle number", function () {
    visit("/search");

    andThen(function () {
      equal(currentURL(), "/search");
      fillIn('#searchText', ggvOrder.get("driverLicense"));

      andThen(function () {
        equal(find('ul li').length, 1);
        equal(find('ul li img').length, 1);
      });
    });
  });

  test("search offers by delivery address", function () {

    visit("/search");

    andThen(function () {
      equal(currentURL(), "/search");
      _ember['default'].run(function () {
        fillIn('#searchText', address.get("flat"));
      });

      andThen(function () {
        equal(find('ul li').length, 1);
        equal(find('ul li img').length, 1);
      });
    });
  });
});
define('goodcity/tests/acceptance/search-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/search-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/search-test.js should pass jshint.');
  });
});
define('goodcity/tests/acceptance/subscriptions-test', ['exports', 'ember', 'goodcity/tests/helpers/start-app', 'goodcity/tests/helpers/empty-sync-data-stub', 'ember-data-factory-guy', 'ember-data-factory-guy/factory-guy-test-helper'], function (exports, _ember, _goodcityTestsHelpersStartApp, _goodcityTestsHelpersEmptySyncDataStub, _emberDataFactoryGuy, _emberDataFactoryGuyFactoryGuyTestHelper) {

  var App;

  module('Subscriptions', {
    beforeEach: function beforeEach() {
      App = (0, _goodcityTestsHelpersStartApp['default'])();
      _emberDataFactoryGuyFactoryGuyTestHelper['default'].setup();
      (0, _goodcityTestsHelpersEmptySyncDataStub['default'])(_emberDataFactoryGuyFactoryGuyTestHelper['default']);
    },
    afterEach: function afterEach() {
      Em.run(function () {
        _emberDataFactoryGuyFactoryGuyTestHelper['default'].teardown();
      });
      _ember['default'].run(App, 'destroy');
    }
  });

  test("updateStore doesn't process before response to model.save request", function () {
    expect(2);

    var store = _emberDataFactoryGuy['default'].store;
    var subscriptions = lookup('controller:subscriptions');
    var user = _emberDataFactoryGuy['default'].make('user');
    _emberDataFactoryGuy['default'].make('user_profile', { id: user.id });
    var offer = { id: 2 };

    $.mockjaxSettings.logging = true;
    $.mockjax({ url: "/api/v1/offer*", status: 201, response: function response() {
        _ember['default'].run(function () {
          subscriptions.update_store({
            item: { "offer": offer },
            sender: { "user": user.toJSON({ includeId: true }) },
            operation: "create"
          }, function () {});
        });
        this.responseText = { "offer": offer };
      } });

    _ember['default'].run(function () {
      store.createRecord("offer", { createdBy: user }).save().then(function () {
        equal(store.peekAll("offer").get("length"), 1);
        equal(store.peekAll("offer").get("firstObject.id"), offer.id);
      });
    });

    // causes test to wait for next ember run loop before completing
    andThen(function () {});
  });
});
define('goodcity/tests/acceptance/subscriptions-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/subscriptions-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/subscriptions-test.js should pass jshint.');
  });
});
define('goodcity/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('goodcity/tests/components/add-holiday.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/add-holiday.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/add-holiday.js should pass jshint.');
  });
});
define('goodcity/tests/components/auto-resize-textarea.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/auto-resize-textarea.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/auto-resize-textarea.js should pass jshint.');
  });
});
define('goodcity/tests/components/cancel-offer.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/cancel-offer.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/cancel-offer.js should pass jshint.');
  });
});
define('goodcity/tests/components/complete-receive-offer.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/complete-receive-offer.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/complete-receive-offer.js should pass jshint.');
  });
});
define('goodcity/tests/components/complete-review-offer.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/complete-review-offer.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/complete-review-offer.js should pass jshint.');
  });
});
define('goodcity/tests/components/custom-select2.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/custom-select2.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/custom-select2.js should pass jshint.');
  });
});
define('goodcity/tests/components/focus-textfield.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/focus-textfield.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/focus-textfield.js should pass jshint.');
  });
});
define('goodcity/tests/components/holiday-calender.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/holiday-calender.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/holiday-calender.js should pass jshint.');
  });
});
define('goodcity/tests/components/holiday-detail.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/holiday-detail.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/holiday-detail.js should pass jshint.');
  });
});
define('goodcity/tests/components/inactive-offer.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/inactive-offer.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/inactive-offer.js should pass jshint.');
  });
});
define('goodcity/tests/components/inventory-number-input.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/inventory-number-input.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/inventory-number-input.js should pass jshint.');
  });
});
define('goodcity/tests/components/offer-status-message.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/offer-status-message.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/offer-status-message.js should pass jshint.');
  });
});
define('goodcity/tests/components/package-image.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/package-image.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/package-image.js should pass jshint.');
  });
});
define('goodcity/tests/components/radio-text-input.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/radio-text-input.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/radio-text-input.js should pass jshint.');
  });
});
define('goodcity/tests/components/receive-item.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/receive-item.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/receive-item.js should pass jshint.');
  });
});
define('goodcity/tests/components/receive-menu.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/receive-menu.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/receive-menu.js should pass jshint.');
  });
});
define('goodcity/tests/components/reject-message-field.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/reject-message-field.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/reject-message-field.js should pass jshint.');
  });
});
define('goodcity/tests/components/schedule-selection.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/schedule-selection.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/schedule-selection.js should pass jshint.');
  });
});
define('goodcity/tests/components/twilio-make-call.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/twilio-make-call.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/twilio-make-call.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/finished.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/finished.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/finished.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/finished/cancelled.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/finished');
  QUnit.test('controllers/finished/cancelled.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/finished/cancelled.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/finished/inactive.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/finished');
  QUnit.test('controllers/finished/inactive.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/finished/inactive.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/finished/received.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/finished');
  QUnit.test('controllers/finished/received.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/finished/received.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/holidays.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/holidays.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/holidays.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/in_progress.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/in_progress.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/in_progress.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/in_progress/reviewed.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/in_progress');
  QUnit.test('controllers/in_progress/reviewed.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/in_progress/reviewed.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/in_progress/reviewing.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/in_progress');
  QUnit.test('controllers/in_progress/reviewing.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/in_progress/reviewing.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/internet_call_status.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/internet_call_status.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/internet_call_status.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/item_types.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/item_types.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/item_types.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/my_list.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/my_list.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/my_list.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/my_list/finished.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/my_list');
  QUnit.test('controllers/my_list/finished.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/my_list/finished.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/my_list/reviewed.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/my_list');
  QUnit.test('controllers/my_list/reviewed.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/my_list/reviewed.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/my_list/reviewing.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/my_list');
  QUnit.test('controllers/my_list/reviewing.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/my_list/reviewing.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/my_list/scheduled.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/my_list');
  QUnit.test('controllers/my_list/scheduled.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/my_list/scheduled.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/my_notifications.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/my_notifications.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/my_notifications.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/notification_link.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/notification_link.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/notification_link.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/offer/cancel_gogovan.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/offer');
  QUnit.test('controllers/offer/cancel_gogovan.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/offer/cancel_gogovan.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/offer/donor_messages.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/offer');
  QUnit.test('controllers/offer/donor_messages.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/offer/donor_messages.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/offer/merge.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/offer');
  QUnit.test('controllers/offer/merge.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/offer/merge.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/offer/supervisor_messages.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/offer');
  QUnit.test('controllers/offer/supervisor_messages.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/offer/supervisor_messages.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/offer/transport_details.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/offer');
  QUnit.test('controllers/offer/transport_details.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/offer/transport_details.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/offers.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/offers.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/offers.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/offers/receiving.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/offers');
  QUnit.test('controllers/offers/receiving.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/offers/receiving.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/offers/submitted.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/offers');
  QUnit.test('controllers/offers/submitted.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/offers/submitted.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/receive_package.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/receive_package.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/receive_package.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/review_item.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/review_item.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/review_item.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/review_item/accept.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/review_item');
  QUnit.test('controllers/review_item/accept.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/review_item/accept.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/review_item/donor_messages.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/review_item');
  QUnit.test('controllers/review_item/donor_messages.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/review_item/donor_messages.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/review_item/reject.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/review_item');
  QUnit.test('controllers/review_item/reject.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/review_item/reject.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/review_item/supervisor_messages.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/review_item');
  QUnit.test('controllers/review_item/supervisor_messages.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/review_item/supervisor_messages.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/review_offer.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/review_offer.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/review_offer.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/review_offer/donor_details.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/review_offer');
  QUnit.test('controllers/review_offer/donor_details.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/review_offer/donor_details.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/review_offer/items.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/review_offer');
  QUnit.test('controllers/review_offer/items.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/review_offer/items.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/review_offer/logistics.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/review_offer');
  QUnit.test('controllers/review_offer/logistics.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/review_offer/logistics.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/review_offer/receive.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/review_offer');
  QUnit.test('controllers/review_offer/receive.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/review_offer/receive.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/scheduled.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/scheduled.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/scheduled.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/scheduled/collection.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/scheduled');
  QUnit.test('controllers/scheduled/collection.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/scheduled/collection.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/scheduled/gogovan.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/scheduled');
  QUnit.test('controllers/scheduled/gogovan.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/scheduled/gogovan.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/scheduled/other_delivery.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/scheduled');
  QUnit.test('controllers/scheduled/other_delivery.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/scheduled/other_delivery.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/search.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/search.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/search.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/search_label.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/search_label.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/search_label.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/user.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/user.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/user.js should pass jshint.');
  });
});
define('goodcity/tests/controllers/users.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/users.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/users.js should pass jshint.');
  });
});
define('goodcity/tests/factories/address', ['exports', 'ember-data-factory-guy'], function (exports, _emberDataFactoryGuy) {

  _emberDataFactoryGuy['default'].define('address', {
    sequences: {
      id: function id(num) {
        return num + 100;
      }
    },

    'default': {
      id: _emberDataFactoryGuy['default'].generate('id'),
      flat: "901-B",
      building: "Plaza",
      street: "Palace Street",
      addressType: "colletion",

      addressableType: "Contact",
      addressable: _emberDataFactoryGuy['default'].belongsTo("contact")
    }
  });

  exports['default'] = {};
});
define('goodcity/tests/factories/address.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/address.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/address.js should pass jshint.');
  });
});
define("goodcity/tests/factories/cancellation_reason", ["exports", "ember-data-factory-guy"], function (exports, _emberDataFactoryGuy) {
  var reason_list = ["donated else", "bulky"];

  _emberDataFactoryGuy["default"].define('cancellation_reason', {
    sequences: {
      name: function name() {
        return reason_list[Math.floor(Math.random() * reason_list.length)];
      }
    },
    "default": {
      name: _emberDataFactoryGuy["default"].generate("name")
    }
  });

  exports["default"] = {};
});
define('goodcity/tests/factories/cancellation_reason.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/cancellation_reason.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/cancellation_reason.js should pass jshint.');
  });
});
define('goodcity/tests/factories/contact', ['exports', 'ember-data-factory-guy', 'goodcity/tests/factories/mobile'], function (exports, _emberDataFactoryGuy, _goodcityTestsFactoriesMobile) {

  _emberDataFactoryGuy['default'].define('contact', {
    sequences: {
      name: function name(num) {
        return 'Daniel' + num;
      }
    },
    'default': {
      name: _emberDataFactoryGuy['default'].generate('name'),
      mobile: _emberDataFactoryGuy['default'].generate(_goodcityTestsFactoriesMobile['default'].nonHongKong)
    }
  });
  exports['default'] = {};
});
define('goodcity/tests/factories/contact.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/contact.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/contact.js should pass jshint.');
  });
});
define("goodcity/tests/factories/crossroads_transport", ["exports", "ember-data-factory-guy"], function (exports, _emberDataFactoryGuy) {
  var types = ["1/8 Truck", "2/8 Truck", "8/8 Truck"];

  _emberDataFactoryGuy["default"].define('crossroads_transport', {
    "default": {
      name: _emberDataFactoryGuy["default"].generate(function () {
        return types[Math.floor(Math.random() * types.length)];
      }),
      cost: 200
    }
  });

  exports["default"] = {};
});
define('goodcity/tests/factories/crossroads_transport.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/crossroads_transport.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/crossroads_transport.js should pass jshint.');
  });
});
define("goodcity/tests/factories/delivery", ["exports", "ember-data-factory-guy"], function (exports, _emberDataFactoryGuy) {
  var conditions = ["Gogovan", "Drop Off", "Alternate"];

  _emberDataFactoryGuy["default"].define('delivery', {
    "default": {
      deliveryType: _emberDataFactoryGuy["default"].generate(function (num) {
        return conditions[num];
      }),
      contact: _emberDataFactoryGuy["default"].belongsTo("contact"),
      schedule: _emberDataFactoryGuy["default"].belongsTo("schedule")
    }
  });

  exports["default"] = {};
});
define('goodcity/tests/factories/delivery.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/delivery.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/delivery.js should pass jshint.');
  });
});
define("goodcity/tests/factories/district", ["exports", "ember-data-factory-guy"], function (exports, _emberDataFactoryGuy) {
  var district_list = ["Yuen Long", "Kwu Tung", "Tai Wai", "Taipo", "Tai Tong", "Tai Tam"];

  _emberDataFactoryGuy["default"].define('district', {
    sequences: {
      district_name: function district_name(num) {
        return district_list[num - 1];
      }
    },

    "default": { name: _emberDataFactoryGuy["default"].generate("district_name"),
      territory_id: 1
    },
    district_belongs_territory: {
      territory: _emberDataFactoryGuy["default"].belongsTo('territory')
    }
  });
  exports["default"] = {};
});
define('goodcity/tests/factories/district.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/district.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/district.js should pass jshint.');
  });
});
define("goodcity/tests/factories/donor_condition", ["exports", "ember-data-factory-guy"], function (exports, _emberDataFactoryGuy) {
  var conditions = ["New", "Lightly Used", "Heavily Used", "Broken"];

  _emberDataFactoryGuy["default"].define('donor_condition', {
    "default": {
      name: _emberDataFactoryGuy["default"].generate(function (num) {
        return conditions[num] + num;
      })
    }
  });

  exports["default"] = {};
});
define('goodcity/tests/factories/donor_condition.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/donor_condition.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/donor_condition.js should pass jshint.');
  });
});
define('goodcity/tests/factories/gogovan_order', ['exports', 'ember-data-factory-guy', 'goodcity/tests/factories/mobile'], function (exports, _emberDataFactoryGuy, _goodcityTestsFactoriesMobile) {

  _emberDataFactoryGuy['default'].define('gogovan_order', {
    sequences: {
      id: function id(num) {
        return num + 100;
      },
      collectionName: function collectionName(num) {
        return 'Daniel' + num + ' Stepp' + num;
      },
      driverName: function driverName(num) {
        return 'Driver' + num + ' Ggv' + num;
      }
    },

    'default': {
      id: _emberDataFactoryGuy['default'].generate('id'),
      name: _emberDataFactoryGuy['default'].generate('collectionName'),
      mobile: _emberDataFactoryGuy['default'].generate(_goodcityTestsFactoriesMobile['default'].hongKong),
      status: 'pending',

      delivery: _emberDataFactoryGuy['default'].belongsTo("delivery"),
      createdAt: new Date(2015, 0, 20, 13, 10),
      updatedAt: new Date(2015, 0, 20, 13, 11)
    },

    gogovan_active_order: {
      price: 120.0,
      driverName: _emberDataFactoryGuy['default'].generate('driverName'),
      driverMobile: _emberDataFactoryGuy['default'].generate(_goodcityTestsFactoriesMobile['default'].hongKong),
      driverLicense: 'VH1002',
      status: 'active'
    }
  });

  exports['default'] = {};
});
define('goodcity/tests/factories/gogovan_order.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/gogovan_order.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/gogovan_order.js should pass jshint.');
  });
});
define("goodcity/tests/factories/gogovan_transport", ["exports", "ember-data-factory-guy"], function (exports, _emberDataFactoryGuy) {
  var types = ["Van", "5.5t Truck", "Disable"];

  _emberDataFactoryGuy["default"].define('gogovan_transport', {
    "default": {
      name: _emberDataFactoryGuy["default"].generate(function () {
        return types[Math.floor(Math.random() * types.length)];
      }),
      disabled: false
    }
  });

  exports["default"] = {};
});
define('goodcity/tests/factories/gogovan_transport.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/gogovan_transport.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/gogovan_transport.js should pass jshint.');
  });
});
define('goodcity/tests/factories/holiday', ['exports', 'ember-data-factory-guy'], function (exports, _emberDataFactoryGuy) {

  _emberDataFactoryGuy['default'].define('holiday', {
    sequences: {
      name: function name(num) {
        return 'Holiday_' + num;
      }
    },

    'default': {
      name: _emberDataFactoryGuy['default'].generate('name'),
      holiday: new Date(2016, 0, 20, 13, 11),
      year: 2016
    }

  });
  exports['default'] = {};
});
define('goodcity/tests/factories/holiday.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/holiday.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/holiday.js should pass jshint.');
  });
});
define('goodcity/tests/factories/image', ['exports', 'ember-data-factory-guy'], function (exports, _emberDataFactoryGuy) {
  _emberDataFactoryGuy['default'].define('image', {
    sequences: {
      cloudinaryId: function cloudinaryId(num) {
        return "1407764294/default/test_image" + num + ".jpg";
      }
    },
    'default': {
      cloudinaryId: _emberDataFactoryGuy['default'].generate('cloudinaryId'),
      favourite: false
    }
  });

  exports['default'] = {};
});
define('goodcity/tests/factories/image.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/image.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/image.js should pass jshint.');
  });
});
define('goodcity/tests/factories/item', ['exports', 'ember-data-factory-guy', 'goodcity/tests/factories/offer', 'goodcity/tests/factories/package_type'], function (exports, _emberDataFactoryGuy, _goodcityTestsFactoriesOffer, _goodcityTestsFactoriesPackage_type) {

  _emberDataFactoryGuy['default'].define('item', {
    sequences: {
      id: function id(num) {
        return num + 100;
      },
      description: function description(num) {
        return 'Donor Description' + num;
      }
    },
    'default': {
      id: _emberDataFactoryGuy['default'].generate('id'),
      state: 'submitted',
      createdAt: '12/01/2014',
      updatedAt: '12/01/2014',
      donorDescription: _emberDataFactoryGuy['default'].generate("description"),
      donorCondition: _emberDataFactoryGuy['default'].belongsTo('donor_condition')
    },
    item_with_offer: {
      offer: _emberDataFactoryGuy['default'].belongsTo('offer')
    },
    item_with_type: {
      packageType: _emberDataFactoryGuy['default'].belongsTo('package_type')
    }
  });

  exports['default'] = {};
});
define('goodcity/tests/factories/item.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/item.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/item.js should pass jshint.');
  });
});
define('goodcity/tests/factories/location', ['exports', 'ember-data-factory-guy'], function (exports, _emberDataFactoryGuy) {

  _emberDataFactoryGuy['default'].define('location', {
    'default': {
      building: _emberDataFactoryGuy['default'].generate(function (num) {
        return "building" + num;
      }),

      area: _emberDataFactoryGuy['default'].generate(function (num) {
        return "area" + num;
      }),

      stockitId: _emberDataFactoryGuy['default'].generate(function (num) {
        return 100 + num;
      })
    }
  });

  exports['default'] = {};
});
define('goodcity/tests/factories/location.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/location.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/location.js should pass jshint.');
  });
});
define('goodcity/tests/factories/message', ['exports', 'ember-data-factory-guy'], function (exports, _emberDataFactoryGuy) {

  _emberDataFactoryGuy['default'].define('message', {
    sequences: {
      id: function id(num) {
        return num + 100;
      }
    },

    'default': {
      id: _emberDataFactoryGuy['default'].generate('id'),
      offer: _emberDataFactoryGuy['default'].belongsTo("offer"),
      item: _emberDataFactoryGuy['default'].belongsTo("item"),
      sender: _emberDataFactoryGuy['default'].belongsTo("user"),
      state: 'unread',
      isPrivate: false,
      body: "Message Example Test",
      createdAt: new Date()
    }
  });

  exports['default'] = {};
});
define('goodcity/tests/factories/message.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/message.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/message.js should pass jshint.');
  });
});
define("goodcity/tests/factories/mobile", ["exports"], function (exports) {
  exports["default"] = {
    hongKong: function hongKong() {
      return Math.floor(Math.random() * 8999922 + 67110000).toString();
    },

    nonHongKong: function nonHongKong() {
      return Math.floor(Math.random() * 8999922 + 671100001).toString();
    }
  };
});
define('goodcity/tests/factories/mobile.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/mobile.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/mobile.js should pass jshint.');
  });
});
define('goodcity/tests/factories/offer', ['exports', 'ember-data-factory-guy', 'goodcity/tests/factories/item'], function (exports, _emberDataFactoryGuy, _goodcityTestsFactoriesItem) {

  _emberDataFactoryGuy['default'].define('offer', {
    sequences: {
      id: function id(num) {
        return num + 100;
      }
    },

    'default': {
      id: _emberDataFactoryGuy['default'].generate('id'),
      language: 'en',
      state: 'draft',
      origin: 'trial',
      stairs: true,
      parking: true,
      estimatedSize: '12cm',
      notes: 'dummy text',
      createdBy: _emberDataFactoryGuy['default'].belongsTo("user"),
      reviewedBy: _emberDataFactoryGuy['default'].belongsTo("user"),
      closedBy: _emberDataFactoryGuy['default'].belongsTo("user"),
      delivery: _emberDataFactoryGuy['default'].belongsTo("delivery"),
      createdAt: new Date(2015, 0, 20, 13, 10),
      updatedAt: new Date(2015, 0, 20, 13, 11)
    },
    offer_with_items: {
      items: _emberDataFactoryGuy['default'].hasMany('item', 2)
    }
  });

  exports['default'] = {};
});
define('goodcity/tests/factories/offer.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/offer.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/offer.js should pass jshint.');
  });
});
define('goodcity/tests/factories/package', ['exports', 'ember-data-factory-guy', 'goodcity/tests/factories/item', 'goodcity/tests/factories/package_type'], function (exports, _emberDataFactoryGuy, _goodcityTestsFactoriesItem, _goodcityTestsFactoriesPackage_type) {

  _emberDataFactoryGuy['default'].define('package', {
    sequences: {
      id: function id(num) {
        return num + 100;
      }
    },
    'default': {
      id: _emberDataFactoryGuy['default'].generate('id'),
      quantity: 1,
      length: 10,
      width: 10,
      height: 10,
      item: _emberDataFactoryGuy['default'].belongsTo('item'),
      packageType: _emberDataFactoryGuy['default'].belongsTo('package_type'),
      notes: "example"
    }
  });

  exports['default'] = {};
});
define('goodcity/tests/factories/package.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/package.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/package.js should pass jshint.');
  });
});
define('goodcity/tests/factories/package_type', ['exports', 'ember-data-factory-guy'], function (exports, _emberDataFactoryGuy) {

  _emberDataFactoryGuy['default'].define('package_type', {
    sequences: {
      id: function id(num) {
        return num + 100;
      },
      name: function name(num) {
        return 'Category' + num;
      },
      code: function code(num) {
        return num;
      }
    },
    'default': {
      id: _emberDataFactoryGuy['default'].generate('id'),
      name: _emberDataFactoryGuy['default'].generate("name"),
      code: "ABC",
      defaultChildPackages: "ABC",
      otherChildPackages: "ABC"
    }
  });

  exports['default'] = {};
});
define('goodcity/tests/factories/package_type.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/package_type.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/package_type.js should pass jshint.');
  });
});
define("goodcity/tests/factories/permission", ["exports", "ember-data-factory-guy"], function (exports, _emberDataFactoryGuy) {
  var permission_list = ["Reviewer", "Supervisor"];

  _emberDataFactoryGuy["default"].define('permission', {
    sequences: {
      name: function name() {
        return permission_list[Math.floor(Math.random() * permission_list.length)];
      }
    },
    "default": null
  });

  exports["default"] = {};
});
define('goodcity/tests/factories/permission.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/permission.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/permission.js should pass jshint.');
  });
});
define("goodcity/tests/factories/rejection_reason", ["exports", "ember-data-factory-guy"], function (exports, _emberDataFactoryGuy) {
  var reason_list = ["Quality", "Size", "Supply/Demand"];

  _emberDataFactoryGuy["default"].define('rejection_reason', {
    sequences: {
      name: function name() {
        return reason_list[Math.floor(Math.random() * reason_list.length)];
      }
    },
    "default": {
      name: _emberDataFactoryGuy["default"].generate("name")
    }
  });

  exports["default"] = {};
});
define('goodcity/tests/factories/rejection_reason.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/rejection_reason.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/rejection_reason.js should pass jshint.');
  });
});
define('goodcity/tests/factories/schedule', ['exports', 'ember-data-factory-guy'], function (exports, _emberDataFactoryGuy) {

  _emberDataFactoryGuy['default'].define('schedule', {
    sequences: {
      id: function id(num) {
        return num + 100;
      },
      name: function name(num) {
        return 'Daniel' + num;
      },
      slot: function slot(num) {
        return num;
      }
    },
    'default': {
      id: _emberDataFactoryGuy['default'].generate('id'),
      resource: _emberDataFactoryGuy['default'].generate('name'),
      slot: _emberDataFactoryGuy['default'].generate('slot'),
      slotName: 'Afternoon, 2pm-4pm',
      zone: 'zone',
      scheduledAt: new Date(new Date().setDate(new Date().getDate() - 1))
    }
  });
  exports['default'] = {};
});
define('goodcity/tests/factories/schedule.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/schedule.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/schedule.js should pass jshint.');
  });
});
define('goodcity/tests/factories/territory', ['exports', 'ember-data-factory-guy', 'goodcity/tests/factories/district'], function (exports, _emberDataFactoryGuy, _goodcityTestsFactoriesDistrict) {
  var territory_list = ["", "New Territories", "Hong Kong Island", "Kowloon"];

  _emberDataFactoryGuy['default'].define('territory', {
    sequences: {
      territory_name: function territory_name() {
        return territory_list[Math.floor(Math.random() * territory_list.length)];
      }
    },
    'default': {
      name: _emberDataFactoryGuy['default'].generate("territory_name")
    },
    territory_with_many_districts: {
      districts: _emberDataFactoryGuy['default'].hasMany('district', 6)
    }
  });

  exports['default'] = {};
});
define('goodcity/tests/factories/territory.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/territory.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/territory.js should pass jshint.');
  });
});
define("goodcity/tests/factories/timeslot", ["exports", "ember-data-factory-guy"], function (exports, _emberDataFactoryGuy) {
  var timeslots = ["9AM-11AM", "11AM-1PM", "2PM-4PM", "4PM-6PM"];

  _emberDataFactoryGuy["default"].define('timeslot', {
    "default": {
      name: _emberDataFactoryGuy["default"].generate(function () {
        return timeslots[Math.floor(Math.random() * timeslots.length)];
      })
    }
  });

  exports["default"] = {};
});
define('goodcity/tests/factories/timeslot.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/timeslot.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/timeslot.js should pass jshint.');
  });
});
define('goodcity/tests/factories/user', ['exports', 'ember-data-factory-guy', 'goodcity/tests/factories/image', 'goodcity/tests/factories/mobile'], function (exports, _emberDataFactoryGuy, _goodcityTestsFactoriesImage, _goodcityTestsFactoriesMobile) {

  _emberDataFactoryGuy['default'].define('user', {
    sequences: {
      id: function id(num) {
        return num + 100;
      },
      collectionFirstName: function collectionFirstName(num) {
        return 'Daniel' + num;
      },
      collectionLastName: function collectionLastName(num) {
        return 'Stepp' + num;
      }
    },
    'default': {
      id: _emberDataFactoryGuy['default'].generate('id'),
      firstName: _emberDataFactoryGuy['default'].generate('collectionFirstName'),
      lastName: _emberDataFactoryGuy['default'].generate('collectionLastName'),
      mobile: _emberDataFactoryGuy['default'].generate(_goodcityTestsFactoriesMobile['default'].hongKong)
    },
    user_with_image: {
      image: _emberDataFactoryGuy['default'].belongsTo('image')
    }
  });
  exports['default'] = {};
});
define('goodcity/tests/factories/user.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/user.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/user.js should pass jshint.');
  });
});
define('goodcity/tests/factories/user_profile', ['exports', 'ember-data-factory-guy', 'goodcity/tests/factories/mobile'], function (exports, _emberDataFactoryGuy, _goodcityTestsFactoriesMobile) {

  _emberDataFactoryGuy['default'].define('user_profile', {
    sequences: {
      collectionFirstName: function collectionFirstName(num) {
        return 'Daniel' + num;
      },
      collectionLastName: function collectionLastName(num) {
        return 'Stepp' + num;
      }
    },
    'default': {
      firstName: _emberDataFactoryGuy['default'].generate('collectionFirstName'),
      lastName: _emberDataFactoryGuy['default'].generate('collectionLastName')
    },
    with_non_hk_mobile: {
      mobile: _emberDataFactoryGuy['default'].generate(_goodcityTestsFactoriesMobile['default'].nonHongKong),
      district_id: 1
    },
    with_hk_mobile: {
      mobile: _emberDataFactoryGuy['default'].generate(_goodcityTestsFactoriesMobile['default'].hongKong),
      district_id: 2
    }
  });
  exports['default'] = {};
});
define('goodcity/tests/factories/user_profile.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/user_profile.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/user_profile.js should pass jshint.');
  });
});
define("goodcity/tests/factories/version", ["exports", "ember-data-factory-guy"], function (exports, _emberDataFactoryGuy) {
  var event_list = ["create", "update"];

  _emberDataFactoryGuy["default"].define('version', {
    sequences: {
      event: function event() {
        return event_list[Math.floor(Math.random() * event_list.length)];
      }
    },
    "default": null
  });

  exports["default"] = {};
});
define('goodcity/tests/factories/version.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - factories');
  QUnit.test('factories/version.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'factories/version.js should pass jshint.');
  });
});
define('goodcity/tests/helpers/custom-helpers', ['exports', 'ember-data-factory-guy', 'goodcity/tests/factories/user'], function (exports, _emberDataFactoryGuy, _goodcityTestsFactoriesUser) {
  exports['default'] = (function () {
    Ember.Test.registerAsyncHelper('loginUser', function (app, url) {
      var hk_user;
      hk_user = _emberDataFactoryGuy['default'].build('with_hk_mobile');
      var authToken = window.localStorage.authToken;
      visit(url);
      fillIn('input#mobile', hk_user.mobile);
      click($("#getsmscode")[0]);
      andThen(function () {
        equal(currentURL(), "/authenticate");
        fillIn('input#pin', "123456");
        click($("#submit_pin")[0]);
        window.localStorage.authToken = authToken;
      });
    });

    Ember.Test.registerAsyncHelper('logoutUser', function (app, url) {
      visit(url);
      andThen(function () {
        var ele_logout = $("a:contains('Logout')");
        if (ele_logout.length > 0) {
          click(ele_logout[0]);
        }
      });
    });

    Ember.Test.registerHelper('lookup', function (app, name) {
      return app.__container__.lookup(name);
    });

    Ember.Test.registerHelper('runloopFix', function (app, callbackFunction) {
      var callback = function callback() {
        Ember.run(callbackFunction);
      };
      Ember.run.scheduleOnce('afterRender', this, callback);
    });
  })();
});
define('goodcity/tests/helpers/custom-helpers.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/custom-helpers.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/custom-helpers.js should pass jshint.');
  });
});
define('goodcity/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('goodcity/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/destroy-app.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('goodcity/tests/helpers/ember-i18n/test-helpers', ['exports', 'ember'], function (exports, _ember) {

  // example usage: find(`.header:contains(${t('welcome_message')})`)
  _ember['default'].Test.registerHelper('t', function (app, key, interpolations) {
    var i18n = app.__container__.lookup('service:i18n');
    return i18n.t(key, interpolations);
  });

  // example usage: expectTranslation('.header', 'welcome_message');
  _ember['default'].Test.registerHelper('expectTranslation', function (app, element, key, interpolations) {
    var text = app.testHelpers.t(key, interpolations);

    assertTranslation(element, key, text);
  });

  var assertTranslation = (function () {
    if (typeof QUnit !== 'undefined' && typeof ok === 'function') {
      return function (element, key, text) {
        ok(find(element + ':contains(' + text + ')').length, 'Found translation key ' + key + ' in ' + element);
      };
    } else if (typeof expect === 'function') {
      return function (element, key, text) {
        var found = !!find(element + ':contains(' + text + ')').length;
        expect(found).to.equal(true);
      };
    } else {
      return function () {
        throw new Error("ember-i18n could not find a compatible test framework");
      };
    }
  })();
});
define('goodcity/tests/helpers/empty-sync-data-stub', ['exports', 'goodcity/config/environment', 'goodcity/tests/factories/territory', 'goodcity/tests/factories/address', 'goodcity/tests/factories/contact', 'goodcity/tests/factories/schedule', 'goodcity/tests/factories/delivery', 'goodcity/tests/factories/gogovan_order', 'goodcity/tests/factories/offer', 'goodcity/tests/factories/package_type', 'goodcity/tests/factories/package', 'goodcity/tests/factories/donor_condition', 'goodcity/tests/factories/rejection_reason', 'goodcity/tests/factories/permission', 'goodcity/tests/factories/user_profile', 'goodcity/tests/factories/timeslot', 'goodcity/tests/factories/gogovan_transport', 'goodcity/tests/factories/crossroads_transport', 'goodcity/tests/factories/message', 'goodcity/tests/factories/version'], function (exports, _goodcityConfigEnvironment, _goodcityTestsFactoriesTerritory, _goodcityTestsFactoriesAddress, _goodcityTestsFactoriesContact, _goodcityTestsFactoriesSchedule, _goodcityTestsFactoriesDelivery, _goodcityTestsFactoriesGogovan_order, _goodcityTestsFactoriesOffer, _goodcityTestsFactoriesPackage_type, _goodcityTestsFactoriesPackage, _goodcityTestsFactoriesDonor_condition, _goodcityTestsFactoriesRejection_reason, _goodcityTestsFactoriesPermission, _goodcityTestsFactoriesUser_profile, _goodcityTestsFactoriesTimeslot, _goodcityTestsFactoriesGogovan_transport, _goodcityTestsFactoriesCrossroads_transport, _goodcityTestsFactoriesMessage, _goodcityTestsFactoriesVersion) {
  exports['default'] = function (testHelper) {
    _goodcityConfigEnvironment['default'].APP.PRELOAD_TYPES.concat(_goodcityConfigEnvironment['default'].APP.PRELOAD_AUTHORIZED_TYPES).forEach(function (type) {
      testHelper.mockFindAll(type, 0);
    });

    var data = { "addresses": [{ "id": 2, "street": "Yasmeen Rapid", "flat": "Suite 590", "building": "06932", "district_id": 67, "addressable_id": 2, "addressable_type": "User" }],
      "user_profile": { "id": 2, "first_name": "David", "last_name": "Dara51", "mobile": "51111111", "address_id": 2, "image_id": null, "permission_id": null } };

    $.mockjax({ url: "/api/v1/auth/current_user_profil*",
      responseText: data });

    //hide sync-data related mocks from console, but show test related mocks
    $.mockjaxSettings.logging = false;
    testHelper.container.lookup("router:main").one('didTransition', function () {
      $.mockjaxSettings.logging = true;
    });
  };
});
define('goodcity/tests/helpers/empty-sync-data-stub.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/empty-sync-data-stub.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/empty-sync-data-stub.js should pass jshint.');
  });
});
define('goodcity/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'goodcity/tests/helpers/start-app', 'goodcity/tests/helpers/destroy-app'], function (exports, _qunit, _goodcityTestsHelpersStartApp, _goodcityTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _goodcityTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }

        (0, _goodcityTestsHelpersDestroyApp['default'])(this.application);
      }
    });
  };
});
define('goodcity/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/module-for-acceptance.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('goodcity/tests/helpers/resolver', ['exports', 'goodcity/resolver', 'goodcity/config/environment'], function (exports, _goodcityResolver, _goodcityConfigEnvironment) {

  var resolver = _goodcityResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _goodcityConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _goodcityConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('goodcity/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/resolver.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('goodcity/tests/helpers/start-app', ['exports', 'ember', 'goodcity/app', 'goodcity/router', 'goodcity/config/environment', 'goodcity/tests/helpers/custom-helpers'], function (exports, _ember, _goodcityApp, _goodcityRouter, _goodcityConfigEnvironment, _goodcityTestsHelpersCustomHelpers) {
  exports['default'] = startApp;

  function startApp(attrs, permissionId) {
    //place setting of localStorage variables here so app doesn't cache values from previous tests

    //auth
    if (permissionId === 2) {
      window.localStorage.authToken = '"pas89df7asjknf"';
      window.localStorage.currentUserId = '"3"';
    } else if (permissionId === 1) {
      window.localStorage.authToken = '"7sakjhf8s6dasd"';
      window.localStorage.currentUserId = '"2"';
    } else {
      window.localStorage.authToken = '"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0MDkwMzgzNjUsImlzcyI6Ikdvb2RDaXR5SEsiLCJleHAiOjE0MTAyNDc5NjUsIm1vYmlsZSI6Iis4NTI2MTA5MjAwMSIsIm90cF9zZWNyZXRfa2V5IjoiemRycGZ4c2VnM3cyeWt2aSJ9.lZQaME1oKw7E5cdfks0jG3A_gxlOZ7VfUVG4IMJbc08"';
      window.localStorage.currentUserId = '"1"';
    }

    var application = undefined;

    var attributes = _ember['default'].merge({}, _goodcityConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _goodcityRouter['default'].reopen({
      location: 'none'
    });

    _ember['default'].run(function () {
      application = _goodcityApp['default'].create(attributes);
      application.__container__.lookup('service:i18n').set("locale", "en");
      application.setupForTesting();
      application.injectTestHelpers();
    });

    window.navigator = { onLine: true, plugins: [] };
    window.alert = function (message) {
      console.log("Alert: " + message);
    };
    window.confirm = function (message) {
      console.log("Confirm: " + message);return true;
    };
    _ember['default'].$("head").append("<style>.loading-indicator, .reveal-modal-bg, .reveal-modal {display:none !important;}</style>");
    lookup("service:logger").error = function (message) {
      return QUnit.assert.equal(message, "");
    };

    //needed by application controller init
    lookup("controller:subscriptions").actions.wire = function () {};

    return application;
  }
});
define('goodcity/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/start-app.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('goodcity/tests/helpers/test-skip', ['exports'], function (exports) {
  exports['default'] = function () {
    QUnit.test(arguments[0] + ' (SKIPPED)', function () {
      QUnit.expect(0); //dont expect any tests
      var li = document.getElementById("qunit-test-output-" + QUnit.config.current.testId);
      QUnit.done(function () {
        li.style.background = '#FFFF99';
      });
    });
  };
});
define('goodcity/tests/helpers/test-skip.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/test-skip.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/test-skip.js should pass jshint.');
  });
});
define('goodcity/tests/mixins/back_navigator.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - mixins');
  QUnit.test('mixins/back_navigator.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/back_navigator.js should pass jshint.');
  });
});
define('goodcity/tests/mixins/scheduled_offers.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - mixins');
  QUnit.test('mixins/scheduled_offers.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/scheduled_offers.js should pass jshint.');
  });
});
define('goodcity/tests/models/location.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/location.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/location.js should pass jshint.');
  });
});
define('goodcity/tests/models/package.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/package.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/package.js should pass jshint.');
  });
});
define('goodcity/tests/models/package_image.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/package_image.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/package_image.js should pass jshint.');
  });
});
define('goodcity/tests/models/package_type.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/package_type.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/package_type.js should pass jshint.');
  });
});
define('goodcity/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('resolver.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('goodcity/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('router.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('goodcity/tests/routes/authenticate.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/authenticate.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/authenticate.js should pass jshint.');
  });
});
define('goodcity/tests/routes/finished/cancelled.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/finished');
  QUnit.test('routes/finished/cancelled.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/finished/cancelled.js should pass jshint.');
  });
});
define('goodcity/tests/routes/finished/inactive.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/finished');
  QUnit.test('routes/finished/inactive.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/finished/inactive.js should pass jshint.');
  });
});
define('goodcity/tests/routes/finished/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/finished');
  QUnit.test('routes/finished/index.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/finished/index.js should pass jshint.');
  });
});
define('goodcity/tests/routes/finished/received.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/finished');
  QUnit.test('routes/finished/received.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/finished/received.js should pass jshint.');
  });
});
define('goodcity/tests/routes/ggv_orders.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/ggv_orders.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/ggv_orders.js should pass jshint.');
  });
});
define('goodcity/tests/routes/holidays.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/holidays.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/holidays.js should pass jshint.');
  });
});
define('goodcity/tests/routes/in_progress/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/in_progress');
  QUnit.test('routes/in_progress/index.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/in_progress/index.js should pass jshint.');
  });
});
define('goodcity/tests/routes/in_progress/reviewed.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/in_progress');
  QUnit.test('routes/in_progress/reviewed.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/in_progress/reviewed.js should pass jshint.');
  });
});
define('goodcity/tests/routes/in_progress/reviewing.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/in_progress');
  QUnit.test('routes/in_progress/reviewing.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/in_progress/reviewing.js should pass jshint.');
  });
});
define('goodcity/tests/routes/item_types.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/item_types.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/item_types.js should pass jshint.');
  });
});
define('goodcity/tests/routes/my_list/finished.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/my_list');
  QUnit.test('routes/my_list/finished.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/my_list/finished.js should pass jshint.');
  });
});
define('goodcity/tests/routes/my_list/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/my_list');
  QUnit.test('routes/my_list/index.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/my_list/index.js should pass jshint.');
  });
});
define('goodcity/tests/routes/my_list/reviewed.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/my_list');
  QUnit.test('routes/my_list/reviewed.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/my_list/reviewed.js should pass jshint.');
  });
});
define('goodcity/tests/routes/my_list/reviewing.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/my_list');
  QUnit.test('routes/my_list/reviewing.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/my_list/reviewing.js should pass jshint.');
  });
});
define('goodcity/tests/routes/my_list/scheduled.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/my_list');
  QUnit.test('routes/my_list/scheduled.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/my_list/scheduled.js should pass jshint.');
  });
});
define('goodcity/tests/routes/my_notifications.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/my_notifications.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/my_notifications.js should pass jshint.');
  });
});
define('goodcity/tests/routes/offer.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/offer.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/offer.js should pass jshint.');
  });
});
define('goodcity/tests/routes/offer/donor_messages.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/offer');
  QUnit.test('routes/offer/donor_messages.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/offer/donor_messages.js should pass jshint.');
  });
});
define('goodcity/tests/routes/offer/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/offer');
  QUnit.test('routes/offer/index.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/offer/index.js should pass jshint.');
  });
});
define('goodcity/tests/routes/offer/merge.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/offer');
  QUnit.test('routes/offer/merge.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/offer/merge.js should pass jshint.');
  });
});
define('goodcity/tests/routes/offer/supervisor_messages.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/offer');
  QUnit.test('routes/offer/supervisor_messages.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/offer/supervisor_messages.js should pass jshint.');
  });
});
define('goodcity/tests/routes/offers.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/offers.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/offers.js should pass jshint.');
  });
});
define('goodcity/tests/routes/offers/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/offers');
  QUnit.test('routes/offers/index.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/offers/index.js should pass jshint.');
  });
});
define('goodcity/tests/routes/offers/receiving.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/offers');
  QUnit.test('routes/offers/receiving.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/offers/receiving.js should pass jshint.');
  });
});
define('goodcity/tests/routes/offers/submitted.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/offers');
  QUnit.test('routes/offers/submitted.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/offers/submitted.js should pass jshint.');
  });
});
define('goodcity/tests/routes/receive_package.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/receive_package.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/receive_package.js should pass jshint.');
  });
});
define('goodcity/tests/routes/review_item.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/review_item.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/review_item.js should pass jshint.');
  });
});
define('goodcity/tests/routes/review_item/accept.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/review_item');
  QUnit.test('routes/review_item/accept.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/review_item/accept.js should pass jshint.');
  });
});
define('goodcity/tests/routes/review_item/donor_messages.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/review_item');
  QUnit.test('routes/review_item/donor_messages.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/review_item/donor_messages.js should pass jshint.');
  });
});
define('goodcity/tests/routes/review_item/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/review_item');
  QUnit.test('routes/review_item/index.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/review_item/index.js should pass jshint.');
  });
});
define('goodcity/tests/routes/review_item/reject.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/review_item');
  QUnit.test('routes/review_item/reject.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/review_item/reject.js should pass jshint.');
  });
});
define('goodcity/tests/routes/review_item/supervisor_messages.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/review_item');
  QUnit.test('routes/review_item/supervisor_messages.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/review_item/supervisor_messages.js should pass jshint.');
  });
});
define('goodcity/tests/routes/review_offer.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/review_offer.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/review_offer.js should pass jshint.');
  });
});
define('goodcity/tests/routes/review_offer/donor_details.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/review_offer');
  QUnit.test('routes/review_offer/donor_details.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/review_offer/donor_details.js should pass jshint.');
  });
});
define('goodcity/tests/routes/review_offer/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/review_offer');
  QUnit.test('routes/review_offer/index.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/review_offer/index.js should pass jshint.');
  });
});
define('goodcity/tests/routes/review_offer/items.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/review_offer');
  QUnit.test('routes/review_offer/items.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/review_offer/items.js should pass jshint.');
  });
});
define('goodcity/tests/routes/review_offer/logistics.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/review_offer');
  QUnit.test('routes/review_offer/logistics.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/review_offer/logistics.js should pass jshint.');
  });
});
define('goodcity/tests/routes/review_offer/receive.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/review_offer');
  QUnit.test('routes/review_offer/receive.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/review_offer/receive.js should pass jshint.');
  });
});
define('goodcity/tests/routes/scheduled/collection.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/scheduled');
  QUnit.test('routes/scheduled/collection.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/scheduled/collection.js should pass jshint.');
  });
});
define('goodcity/tests/routes/scheduled/gogovan.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/scheduled');
  QUnit.test('routes/scheduled/gogovan.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/scheduled/gogovan.js should pass jshint.');
  });
});
define('goodcity/tests/routes/scheduled/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/scheduled');
  QUnit.test('routes/scheduled/index.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/scheduled/index.js should pass jshint.');
  });
});
define('goodcity/tests/routes/scheduled/other_delivery.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/scheduled');
  QUnit.test('routes/scheduled/other_delivery.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/scheduled/other_delivery.js should pass jshint.');
  });
});
define('goodcity/tests/routes/search.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/search.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/search.js should pass jshint.');
  });
});
define('goodcity/tests/routes/search_label.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/search_label.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/search_label.js should pass jshint.');
  });
});
define('goodcity/tests/routes/session.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/session.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/session.js should pass jshint.');
  });
});
define('goodcity/tests/routes/user.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/user.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/user.js should pass jshint.');
  });
});
define('goodcity/tests/routes/users.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/users.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/users.js should pass jshint.');
  });
});
define('goodcity/tests/test-helper', ['exports', 'goodcity/tests/helpers/resolver', 'ember-qunit'], function (exports, _goodcityTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_goodcityTestsHelpersResolver['default']);
});
define('goodcity/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('goodcity/tests/unit/models/item-test', ['exports', 'ember-qunit', 'goodcity/tests/helpers/test-skip'], function (exports, _emberQunit, _goodcityTestsHelpersTestSkip) {

  (0, _emberQunit.moduleForModel)('item', 'Item Model', {
    needs: ['model:item', 'model:image', 'model:package', 'model:message', 'model:offer', 'model:donor_condition', 'model:rejection_reason', 'model:package_type', 'model:user', 'model:delivery', 'model:gogovan_transport', 'model:crossroads_transport']
  });

  (0, _emberQunit.test)('Item is a valid ember-data Model', function () {
    expect(1);

    var store = this.store();
    var record = null;

    Ember.run(function () {
      store.createRecord('item', { id: 1, state: 'draft', donorDescription: 'test-item' });
      record = store.peekRecord('item', 1);
    });

    equal(record.get('donorDescription'), 'test-item');
  });

  (0, _goodcityTestsHelpersTestSkip['default'])('Default image for item', function () {
    expect(1);

    var store = this.store();
    var defaultImageURL = null;

    Ember.run(function () {
      var record = store.createRecord('item', { state: 'draft', donorDescription: 'test-item' });
      var image1 = store.createRecord('image', { thumbImageUrl: "testimage1" });
      var image2 = store.createRecord('image', { thumbImageUrl: "testimage2", favourite: 'true' });

      record.get('images').pushObject(image1);
      record.get('images').pushObject(image2);

      defaultImageURL = record.get('defaultImageURL');
    });

    equal(defaultImageURL, "testimage2");
  });

  (0, _goodcityTestsHelpersTestSkip['default'])('Default image for item when no favourite is selected', function () {
    expect(1);

    var store = this.store();
    var defaultImageURL = null;

    Ember.run(function () {
      var record = store.createRecord('item', { state: 'draft', donorDescription: 'test-item' });
      var image1 = store.createRecord('image', { thumbImageUrl: "testimage1" });
      var image2 = store.createRecord('image', { thumbImageUrl: "testimage2" });

      record.get('images').pushObject(image1);
      record.get('images').pushObject(image2);

      defaultImageURL = record.get('defaultImageURL');
    });

    equal(defaultImageURL, "testimage1");
  });
});
define('goodcity/tests/unit/models/item-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/item-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/item-test.js should pass jshint.');
  });
});
define('goodcity/tests/unit/models/offer-test', ['exports', 'ember-qunit', 'ember-data-factory-guy', 'goodcity/tests/helpers/test-skip'], function (exports, _emberQunit, _emberDataFactoryGuy, _goodcityTestsHelpersTestSkip) {

  (0, _emberQunit.moduleForModel)('offer', 'Offer Model', {
    needs: ['model:item', 'model:message', 'model:package', 'model:image', 'model:donor_condition', 'model:delivery', 'model:user', 'model:schedule', 'model:rejection_reason', 'model:contact', 'model:permission', 'model:gogovan_transport', 'model:crossroads_transport', 'model:package_type', 'model:gogovan_order', 'model:address', 'model:cancellation_reason']
  });

  (0, _emberQunit.test)('offer is a valid ember-data Model', function () {
    expect(1);

    var store = this.store();
    var record = null;

    Ember.run(function () {
      store.createRecord('offer', { id: 1, collectionContactName: 'Test' });
      record = store.peekRecord('offer', 1);
    });

    equal(record.get('collectionContactName'), 'Test');
  });

  (0, _goodcityTestsHelpersTestSkip['default'])('Count of items within an offer', function () {
    expect(1);

    var store = this.store();

    Ember.run(function () {
      var item1 = _emberDataFactoryGuy['default'].make('item', { state: 'draft' });
      var item2 = _emberDataFactoryGuy['default'].make('item', { state: 'draft' });
      var offer = _emberDataFactoryGuy['default'].make('offer', { items: [item1.id, item2.id] });

      return store.find('offer', offer.id).then(function (offer1) {
        offer1.get('items').then(function () {
          console.log(offer1.get('itemCount'));
          equal(offer1.get('itemCount'), 2);
        });
      });
    });
  });
});
define('goodcity/tests/unit/models/offer-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/offer-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/offer-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('goodcity/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map
