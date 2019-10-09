 const db = require('./dbConfig');

 module.exports = {
     find,
     findById,
     findSteps,
     add,
     addStep,
     remove
 }

 function find() {
    return db('schemes')
 }

 function findById(id) {
     return db('schemes')
     .where({ id })
     .first()
}

function findSteps(schemeId) {//foreign key is steps column scheme_id
    return db('steps as st')
    .join('schemes as sch', 'sch.id', 'st.scheme_id')
    .select('st.id', 'sch.scheme_name as EvilPlan', 'st.instructions as How', )
    .where({ scheme_id: schemeId });
}

function add(scheme) {
     
}

function addStep(step) {
     
}

function remove(id) {
     
}