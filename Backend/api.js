/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');

exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};
function base64(str) {
    return new Buffer(str).toString('base64');
}

var crypto = require('crypto');
function sha1(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}


exports.createOrder = function(req, res) {
    var order_info = req.body;
    //console.log(order_info);
    var order_items = "Order: ";
    //console.log("Creating Order", order_info);
    order_info.pizza.forEach(function(cart_item){
        var size;
        if(cart_item.size ==="big_size")  size = "(B)";
        else  size = "(M)";
        order_items += cart_item.pizza.title + size + "*"+cart_item.quantity+", ";
    });
    console.log(order_items);
    var order_description = order_info.name+"("+order_info.phone+"," + order_info.adress+") "+order_items;
    var LIQPAY_PUBLIC_KEY = "i35565441927";
    var LIQPAY_PRIVATE_KEY = "rB4u8bHChJmIL7UAxPcWWzSwVEvtGLwSXiY5YT0l";
    var order = {
        version: 3,
        public_key: LIQPAY_PUBLIC_KEY,
        action: "pay",
        amount: order_info.price,
        currency: "UAH",
        description: order_description,
        order_id: Math.random(),
        //!!!Важливо щоб було 1, бо інакше візьме гроші!!!
        sandbox: 1
    };
    var data = base64(JSON.stringify(order));
    var signature = sha1(LIQPAY_PRIVATE_KEY + data + LIQPAY_PRIVATE_KEY);

        res.send({
        success: true,
        data: data,
        signature: signature
    });
};