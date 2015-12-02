$(document).ready(function () {
    if (window.localStorage["hash"] == "")
    {
         window.location = "index.html";
    }
    $("#number").focus();
    $('#addNumberForm').on('submit', function (e) {
        var number = $('#number').val();
        addNumber(number);
        $('#number').val("");
        e.preventDefault();
        return false;
    });
});
function addNumber(number)
{
    window.localStorage["numbers"] += number + ",";

    $.post("http://95.140.192.34/do.php", {action: '/observer/add', number: number, hash: window.localStorage["hash"]})
            .done(function (data) {
                var ret = $.parseJSON(data);
                if (ret.status === 'ok') {
                    $('#success_message').html('Successfully saved: ' + number);
                    $("#number").focus();
                } else {
                    $('#error_message').html(ret.message);
                }
            })
            .fail(function () {

                $('#error_message').html('No Connection!');
            });
}