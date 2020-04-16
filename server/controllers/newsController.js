const paginate = require('express-paginate');

const { body, param, query, validationResult } = require('express-validator/check');
const { sanitizeBody, sanitizeParam } = require('express-validator/filter');

const newsRepository = require('../repositories/newsRepository.js');

const news_list = [
	// min one news on the page, max 20 news on the page.
	// function paginate.middleware make offset param and save it into req.skip
	paginate.middleware(10 ,20),

	query('deleted').isBoolean().trim().withMessage('param "deleted" must be boolean'),

	function (req, res, next) {


		const errors = validationResult(req);
		if(!errors.isEmpty()){
			res.send(errors)
		}

		newsRepository
		// The function getNewsList gets 3 arguments - num of page, news limit on page, offset(req.skip)
		.getNewsList(req.query.page, req.query.limit, req.skip)
		.then(news => {
			const limit = (req.query.limit === 0) ? 10 : req.query.limit
			const pageCount = Math.ceil(news.count / limit);

			// result obj contain news and information about page(pagination)
			const result = {
				news: news.rows,
				newsCount: news.count,
				pageCount,
				pages: paginate.getArrayPages(req)(5, pageCount, req.query.page)
			};

			res.send(JSON.stringify(result))
		})
		.catch(err => {
			return next(err);
		})
	}
]

const news_detail_get = [
	// validation id param
	param('id').isInt().trim().withMessage('id must be integer'),
	// Sanitize fields
    sanitizeParam('id').escape(),

	(req, res, next) => {

		// Extract the validation errors from a request.
        const errors = validationResult(req);

		if(!errors.isEmpty()){
			res.send(errors)
		} else {
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
	}
]

const news_create_post = [
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

const news_delete_post = [
	// validation id param
	param('id').isInt().trim().withMessage('id must be integer'),
	// Sanitize fields
    sanitizeParam('id').escape(),

	function (req, res, next) {
		// Extract the validation errors from a request.
        const errors = validationResult(req);

        if(!errors.isEmpty()){
        	res.send(errors)
        } else {
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
	}
]

const news_update_post = [
	// Validate fields
	param('id').isInt().trim().withMessage('id must be integer'),
	body('name').isLength({ min: 1 , max: 40}).trim().withMessage('Name must be specified.'),
    body('body').isLength({ min: 1 }).trim().withMessage('Text must be specified.'),

    // Sanitize fields
    sanitizeParam('id').escape(),
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
			.updateNews(req.params.id, req.body.name, req.body.body)
			.then(result => {
				res.send(JSON.stringify(result))
			})
			.catch(err => {
				return next(err);
			})
		}
	}
]


module.exports = {
	news_list,
	news_create_post,
	news_delete_post,
	news_update_post,
	news_detail_get
}
