const sqlite = require("sqlite3");

const db = new sqlite.Database("database.sqlite")

function run (sql, params = []) {
    return new Promise(((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) {
                console.log('Error running sql ' + sql)
                console.log(err)
                reject(err)
            } else {
                resolve({ id: this.lastID })
            }
        })
    }))
}

function get (sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, function (err, result) {
            if (err) {
                console.log('Error running sql: ' + sql)
                console.log(err)
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

function all (sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                console.log('Error running sql: ' + sql)
                console.log(err)
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}


module.exports = {
    run,
    get,
    all
};