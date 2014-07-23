function allItems_View(items) {
    var res = '';
    for (var i = 0; i < items.length; i++) {
        res += item_View(items[i]);
    }
    return res;
}


function item_View(item) {
    var checkedStr = "";
    var checkedClass='';
    if (item.state) {
        checkedStr = "checked";
        checkedClass='item-checked';
    }
    return "<div class='item "+checkedClass+"' data-id='" + item.id + "'>"
        + "<input type='checkbox'" + checkedStr + ">" + item.body
        + "<button type='button' class='delete-btn'>Delete</button></div>";
}
