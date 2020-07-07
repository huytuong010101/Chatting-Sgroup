const ChatosExamle = {
    Message: {
        add: function (message, type) {
            var chat_body = $('.layout .content .chat .chat-body');
            if (chat_body.length > 0) {

                type = type ? type : '';
                message = message ? message : '--error--';

                $('.layout .content .chat .chat-body .messages').append('<div class="message-item ' + type + '"><div class="message-content">' + message + '</div><div class="message-action">PM 14:25 ' + (type ? '<i class="ti-check"></i>' : '') + '</div></div>');
                $("#chat-body").animate({ scrollTop: $("#messsages").height() }, 100);
                /*
                chat_body.scrollTop(chat_body.get(0).scrollHeight, -1).niceScroll({
                    cursorcolor: 'rgba(66, 66, 66, 0.20)',
                    cursorwidth: "4px",
                    cursorborder: '0px'
                }).resize();
                */
            }
        }
    }
};
$(function () {

    /**
     * Some examples of how to use features.
     *
     **/


    setTimeout(function () {
        // $('#disconnected').modal('show');
        $('#call').modal('show');
    }, 2000);

    $(document).on('click', '.layout .content .sidebar-group .sidebar .list-group-item', function () {
        if (jQuery.browser.mobile) {
            $(this).closest('.sidebar-group').removeClass('mobile-open');
        }
    });

});