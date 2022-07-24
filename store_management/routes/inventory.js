module.exports = function(app, db) {

    // Get all
    app.get('/api/storeProducts', (req, res) => {
        let statement = db.prepare(`
        SELECT sp.* , s.name storeName, p.name productName from 
        storesProduct sp 
        JOIN stores s ON sp.storeId = s.id 
        Join products p on sp.productId = p.id
  `);
        let result = statement.all();
        res.json(result);
    });

    // Get all by store id
    app.get('/api/storeProductsByStoreId/:storeId', (req, res) => {
        let searchId = req.params.storeId;
        let statement = db.prepare(`
            SELECT sp.* , s.name storeName, p.name productName from 
            storesProduct sp 
            JOIN stores s ON sp.storeId = s.id 
            Join products p on sp.productId = p.id
            WHERE sp.storeId = :searchId
      `);
        let result = statement.all({ searchId });
        res.json(result);
    });


    // Get one product by id
    app.get('/api/storeProducts' + '/:storeId' + '/:productId', (req, res) => {
        let storeId = req.params.storeId;
        let productId = req.params.productId;
        let statement = db.prepare(`
    SELECT * FROM storesProduct WHERE storeId = :storeId AND productId = :productId
  `);
        let result = statement.all({ searchId });
        res.json(result[0] || null);
    });

    // Create one
    app.post('/api/storeProducts', (req, res) => {
        let statement = db.prepare(`
    INSERT INTO storesProduct (${Object.keys(req.body).join(', ')})
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
    app.delete('/api/storeProducts' + '/:storeId' + '/:productId', (req, res) => {
        let statement = db.prepare(`
    DELETE FROM storesProduct
    WHERE storeId = :storeId AND productId = :productId
  `);
        let result = statement.run({
            idToDelete: req.params.id
        });
        res.json(result);
    });

    // Change one
    app.put('/api/storeProducts' + '/:storeId' + '/:productId', (req, res) => {
        let result;
        try {
            let statement = db.prepare(`
      UPDATE storesProduct
      SET ${Object.keys(req.body).map(x => x + ' = :' + x).join(', ')}
      WHERE storeId = :storeId AND productId = :productId
    `);
            result = statement.run({...req.body, id: req.params.id });
        } catch (error) {
            result = { error: error + '' }
        }
        res.json(result);
    });

}