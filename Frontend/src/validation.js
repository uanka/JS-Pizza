var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

//name-group
function lettersCorrect(str) {
    return /[A-zА-я\s' ]+$/.test(str);
}
$('#input-name').keyup(function () {
    delay(function() {
        var name = $('#input-name').val();
        if (name != '') {
            if (!lettersCorrect(name)) {
                $('.name-help-block').css("display", "inline");
                $('.name').addClass('has-error');
            } else {
                $('.name').removeClass('has-error');
                $('.name').addClass('has-success');
                $('.name-help-block').css("display", "none");
            }
        }
    }, 3000);
});

//phone-group
function beginsCorrect(phone) {
    if (phone.slice(0,4) === "+380" || phone[0] == 0)
        return true;
    return false;
}
function digitsCorrect(str) {
    var test = str;
    if(str.length == 13) test = str.slice(1);
    return /[0-9]/.test(str);
}
function lengthCorrect(phone) {
    if (phone[0] == 0 && phone.length == 10)
        return true;
    return phone[0] == '+' && phone.length == 13;
}

$('#input-phone').keyup(function () {
    delay(function() {
        var phone = $('#input-phone').val();
        if (!beginsCorrect(phone) || !lengthCorrect(phone) || !digitsCorrect(phone)) {
            $('.phone-help-block').css("display", "inline");
            $('.phone-group').addClass('has-error');
        } else {
            $('.phone-group').removeClass('has-error');
            $('.phone-group').addClass('has-success');
            $('.phone-help-block').css("display", "none");
        }
    }, 3000);
});

//address-group
$('#input-adress').keyup(function () {
    delay(function () {
        GoogleMap.geocodeAddress($('#input-adress').val(), function (err, coordinates) {
            if (!err) {
                $(".order-sum-adress").html($('#input-adress').val());
                $('.address-group').addClass('has-success');
                GoogleMap.calculateRoute(GoogleMap.pointPizza, coordinates);
            } else {
                console.log("Немає адреси");
            }
        });
    }, 3000);
});

//all together
exports.validated = function(){
    $(".form-group").each(function(i, item){
        if(!$(item).hasClass('has-success'))
        return false;
    });
    return true;
};