const News = require('../models/newsModel.js');

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

exports.news_list = function (req, res) {
	res.send('NOT IMPLEMENTED: news list GET')
}

exports.news_detail_get = function (req, res) {
	res.send('NOT IMPLEMENTED: news detail GET' + req.params.id)
}

exports.news_create_get = function (req, res) {
	res.send('NOT IMPLEMENTED: news create GET')
}

exports.news_create_post = function (req, res) {
	res.send('NOT IMPLEMENTED: news create POST')
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
