`import Ember from "ember"`
`import SharedTranslationsEn from "shared-goodcity/locales/en/translations"`

I18nTranslationsEn =
  Ember.$.extend true, SharedTranslationsEn,
    "socket_offline_error": "Attempting to reconnect..."
    "reviewing": "Reviewing"
    "reviewed": "Reviewed"
    "submitted": "Submitted"
    "messages_title" : "Messages"
    "select": "Select"
    "QuotaExceededError": "Site may not work in Safari's <b>private mode.</b> Please try</br><ul><li><a href='https://itunes.apple.com/in/app/goodcityadmin.hk/id1013288708?mt=8' style='color: black!important; background-color: #dee4eb !important;'>Downloading the iOS App</a></li><li>Using regular (not private) mode in Safari</li><li>Using Chrome's private browsing mode</li></ul>"
    "search_item_label": "Search item label"
    "search":
      "no_results": "Sorry, No results found."
      "server_search": "Find more on server"
      "placeholder": "Search"

    "users":
      "search": "Search User"

    "holiday":
      "name": "Holiday Name"
      "date": "Date"
      "add": "Add"
      "manage": "Manage Holidays"
      "description": "Donors will not be able to book a delivery or drop-off on the 'holiday' dates listed below."
      "delete_confirm": "Are you sure you wish to delete this holiday?"

    "offer":
      "title": "Offer"
      "donor": "Donor"
      "transport": "Transport"
      "details" : "Offer details"
      "donor_messages" : "Donor Messages"
      "supervisor_messages" : "Supervisors Messages"
      "empty_msg" : "Sorry! This offer is empty."

      "merge":
        "title": "Select offer to merge with"
        "message": "Merging offers cannot be undone. All data will be retained except general discussion messages on the offer you just selected."
        "cancel": "Cancel"
        "merge": "Merge"
        "error": "These offers can not be merged."

      "offer_details" :
        "heading" : "Offer Details"
        "is_collection": "Collection"
        "is_drop_off": "Drop-off"
        "is_gogovan_order": "Van ordered"
        "is_gogovan_confirm": "Van confirmed"
        "driver_completed": "Driver completed"
        "offer_messages": "General Messages"
        "accepted": "Accepted"
        "not_needed": "Not needed"
        "closed_offer_message": "Offer closed. No items needed, Sorry."
        "received": "Received"
        "rejected": "rejected"
        "pending": "pending"
        "missing": "missing"
        "start_receiving_by": "{{firstName}} {{lastName}} began receiving"
        "inactive": "Marked as inactive"

    "items":
      "add_item":
        "description_placeholder" : "What is it? How many items? What's the size?"

    "item":
      "submitted_status": "This item is awaiting review."
      "in_review_status": "This item is being reviewed."
      "accepted_status": "This item has been accepted."
      "rejected_status": "This item has been rejected."
      "cancelled_status": "The offer this item belongs to has been cancelled by {{firstName}} {{lastName}} on"

      "messages":
        "info_text1": "If we have questions when reviewing this item we will chat with you here."
        "info_text2": "If you want to add a comment to this item for our reviewers, type it below."

    "inbox":
      "quick_links": "Quick Links"
      "all_offers": "All Offers"
      "notifications": "Notifications"
      "new_offers": "New"
      "new_items" : "New Items"
      "scheduled_offers": "Scheduled"
      "in_review" : "In Progress"
      "my_list" : "My List"
      "finished": "Finished"
      "closed_offers": "Finished"
      "receiving": "Receiving"
      "users": "Users"
      "holidays": "Holidays"
      "search_offer_message": "Only recently updated offers are shown. Use search to find older offers."

    "my_notifications":
      "heading" : "{{name}}'s Offer"
      "all_notifications" : "All notifications"
      "show_unread" : "Show unread only"
      "mark_all_read" : "Mark all read"
      "no_unread": "No unread messages!"

    "review_offer":
      "title" : "Review Offer"
      "review_started_by" : "Started by {{firstName}} {{lastName}}"
      "no_items": "No items needed"
      "close_offer": "Close Offer"
      "items_reviewed": "All items reviewed"
      "set_logistics": "Set logistics"
      "to_complete": "to complete"
      "plan_transport": "User to plan transport."
      "reviewed": "Reviewed"
      "start_review": "Start Review"
      "goods_received_by" : "Goods donated by {{firstName}} {{lastName}} received"
      "goods_start_receiving_by": "{{firstName}} {{lastName}} began receiving items"
      "offer_closed_by": "Offer closed by {{firstName}} {{lastName}}"
      "offer_cancelled_by": "Cancelled by {{firstName}} {{lastName}}"
      "receive": "Receive"
      "missing": "Missing"
      "received": "Received"
      "expecting": "Expecting"
      "all_items_processed": "All items marked received or missing."
      "inactive_offer": "This offer is marked as inactive."
      "message_donor": "Send message to donor about closing offer:"
      "receive_offer_message": "Your offer was received, thank you."
      "missing_offer_message": "The delivery arrived at Crossroads but expected items were missing. We may follow up with you to confirm what happened."
      "close_offer_message": "We have finished processing your offer. Unfortunately we are unable to receive your items this time. We hope we can place items you offer in the future."
      "confirm_receiving_message": "Receiving items after an offer has been finished will change the state of the offer to 'Receiving'. Are you sure you want to receive the item(s)?"
      "close_offer_summary": "This will close the offer."

      "donor":
        "offer_id": "Offer ID"
        "district": "District"
        "registered": "Registered"
        "last_seen": "Last seen"
        "total_offers": "Total offers"
        "crm": "CRM"
        "other_offers": "All offers on GoodCity"
        "internet_call": "Internet Call"
        "end_call": "End Call"
        "active_call": "Active Call"

      "options":
        "add_item": "Add an item"
        "delete_offer": "Delete Offer"
        "submit_offer": "Re-submit Offer"
        "merge_offer": "Merge Offer"

    "mark_received":
      "delivered_by": "Delivered by:"
      "gogovan": "Gogovan"
      "crossroads_truck": "Crossroads truck"
      "dropped_off": "Dropped off"
      "unknown": "Unknown"

    "logistics":
      "no_items": "No items to transport."
      "offer_closed": "This offer is closed now."
      "close_offer": "Close Offer"
      "message_donor": "Message Donor"
      "finish_review_request": "Please finish reviewing items first!"
      "accepted_items": "Accepted Items"
      "gogovan_requirement": "Gogovan Reqirement"
      "crossroads_requirement": "Crossroads Requirement"
      "complete_review": "Complete Review"
      "ggv_hire": "Gogovan Hire Requirement"
      "portion_for_crossroads_truck": "What portion of the Crossroads truck will this offer take up?"
      "goods_received" : "Goods received on"
      "arrange_transport": "Arrange Transport"
      "van": "Van"
      "receiving" : "This offer is currently being received."
      "offer_cancelled_by": "Offer cancelled by {{firstName}} {{lastName}}"
      "complete_review_message": "Your offer has been reviewed. Please <a href='/offers/{{offer_id}}/plan_delivery'>click here</a> to arrange transportation."
      "choose_ggv_option": "Choose GoGoVan hire requirement"
      "finished_review": "Finished reviewing this offer?"
      "add_message_to_donor": "Message to the donor:"

    "review_item":
      "title" : "Review Item"
      "accept" : "Accept"
      "save_item": "Save Only"
      "accept_item" : "Save + Accept"
      "reject" : "Reject"
      "reject_item" : "reject Item"
      "not_now" : "Not Now"
      "donor_message" : "Donor"
      "supervisor_message" : "Supervisors"
      "view_lable_guide": "View labeling guide"
      "condition": "Condition"
      "add_component": "Add component"
      "add_item_label": "Add item label"
      "assign": "Assign"
      "select_package_image": "Choose the favourite image for this package:"

    "reject":
      "select_type": "Please choose Item Type first!"
      "option_error": "Please choose a reason."
      "reject_item": "Reject Item"
      "quality" : "Quality"
      "size": "Size"
      "supply": "Supply/Demand"
      "message_placeholder" : "Message to donor about the rejection of this item"
      "reject_message" : "Unfortunately we cannot receive this item. "
      "quality_message" : "Some categories of items are very difficult for us to distribute unless they are in excellent condition."
      "size_message" : "Very few of our clients are able to accommodate large items in their homes."
      "supply_message" : "Unfortunately we cannot receive this item because we have a large quantity already in stock."
      "cancel_gogovan_confirm": "Rejecting the last item will cancel the gogovan booking, do you wish to proceed?"
      "custom_reason": "Custom Reason"
      "cannot_reject_error": "Cannot reject last item if there's a confirmed GoGoVan booking."

    "cancel_gogovan":
      "title": "Cancel GoGoVan Booking"
      "once_confirmed": "Once GoGoVan confirms the booking is cancelled you will be able to proceed rejecting or cancelling the offer."
      "call_driver": "Please cancel the GoGoVan booking by calling GoGoVan on"
      "notify_donor": "Message the donor to let them know their GoGoVan booking is being cancelled"

    "receive":
      "missing": "Missing"
      "receive": "Receive"
      "inventory": "Inventory"
      "label": "Label"
      "resubmit": "To receive this offer, please re-submit and review the offer."
      "receiving":
        "header": "Begin Receiving Offer"
        "cant_modify_note": "Note: Putting an offer in the \"receiving\" state cannot be undone. Donors cannot modify their offer once you start receiving the items."
        "not_now": "Not Now"
        "begin_receiving": "Begin Receiving"

    "finished":
      "title": "Finished"
      "received": "Received"
      "cancelled": "Cancelled"
      "inactive": "Inactive"

    "scheduled":
      "title": "Scheduled"
      "other_delivery": "Other Delivery"
      "collection" : "Collection"
      "gogovan" : "GoGoVan"
      "all_offers": "All offers"
      "overdue": "Overdue"
      "today": "Today"
      "next_week": "Next week"
      "after_next_week": "After next week"

    "placeholder":
      "qty": "Qty"
      "height": "H"
      "width": "W"
      "length": "L"
      "package_type": "Package Type"
      "comments": "Description"

    "receive_package":
      "inventory": "Print will generate number"
      "invalid_inventory": "Inventory number is invalid."
      "invalid_quantity": "Quantity can not be blank."
      "invalid_description": "Description can not be blank."
      "receive": "Receive"
      "cancel": "Cancel"
      "scan_barcode": "Scan barcode"
      "enter_barcode": "Enter barcode"
      "add_location": "Add Location"
      "grade_a": "Grade: A"
      "grade_b": "Grade: B"
      "grade_c": "Grade: C"
      "grade_d": "Grade: D"

    "user":
      "permission": "Permission"

    "inactive_offer":
      "message": "This offer seems to be inactive. Please feel free to modify, re-submit or cancel it."
      "add_message": "Add message for donor"
      "mark_inactive": "Mark Inactive"

    "cancel_offer":
      "donor_message": "Choose why the donor wishes to cancel this offer."
      "cancel": "Cancel Offer"

`export default I18nTranslationsEn`
