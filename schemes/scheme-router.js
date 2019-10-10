const express = require('express');

const Schemes = require('./scheme-model.js');

const router = express.Router();

const withCatch = require('../utils.js')

// get all schemes
router.get('/', async (req, res) => {
  const [err, schemes] = await withCatch( Schemes.find() )

  if (err) res.status(500).json({ error: 'Failed to get schemes.' });
  else if (schemes.length) res.status(200).json(schemes);
  else res.status(404).json({
    error:'There are no schemes yet.', 
    schemes: null
  })
});

// get a particular scheme
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const [err, scheme] =  await withCatch( Schemes.findById(id) )
  if (err) res.status(500).json({ error: 'Failed to get schemes.' });
  else if (scheme) res.json(scheme);
  else res.status(404).json({
    error: 'Could not find scheme with given id.', 
    scheme: null 
  })
});

// add a scheme
router.post('/', async (req, res) => {
  const schemeData = req.body;
  const [err, scheme] = await withCatch( Schemes.add(schemeData) )

  if (err) res.status(500).json({ error: 'Failed to create new scheme.' });
  else res.status(201).json(scheme);
});

// update a scheme
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const [err, scheme] = await withCatch( Schemes.findById(id) )

  if (err) res.status(500).json({ error: 'Could not find scheme with given id.' });
  else if (scheme) {
    const [err2, updatedScheme] = await withCatch( Schemes.update(changes, id) )
    if (err2) res.status(404).json({ error: 'Failed to update scheme.' });
    else res.json(updatedScheme);
  } else res.status(404).json({ error: 'Could not find scheme with given id.' });
});

// remove a scheme
router.delete('/:id', async (req, res) => { 
  const { id } = req.params;
  const [err, countDeleted] = await withCatch ( Schemes.remove(id) )

  if (err)res.status(500).json({ error: 'Failed to delete scheme.' });
  else if (countDeleted) res.json({ removed: countDeleted });
  else res.status(404).json({ error: 'Could not find scheme with given id.' });
});

module.exports = router;