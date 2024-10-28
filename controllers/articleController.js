// controllers/articleController.js
const db = require('../utils/db'); // Make sure the path to db is correct

// Function to get all articles
exports.getAllArticles = (req, res) => {
    const query = "SELECT * FROM article";
    db.query(query, (err, result) => {
        if (err) throw err;
        res.render('index', { articles: result });
    });
};

// Function to get an article by slug
exports.getArticleBySlug = (req, res) => {
    const query = `
        SELECT article.*, author.name AS author_name
        FROM article
        INNER JOIN author ON author.id = article.author_id
        WHERE slug = ?
    `;
    db.query(query, [req.params.slug], (err, result) => {
        if (err) throw err;
        res.render('article', { article: result[0] });
    });
};
