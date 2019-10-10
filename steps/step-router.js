const express = require('express');
const Steps = require('./step-model');
const withCatch = require('../utils.js')

const router = express.Router();

// get all steps for a particular scheme
router.get('/:scheme_id', async (req, res) => {
    const { scheme_id: id } = req.params;
    const [err, steps] = await withCatch( Steps.findSteps(id) )
  
    if (err) res.status(500).json({ error: 'Failed to get steps.' });
    else if (steps.length) res.json(steps);
    else res.status(404).json({ 
      error: 'Could not find steps for given scheme.',
      steps: null
    })
});

// add a step for a scheme
router.post('/:scheme_id', async (req, res) => {
    const { scheme_id: id } = req.params; 
    const stepData = req.body;
    const [err, steps] = await withCatch ( Steps.findSteps(id) )
    
    if (err) res.status(500).json({ error: 'Could not find scheme with given id.' });
    else if (steps) {
        const [err2, insertedStep] = await withCatch( Steps.addStep(stepData) )
        if (err2) res.status(500).json({ error: 'Failed to create new step.' })
        else res.status(201).json(insertedStep);
    } else res.status(500).json({ error: 'Failed to create new step.' })
});

router.put('/:scheme_id/:step_number', async (req, res) => {
    const [err, updatedStep] = await withCatch( Steps.update(req.body, req.params.scheme_id, req.params.step_number) )
    if (err) res.status(500).json({ error: 'Could not update step with given id.' })
    else res.status(200).json(updatedStep)
})
//remove all steps
router.delete('/:scheme_id', async (req, res) =>  { 
    const [err, countDeleted] = await withCatch ( Steps.removeSteps(req.params.scheme_id) )
  
    if (err) res.status(500).json({ error: err })
    else if (countDeleted) res.status(200).json({ stepsDeleted: countDeleted })
    else res.status(500).json({error: 'Trouble deleting the steps with the specified scheme id.'})
});

//remove a single step
router.delete('/:scheme_id/:step_number', async (req, res) => {
    const [err, countDeleted] = await withCatch( Steps.removeStep(req.params.scheme_id, req.params.step_number) )

    if (err) res.status(500).json({ error: err })
    else if (countDeleted) res.status(200).json({ stepDeleted: countDeleted })
    else res.status(500).json({error: 'Trouble deleting the steps with the specified scheme id.'})
});

module.exports = router;