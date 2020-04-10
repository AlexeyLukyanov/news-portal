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
	return Title.crete({
		name,
		body
	}, { fields: [ 'name', 'body' ] })
}

exports.updateNews = (id, body) => {
	return Title.findByPk(id).then((news, body) => {
		if(news !== null){
			news.update({
				body
			}, { fields: [ 'body' ] })
		} else {
			return 'news for update not found'
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