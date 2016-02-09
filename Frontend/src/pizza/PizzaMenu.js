/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML елемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику (звільнюємо кошик)
    $pizza_list.html("");

    //Оновлення однієї піци (показує і додає ф-ції на кнопки)
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-l").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-sm").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];
    if (filter === 'all') {
        Pizza_List.forEach(function (pizza) {
            pizza_shown.push(pizza);
        });
    }
    else if (filter == 'vega') {
        Pizza_List.forEach(function (pizza) {
            //Якщо піка відповідає фільтру
            if (!pizza.content['meat'] && !pizza.content['ocean']) {
                pizza_shown.push(pizza);
            }
        });
    } else {
        Pizza_List.forEach(function (pizza) {
            //Якщо піка відповідає фільтру
            if (pizza.content[filter]) {
                pizza_shown.push(pizza);
            }
        });
    }
    $(".badge-all").text(pizza_shown.length);
    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

$("li").each(function (i, item) {
    item = $(item);
    item.click(function () {
        var filterPill = item.attr("id");
        filterPizza(filterPill);
        $("li").each(function (i, item) {
            $(item).removeClass("active");
        });
        item.addClass("active");
    })
});

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;