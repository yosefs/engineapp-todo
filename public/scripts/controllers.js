function createItem_Controller(item) {
    $.ajax({
        type: "POST",
        url: "/create",
        data: item
    }).done(function (data) {
        $('.items-list').append(item_View(data));
        $('.control-btns').css('display', 'none');
        $('.add-item-btn').css('display', 'inline-block');
    }).fail(function () {
        alert('save failed')
    });
    return false;
}


function deleteItem_Controller(item) {
    var parent = item.parent();
    $.ajax({
        type: "GET",
        url: "/delete",
        data: 'id=' + parent.attr('data-id')
    }).done(function () {
        parent.remove();
    }).fail(function () {
        alert('Delete failed');
    })

    return false;

}

function updateState_Controller(item) {
    var parent = item.parent();
    $.ajax({
        type: "POST",
        url: "/update",
        data: {id: parent.attr('data-id'), state: !(parent.find("input[type='checkbox']").attr("checked"))}
    })
    return false;
}


function getAll_Controller() {
    $.ajax({
        type: "GET",
        url: "/getall"
    }).done(function (data) {
        $('.items-list').html(allItems_View(data));
    });
    $('.control-btns').css('display', 'none');
}