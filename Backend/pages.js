/**
 * Created by chaika on 09.02.16.
 */
exports.mainPage = function(req, res) {
    res.render('mainPage', { //mainPage.js - уде відображуватися ( пишеться назва js файлу
        pageTitle: 'Вибір Піци'
    });
};

exports.orderPage = function(req, res) {
    //TODO: implement
    res.render('orderPage', {
        pageTitle: 'Замовлення'
    });
};