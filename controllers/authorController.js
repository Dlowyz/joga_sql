const db = require('../utils/db'); // Adjust path to your database connection file

// Function to get all articles by a specific author
exports.getArticlesByAuthor = (req, res) => {
    const authorId = req.params.authorId;

    // Query to get the author's name
    const authorQuery = "SELECT name FROM author WHERE id = ?";
    // Query to get all articles written by the author
    const articlesQuery = "SELECT * FROM article WHERE author_id = ?";

    db.query(authorQuery, [authorId], (err, authorResult) => {
        if (err) throw err;

        // Get the author's name
        const authorName = authorResult[0].name;

        // Now fetch the articles written by this author
        db.query(articlesQuery, [authorId], (err, articlesResult) => {
            if (err) throw err;

            // Render the 'author' view with both author name and articles
            res.render('author', {
                author_name: authorName,
                articles: articlesResult
            });
        });
    });
};

// Optional: Additional controller functions for author if needed
