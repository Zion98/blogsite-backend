const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();
const auth = require('../middlewares/auth');
// const multiparty = require('connect-multiparty');
// const MultipartyMiddleware = multiparty({ uploadDir: './images' });
// const fs = require('fs');

//Articles Controller
const ArticleController = require('../controllers/articleController');
const { validator } = require('../middlewares/validate');
// const { articleValidate } = require('../validators/articleValidate');

const { postArticle, updateArticle, deleteArticle, getArticle, getArticleID } = ArticleController;

console.log('ye');
// router.post('/', validator(articleValidate), postArticle);
router.post('/post', auth, postArticle);

router.put('/update', auth, updateArticle);

router.get('/get', auth, getArticle);

router.get('/get/:id', auth, getArticleID);

router.delete('/delete', auth, deleteArticle);

module.exports = router;


