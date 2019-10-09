 const db = require('./dbConfig');

 module.exports = {
     find,
     findById,
     findStepsById,
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

function findStepsById(id) {

}

function add(scheme) {
     
}

function addStep(step) {
     
}

function remove(id) {
     
}