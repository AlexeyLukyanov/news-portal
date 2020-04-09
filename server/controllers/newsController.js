const Title = require('../models/newsModel.js');

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

exports.news_list = function (req, res) {
	Title.findAll().then(titles => {
		res.send(JSON.stringify(titles))
	})
}

exports.news_detail_get = function (req, res) {
	const id = req.paramsId; // необходимо исправить!!!
	Title.findByPk(id).then(news => {
		res.send(JSON.stringify(news))
	})
}

exports.news_create_get = function (req, res) {
	res.send('Form of news') // or res.render()
}

exports.news_create_post = function (req, res) {
	const params = {}; // необходимо исправить, добавить валидаторы
	Title.crete({
		// name: params.name;
		// body: params.body
	}).then(resul => {
		res.send(JSON.stringify(resul))
	}).catch(error => {
		// If error...
	})
}

exports.news_delete_get = function (req, res) {
	res.send('NOT IMPLEMENTED: news delete GET')
}

exports.news_delete_post = function (req, res) {
	res.send('NOT IMPLEMENTED: news delete POST')
}

exports.news_update_get = function (req, res) {
	res.send('NOT IMPLEMENTED: news update GET')
}

exports.news_update_post = function (req, res) {
	res.send('NOT IMPLEMENTED: news update POST')
}


// module.exports = {
// 	news_list,
// 	news_create_get,
// 	news_create_post,
// 	news_delete_get,
// 	news_delete_post,
// 	news_update_get,
// 	news_update_post,
// }
