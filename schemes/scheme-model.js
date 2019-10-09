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
     return db('')
}

function findSteps() {
     return db('steps')
}

function add(scheme) {
     
}

function addStep(step) {
     
}

function remove(id) {
     
}