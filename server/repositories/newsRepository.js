const Title = require('../models/newsModel.js');

// return promis
const getNewsCount = () => {
	return Title.count();
}

const getNewsList = (page, limit, offset) => {


	return Title.count()
	.then(count => {
		
		// Default limit is 10.
		if(limit === 0){ limit = 10 }

		const pageCount = Math.ceil(count / limit);

 	 	// numbeb of page cant be upper then pages count
		if (page > pageCount){ page = pageCount };

		(offset != (page - 1) * limit) ? offset = (page - 1) * limit : offset;

		return Title.findAndCountAll({
			limit,
			offset,
			order: [['updatedAt']]
		})
	})
}

const getThisNews = id => {
	return Title.findByPk(id);
}

const createNews = (name, body) => {
	return Title.findOrCreate({where: {
		name,
		body
	},  fields: [ 'name', 'body' ] })
}

const updateNews = (id, name, body) => {
	return Title.findByPk(id).then((news) => {
		if(news !== null){
			return news.update({
				name,
				body
			}, { fields: [ 'name', 'body' ] })
		} else {
			return 'news for update not found, chek the id.'
		}
	})
}

const deleteNews = id => {
	return Title.findByPk(id).then(news => {
		if(news !== null){
			news.destroy()
		} else {
			return 'news for delete not found'
		}
	})
}

module.exports = {
	getNewsCount,
	getNewsList,
	getThisNews,
	createNews,
	updateNews,
	deleteNews
}