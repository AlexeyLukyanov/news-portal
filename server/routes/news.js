const express = require('express');
const router = express.Router();

const news_controller = require('../controllers/newsController.js');

// get catalog home page
router.get('/', news_controller.news_list);



//get request for one news
router.get('/:id', news_controller.news_detail_get);

// get and post request to create new news
// router.get('/news/:id/create', news_controller.news_create_get);
router.post('/create', news_controller.news_create_post);

// get and post request to delete one news
// router.get('/news/:id/delete', news_controller.news_delete_get);
router.post('/:id/delete', news_controller.news_delete_post);

// get and post request to update one news
// router.get('/news/:id/update', news_controller.news_update_get);
router.post('/:id/update', news_controller.news_update_post);

module.exports = router;
