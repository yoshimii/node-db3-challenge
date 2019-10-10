const db = require('../data/dbConfig.js');

module.exports = {
    findSteps, 
    addStep,
    update,
    removeStep,
    removeSteps
}

function findSteps(schemeId) {//foreign key is steps column scheme_id
    return db
    .select('st.id', 'sch.scheme_name as EvilPlan', 'st.step_number', 'st.instructions as How', )
    .from('steps as st')
    .join('schemes as sch', 'sch.id', 'st.scheme_id')
    .where({ scheme_id: schemeId })
    .orderBy('st.step_number', 'asc')
}

function addStep(step) {
    return db('steps')
    .insert(step)
    .then(_ => step)
}

function update(changes, schemeId, stepNumber) {
    return db('steps')
        .update(changes)
        .where({scheme_id: schemeId})
        .andWhere({step_number: stepNumber})
        .then(_ => findSteps(schemeId).where({step_number: stepNumber}))
}

function removeStep(schemeId, stepNumber) {
    return db('steps')
    .where({ scheme_id: schemeId })
    .andWhere({step_number: stepNumber})
    .delete()
}

function removeSteps(schemeId) {
    return db('steps')
    .where({scheme_id: schemeId})
    .delete()
}
