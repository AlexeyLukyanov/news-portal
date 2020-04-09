const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')


class News extends Model {}

News.init ({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING,
	},
	// views: {
	// 	type: DataTypes.INTEGER,
	// },
	// sourse_id: {
	// 	type: DataTypes.INTEGER,
	// 	references: {
	// 		model: 'Source',
	// 		key: 'id',
	// 	},
	// },
	body: {
		type: DataTypes.TEXT,
	},
}, { sequelize, modelName: 'news' })

sequelize.sync()

module.exports = News;