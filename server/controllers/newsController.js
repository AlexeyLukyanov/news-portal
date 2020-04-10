const newsRepository = require('../repositories/newsRepository.js');

// exports.index = function(req, res) {
//     res.send('NOT IMPLEMENTED: Site Home Page');
// };

exports.news_list = function (req, res) {
	newsRepository
	.getLastNews()
	.then(news => {
		res.send(JSON.stringify(news))
	})
	.catch(err => {
		return next(err);
	})
}

exports.news_detail_get = function (req, res, next) {
	const id = req.params.id; // проверить
	newsRepository
	.getThisNews(id)
	.then(result => {
		res.send(JSON.stringify(result)) 
	})
	.catch(err => {
		return next(err);
	})
}

exports.news_create_post = function (req, res, next) {
	const name = req.params.name; // проверить
	const body = req.params.body; // проверить
	newsRepository
	.createNews(name, body)
	.then(result => {
		res.send(JSON.stringify(result))
	}).catch(err => {
		return next(err);
	})
}

exports.news_delete_post = function (req, res, next) {
	const id = req.params.id;
	newsRepository
	.deleteNews(id)
	.then(res.send('done'))
	.catch(err => {
		return next(err);
	})
}

exports.news_update_post = function (req, res, next) {
	const id = req.params.id;
	newsRepository
	.updateNews(id)
	.then(result => {
		res.send(JSON.stringify(result))
	})
	.catch(err => {
		return next(err);
	})
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
