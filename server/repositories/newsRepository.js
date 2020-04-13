const Title = require('../models/newsModel.js');

// return promis
exports.getLastNews =  () => {
	return Title.findAll({
		limit: 10,
		order: [['updatedAt']]
	});
}

exports.getThisNews = id => {
	return Title.findByPk(id);
}

exports.createNews = (name, body) => {
	return Title.findOrCreate({where: {
		name,
		body
	},  fields: [ 'name', 'body' ] })
}

exports.updateNews = (id, name, body) => {
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

exports.deleteNews = id => {
	return Title.findByPk(id).then(news => {
		if(news !== null){
			news.destroy()
		} else {
			return 'news for delete not found'
		}
	})
}