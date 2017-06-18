/**
 * Created by neeraj on 6/17/17.
 */

const db_config = require('./db.config');
const Rx = require('rxjs/Rx');

/**
 * Initialize DB and required objects. We make the DB connection and create USER, SCHEMA ETC.
 * The DB creation script needs to be smart and should address 'IF EXISTS' scenarios.
 * We can improvise and do not need to do this, if the DB is shared etc.
 *
 * Simulating the DB Initialization.

 * @type {()}
 */
exports = module.exports = () => {
    console.log(`DB ${db_config.host}:${db_config.port} Initialized.`);
    console.log(`User "dev-1" created. Privileges granted.`);
    return Rx.Observable.of({});
};