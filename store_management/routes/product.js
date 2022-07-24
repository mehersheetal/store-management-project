module.exports = function(app, db) {

    // Get all
    app.get('/api/products', (req, res) => {
        let statement = db.prepare(`
    SELECT * FROM products
  `);
        let result = statement.all();
        res.json(result);
    });

    // Get one product by id
    app.get('/api/products' + '/:id', (req, res) => {
        let searchId = req.params.id;
        let statement = db.prepare(`
    SELECT * FROM products WHERE id = :searchId
  `);
        let result = statement.all({ searchId });
        res.json(result[0] || null);
    });

    // Create one
    app.post('/api/products', (req, res) => {
        let statement = db.prepare(`
    INSERT INTO products (${Object.keys(req.body).join(', ')})
    VALUES (${Object.keys(req.body).map(x => ':' + x).join(', ')})
  `);
        let result;
        try {
            result = statement.run(req.body);
        } catch (error) {
            result = { error: error + '' };
        }
        res.json(result);
    });

    // Delete one
    app.delete('/api/products/:id', (req, res) => {
        let statement = db.prepare(`
    DELETE FROM products
    WHERE id = :idToDelete
  `);
        let result = statement.run({
            idToDelete: req.params.id
        });
        res.json(result);
    });

    // Change one
    app.put('/api/products/:id', (req, res) => {
        let result;
        try {
            let statement = db.prepare(`
      UPDATE products
      SET ${Object.keys(req.body).map(x => x + ' = :' + x).join(', ')}
      WHERE id = :id
    `);
            result = statement.run({...req.body, id: req.params.id });
        } catch (error) {
            result = { error: error + '' }
        }
        res.json(result);
    });

}