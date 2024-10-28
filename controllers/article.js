const express = require('express')
const app = express()
const path = require('path')
const hbs = require('express-handlebars');

// show all articles - index page
app.get('/', (req, res) => {
    let query = "SELECT * FROM article";
    let articles = [];
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result;
        res.render('index', {
            articles: articles
        });
    });
});

// show article by this slug
app.get('/article/:slug', (req, res) => {
    let query = `
        SELECT 
            article.*, 
            author.name as author_name 
        FROM article 
        INNER JOIN author 
        ON author.id = article.author_id 
        WHERE slug='${req.params.slug}'
    `;
    let article;
    con.query(query, (err, result) => {
        if (err) throw err;
        article = result[0];
        console.log(article);
        res.render('article', {
            article: article
        });
    });
});

module.exports = {

    getAllArticles,
    getArticleBySlug

};