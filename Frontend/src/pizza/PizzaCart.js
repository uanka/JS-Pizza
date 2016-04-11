/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage = require('../Storage');
//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};
//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];
//HTML едемент куди будуть додаватися піци
var $cart = $("#basket");
var empty = $cart.html();

$("#order-reset").click(function(){
    Cart = [];
    Storage.set('cart', Cart);
    updateCart();
});

$('.to-buy').click (function(){

    if($('.order-amount').text() === '0'){
        //$('.to-buy').off();
    }
    //else if (window.location!=="/order.html") {
    else{
        window.location = "/order.html";
    }
});
$('.to-change').click(function(){
    window.location = "/";
    $('.to-change').hide();
    $('.to-buy').show();
    $('.amount-options').removeClass('orderpage');
});
function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    var is = 0;
        Cart.forEach(function(item){
            if(item.pizza.id === pizza.id && item.size === size){
                item.quantity +=1;
                is = 1;
            }
        });
    if(!is) {
        //Приклад реалізації, можна робити будь-яким іншим способом
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
    }
    //Оновити вміст кошика на сторінці

    $(".order-amount").text(Cart.length);
    //$(".to-buy").on();
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    var index = Cart.indexOf(cart_item);
    Cart.splice(index, 1);
    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    var saved_pizza = Storage.get('cart');
    if(saved_pizza){
        Cart = saved_pizza;
        $(".empty-cart").hide();
    }
    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function linkAll(){
    var res =0;
    for(var i= 0; i<Cart.length; ++i){
        res+=Cart[i].quantity;
    }
    return res;
}

function more(item){
    item.quantity += 1;
    //$node.find(".quantity").html(cart_item.quantity);
    updateCart();
}

function updateCart() {

    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");
    var sum = 0;
    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".more").click(function(){
            more(cart_item);
        });
        $node.find(".less").click(function(){
            //Зменшуємо кількість замовлених піц
            if(cart_item.quantity == 1) removeFromCart(cart_item);
            cart_item.quantity -= 1;
            $node.find(".quantity").html(cart_item.quantity);
            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".remove").click(function(){
            removeFromCart(cart_item);
            //Оновлюємо відображення
            //updateCart();
        });
        sum += cart_item.quantity * parseInt($node.find(".item-cost").text());
        //$node.find(".quantity").text(cart_item.quantity);
        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
    $(".order-amount").text(linkAll());
    $(".money").text(sum);

    Storage.set('cart', Cart);
    if(!Cart.length){
        $cart.html(empty);
    }
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;