`import Ember from "ember"`
`import SharedTranslationsZhTw from "shared-goodcity/locales/zh-tw/translations"`

I18nTranslationsZhTw =
  Ember.$.extend true, SharedTranslationsZhTw,
    "socket_offline_error": "正在嘗試連線…"
    "reviewing": "正在審查"
    "reviewed": "已審查完畢"
    "submitted": "已提交"
    "messages_title" : "信息"
    "select": "選擇"
    "QuotaExceededError": "Site may not work in Safari's <b>private mode.</b> Please try</br><ul><li><a href='https://itunes.apple.com/in/app/goodcityadmin.hk/id1013288708?mt=8' style='color: black!important; background-color: #dee4eb !important;'>Downloading the iOS App</a></li><li>Using regular (not private) mode in Safari</li><li>Using Chrome's private browsing mode</li></ul>"
    "search_item_label": "搜尋物資標籤"
    "search":
      "no_results": "抱歉，未能找到結果"
      "server_search": "於服務器上尋找更多資訊"
      "placeholder": "搜索"

    "users":
      "search": "搜尋使用者"

    "holiday":
      "name": "Holiday Name"
      "date": "Date"
      "add": "Add"
      "manage": "Manage Holidays"
      "description": "Donors will not be able to book a delivery or drop-off on the 'holiday' dates listed below."
      "delete_confirm": "Are you sure you wish to delete this holiday?"

    "offer":
      "title": "捐獻細節"
      "donor": "捐贈者"
      "transport": "運輸"
      "details" : "捐獻詳情"
      "donor_messages" : "捐贈者信息"
      "supervisor_messages" : "監察員信息"
      "empty_msg" : "對不起！這項捐獻並不存在。"

      "merge":
        "title": "選擇捐獻項，將之合拼"
        "message": "合拼後無法還原。除了剛才點選的項目的一般討論外，所有數據皆會保留"
        "cancel": "取消"
        "merge": "合拼"
        "error": "無法合拼這幾個項目"

      "offer_details" :
        "heading" : "捐贈詳情"
        "is_collection": "收集"
        "is_drop_off": "送抵"
        "is_gogovan_order": "預約貨車"
        "is_gogovan_confirm": "確認貨車"
        "driver_completed": "司機已確認預約"
        "offer_messages": "一般信息"
        "accepted": "已接受"
        "not_needed": "不需要"
        "closed_offer_message": "不再接收這類物資捐贈，請見諒"
        "received": "已收到"
        "rejected": "已拒絕"
        "pending": "正在等候"
        "missing": "遺失"
        "start_receiving_by": "{{lastName}} {{firstName}} 正在接收"
        "inactive": "列作暫停"

    "items":
      "add_item":
        "description_placeholder" : "這是甚麼？有多少件物資？物資大小？"

    "item":
      "submitted_status": "這項物品正在等候審查。"
      "in_review_status": "正在審查這項物品。"
      "accepted_status": "已接受這項物品。"
      "rejected_status": "不接受這項物品。"
      "cancelled_status": "這項捐贈已被 {{lastName}} {{firstName}} 取消。"

      "messages":
        "info_text1": "假如審查過程中我們遇到任何問題，我們會在下面的對話框向您查詢。"
        "info_text2": "假如您想添加任何有關捐贈物品的資料，請於下面的對話框輸入。"

    "inbox":
      "quick_links": "快捷鍵"
      "all_offers": "所有捐贈品"
      "notifications": "信息通知"
      "new_offers": "新捐獻項目"
      "new_items" : "新物資"
      "scheduled_offers": "已安排"
      "in_review" : "正在處理"
      "my_list" : "我的列表"
      "finished": "已完成"
      "closed_offers": "已完成"
      "receiving": "正在接收"
      "users": "使用者"
      "holidays": "Holidays"
      "search_offer_message": "只顯示最近更新的捐贈項目，請使用搜尋功能檢閱過往項目。"

    "my_notifications":
      "heading" : "{{name}}的捐獻"
      "all_notifications" : "所有新信息"
      "show_unread" : "顯示未讀信息"
      "mark_all_read" : "全部標示為已讀"
      "no_unread": "沒有未讀信息"

    "review_offer":
      "title" : "審查捐獻項目"
      "review_started_by" : "由 {{lastName}} {{firstName}} 發起"
      "no_items": "不需要任何物資"
      "close_offer": "此項捐獻不再開放"
      "items_reviewed": "已審查所有物資"
      "set_logistics": "設定運輸資料"
      "to_complete": "以完成"
      "plan_transport": "用戶可安排交通"
      "reviewed": "審查完畢"
      "start_review": "開始審查"
      "goods_received_by" : "已經收到由 {{firstName}} {{lastName}} 捐贈的物資"
      "goods_start_receiving_by": "{{firstName}} {{lastName}} 開始接收物資"
      "offer_closed_by": "捐贈項目由 {{firstName}} {{lastName}} 關閉"
      "offer_cancelled_by": "捐贈項目由 {{firstName}} {{lastName}} 取消"
      "receive": "收到"
      "missing": "遺失"
      "received": "已經收到"
      "expecting": "等候中"
      "all_items_processed": "所有項目皆被接收或列作遺失"
      "inactive_offer": "這項捐獻已被暫停"
      "message_donor": "傳送信息給捐獻人士，告知其捐獻已被暫停："
      "receive_offer_message": "已經收到你捐贈的物資，謝謝。"
      "missing_offer_message": "貨車已抵達十字路會，惟未見物資，我們或會和你跟進，確認事件狀況。"
      "close_offer_message": "閣下的捐獻項目處理完畢，但我們現時無法接收閣下的物資，請見諒，還望下次有機會為閣下的物資找到合適的安置。"
      "confirm_receiving_message": "在捐獻取消後接收物資，會將捐獻項目的狀態轉成「正在接收」。確定接收物資嗎？"
      "close_offer_summary": "這項捐獻項目將列為完成。"

      "donor":
        "offer_id": "捐獻項目號碼"
        "district": "地區"
        "registered": "已註冊"
        "last_seen": "最後上線"
        "total_offers": "捐獻總數"
        "crm": "CRM"
        "other_offers": "所有好人好市捐獻"
        "internet_call": "網上通話"
        "end_call": "結束通話"
        "active_call": "即時通話"

      "options":
        "add_item": "添加項目"
        "delete_offer": "刪除捐獻項"
        "submit_offer": "重新提交捐獻項"
        "merge_offer": "合拼捐獻項目"

    "mark_received":
      "delivered_by": "運送人員："
      "gogovan": "Gogovan"
      "crossroads_truck": "十字路會貨車"
      "dropped_off": "親自運送"
      "unknown": "未知"

    "logistics":
      "no_items": "沒有需要運送的物品"
      "offer_closed": "此項捐獻已經關閉"
      "close_offer": "關閉捐獻項目"
      "message_donor": "向捐贈者發送信息"
      "finish_review_request": "請先完成審查！"
      "accepted_items": "已接受物品"
      "gogovan_requirement": "要求GoGoVan運送"
      "crossroads_requirement": "要求十字路會運送"
      "complete_review": "完成審查"
      "ggv_hire": "要求租用GoGoVan"
      "portion_for_crossroads_truck": "這項捐獻需要佔用十字路會貨車多少空間？"
      "goods_received" : "物資接收日期"
      "arrange_transport": "安排運輸"
      "van": "麵包車"
      "receiving" : "正在接收這項捐獻"
      "offer_cancelled_by": "這項捐獻由 {{lastName}} {{firstName}} 取消"
      "complete_review_message": "正在審查閣下的捐獻項目， 請 <a href='/offers/{{offer_id}}/plan_delivery'>點擊這裏</a> 安排遞送服務。"
      "choose_ggv_option": "選擇GoGoVan租賃服務"
      "finished_review": "完成審查了嗎？"
      "add_message_to_donor": "聯絡捐款人："

    "review_item":
      "title" : "審查物資"
      "accept" : "接受"
      "save_item": "儲存"
      "accept_item" : "儲存及接受"
      "reject" : "不接受"
      "reject_item" : "拒絕物品"
      "not_now" : "暫不決定"
      "donor_message" : "捐贈者信息"
      "supervisor_message" : "監察員信息"
      "view_lable_guide": "檢閱決定準則"
      "condition": "狀況"
      "add_component": "增加配件"
      "add_item_label": "增加物品標籤"
      "assign": "Assign"
      "select_package_image": "Choose the favourite image for this package:"

    "reject":
      "select_type": "請先選取物資類型！"
      "option_error": "請選擇原因"
      "reject_item": "拒絕物品"
      "quality" : "質量"
      "size": "大小"
      "supply": "供應/需求"
      "message_placeholder" : "發送信息予捐贈者，告知物品不被接受"
      "reject_message" : "很抱歉，我們不能接受這項物品。"
      "quality_message" : "對於部份物資類型，除非物資質量極佳，否則我們無法接收。"
      "size_message" : "物資過大，要找到可以安置物資的客戶會很困難。"
      "supply_message" : "很抱歉，由於我們已經有很多同類型的物資，我們無法接受您的捐獻。"
      "cancel_gogovan_confirm": "拒絕接受最後一項物資將會取消GoGoVan的預約，您是否確認？"
      "custom_reason": "特別原因"
      "cannot_reject_error": "已確認預約GoGoVan，因此無法拒絕最後一項物資。"

    "cancel_gogovan":
      "title": "取消預約GoGoVan"
      "once_confirmed": "GoGoVan確認預約取消後，您便能夠前往拒絕或取消此項捐獻。"
      "call_driver": "請致電GoGoVan以取消預約"
      "notify_donor": "聯絡捐贈者，告知預約已被取消"

    "receive":
      "missing": "遺失"
      "receive": "接收"
      "inventory": "存貨"
      "label": "Label"
      "resubmit": "To receive this offer, please re-submit and review the offer."
      "receiving":
        "header": "開始接收捐獻項目"
        "cant_modify_note": "提示：一旦捐獻項目狀態改成「正在接收」，將無法還原，捐獻人士亦無法更改物資資料。"
        "not_now": "現在無法進行"
        "begin_receiving": "開始接收"


    "finished":
      "title": "已完成"
      "received": "已接收"
      "cancelled": "已取消"
      "inactive": "暫停"

    "scheduled":
      "title": "已安排時間"
      "other_delivery": "其他運輸"
      "collection" : "收集"
      "gogovan" : "GoGoVan"
      "all_offers": "所有捐獻項目"
      "overdue": "過期"
      "today": "今天"
      "next_week": "下星期"
      "after_next_week": "下星期後"

    "placeholder":
      "qty": "數量"
      "height": "高度"
      "width": "闊度"
      "length": "長度"
      "package_type": "包裝類型"
      "comments": "描述"

    "receive_package":
      "inventory": "存貨號碼"
      "invalid_inventory": "存貨號碼不正確"
      "invalid_quantity": "空格不能留空"
      "invalid_description": "空格不能留空"
      "receive": "接收"
      "cancel": "取消"
      "enter_barcode": "輸入條碼"
      "scan_barcode": "掃描條碼"
      "add_location": "加入地點"
      "grade_a": "等級: A"
      "grade_b": "等級: B"
      "grade_c": "等級: C"
      "grade_d": "等級: D"

    "user":
      "permission": "准許"

    "inactive_offer":
      "message": "此捐獻項目被暫停，可以隨意更改、重新提交或取消。"
      "add_message": "向捐獻人士傳送信息"
      "mark_inactive": "將狀態改成暫停"

    "cancel_offer":
      "donor_message": "選擇捐獻人士取消的原因"
      "cancel": "取消捐獻"

`export default I18nTranslationsZhTw`
