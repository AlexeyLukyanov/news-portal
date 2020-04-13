const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

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
	newsRepository
	.getThisNews(req.params.id)
	.then(result => {
		if (result !== null){
			res.send(JSON.stringify(result))
		} else {
			res.send('Invalid id')
		}
	})
	.catch(err => {
		return next(err);
	})
}

exports.news_create_post = [
	// Validate fields
	body('name').isLength({ min: 1 , max: 40}).trim().withMessage('Name must be specified.'),
    body('body').isLength({ min: 1 }).trim().withMessage('Text must be specified.'),

    // Sanitize fields
    sanitizeBody('name').escape(),
    sanitizeBody('body').escape(),

    // Process request after validation and sanitization.
	(req, res, next) => {

		// Extract the validation errors from a request.
        const errors = validationResult(req);

        if(!errors.isEmpty()){
        	res.send(errors)
        } else {
			newsRepository
			.createNews(req.body.name, req.body.body)
			.then(result => {
				res.send(JSON.stringify(result))
			}).catch(err => {
				return next(err);
			})
		}
	}
]

exports.news_delete_post = function (req, res, next) {
	newsRepository
	.deleteNews(req.params.id)
	.then(result => {
		console.log(result);
		if(typeof result === 'undefined'){
			res.send('done')
		} else {
			res.send(result)
		}
	})
	.catch(err => {
		return next(err);
	})
}

exports.news_update_post = function (req, res, next) {
	const id = req.params.id;
	const name = req.body.name; 
	const body = req.body.body;
	newsRepository
	.updateNews(id, name, body)
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
