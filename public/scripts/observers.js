
function observers() {
    var itemsList = $('.items-list');
    var body = $("body");

    itemsList.on('click', ':checkbox', function () {
        var self = $(this);
        var parent = self.parent();
        if (parent.hasClass('item-checked')) {
            parent.removeClass('item-checked');
        }
        else {
            parent.addClass('item-checked');
        }
        updateState_Controller($(this));
    });

    itemsList.on('click', '.delete-btn', function () {
        deleteItem_Controller($(this));
    });

    body.on('click', '.save-btn', function () {
        var body = $('.item-body').val();
        createItem_Controller({body: body});
    });

    body.on('click', '.cancel-btn', function () {
        $('.control-btns').css('display', 'none');
        $('.add-item-btn').css('display', 'inline-block');

    });

    body.on('click', ".add-item", function () {
        $('.add-item-btn').css('display', 'none');
        $('.control-btns').css('display', 'inline-block');
    });
}