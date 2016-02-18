/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');

    var API = require('./API');

    //PizzaCart.initialiseCart();
    //PizzaMenu.initialiseMenu(Pizza_List);

    API.getPizzaList(function(err, pizza_list){
        if(err){
            return console.error(err);
        }
        PizzaCart.initialiseCart();
        PizzaMenu.initialiseMenu(pizza_list);
    });

    $('.to-buy').click (function(){
            //if (err) {
            //    alert("cant");
            //}
            //else {
                window.location = "/order.html";
            //}
    });

    $("#next").click (function() {
        API.createOrder({
            name: "An",
            phone: 98,
            pizza: PizzaCart.getPizzaInCart()
        }, function (err, res) {
            if (err) {
                alert("cant");
            }
            else {
                LiqPayCheckout.init({
                    data: res.data,
                    signature: res.signature,
                    embedTo: "#liqpay",
                    mode: "popup"// embed || popup
                }).on("liqpay.callback", function (data) {
                    console.log(data.status);
                    console.log(data);
                }).on("liqpay.ready",
                    function (data) {
                        // ready
                    }).on("liqpay.close", function (data) {
                    // close
                });
            }


        });
    });
    require('./googleMap');
});