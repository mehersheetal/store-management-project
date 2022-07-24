module.exports = function(app, db) {
    // Get all store
    app.get('/api/stores', (req, res) => {
        let statement = db.prepare(`
    SELECT * FROM stores
  `);
        let result = statement.all();
        res.json(result);
    });

    // Get one store by id
    app.get('/api/stores' + '/:id', (req, res) => {
        let searchId = req.params.id;
        let statement = db.prepare(`
    SELECT * FROM stores WHERE id = :searchId
  `);
        let result = statement.all({ searchId });
        res.json(result[0] || null);
    });



    // Create one store
    app.post('/api/stores', (req, res) => {
        let statement = db.prepare(`
    INSERT INTO stores (${Object.keys(req.body).join(', ')})
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

    // Delete one store
    app.delete('/api/stores/:id', (req, res) => {
        let statement = db.prepare(`
    DELETE FROM stores
    WHERE id = :idToDelete
  `);
        let result = statement.run({
            idToDelete: req.params.id
        });
        res.json(result);
    });

    // Change one store
    app.put('/api/stores/:id', (req, res) => {
        let result;
        try {
            let statement = db.prepare(`
      UPDATE stores
      SET ${Object.keys(req.body).map(x => x + ' = :' + x).join(', ')}
      WHERE id = :id
    `);
            result = statement.run({...req.body, id: req.params.id });
        } catch (error) {
            result = { error: error + '' }
        }
        res.json(result);
    });


    // Get all address
    app.get('/api/address', (req, res) => {
        let statement = db.prepare(`
    SELECT * FROM address
  `);
        let result = statement.all();
        res.json(result);
    });

    // Get all store standard
    app.get('/api/storeStandards', (req, res) => {
        let statement = db.prepare(`
    SELECT * FROM storeStandards
  `);
        let result = statement.all();
        res.json(result);
    });

}