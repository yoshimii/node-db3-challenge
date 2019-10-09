 const db = require('../data/dbConfig')

 module.exports = {
    find,
    findById,
    add,
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

function add(scheme) {
    return db('schemes')
    .insert(scheme)
    .then(([id]) => findById(id))
}

function remove(id) {
    return db('schemes')
    .where({id})
    .delete()
}
