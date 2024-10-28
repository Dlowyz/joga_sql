const express = require('express')
const app = express()
const path = require('path')
const hbs = require('express-handlebars');

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}));

app.use(express.static('public'));
app.set('view engine', 'hbs');
const mysql = require('mysql2')
const bodyParser = require('body-parser')



app.use(bodyParser.urlencoded({extended: true}))

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql',
    port: 3307
})

con.connect((err) => {
    if (err) throw err;
    console.log('Connected to joga_mysql db')
    
})

app.get('/', (req, res) => {
    let query = "SELECT * FROM article";
    let articles = [];
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result;
        res.render('index',{articles: articles});
    });
    
});

// Show article by this slug
app.get('/article/:slug', (req, res) => {
    let query = `
        SELECT article.*, author.name AS author_name 
        FROM article 
        JOIN author ON article.author_id = author.id 
        WHERE article.slug = ?
    `;
    con.query(query, [req.params.slug], (err, result) => {
        if (err) throw err;
        let article = result[0];
        console.log(article);
        res.render('article', { article: article });
    });
});

// Show all articles by a specific author
app.get('/author/:author_id', (req, res) => {
    let authorId = req.params.author_id;

    // Query to get the author's name
    let authorQuery = "SELECT name FROM author WHERE id = ?";
    // Query to get all articles by the author
    let articlesQuery = "SELECT * FROM article WHERE author_id = ?";

    con.query(authorQuery, [authorId], (err, authorResult) => {
        if (err) throw err;

        // Get the author's name
        let authorName = authorResult[0].name;

        // Now fetch the articles written by this author
        con.query(articlesQuery, [authorId], (err, articlesResult) => {
            if (err) throw err;

            // Render the 'author' template with both author name and articles
            res.render('author', {
                author_name: authorName,
                articles: articlesResult
            });
        });
    });
});
const articleRouter = require('./routes/article');
const authorRouter = require('./routes/author'); // Import the author router

// Middleware and other configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route handling
app.use('/', articleRouter);          // Existing article routes
app.use('/author', authorRouter);      // New author routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.listen(3003, () => {
    console.log('App is started at http://localhost:3003')
})
