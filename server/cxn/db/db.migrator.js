/**
 * Created by neeraj on 6/17/17.
 */

const db_config = require("./db.config");
const Rx = require('rxjs/Rx');

/**
 * Migrate the DB to the latest version. This allows the DB to be in sync with the application at all the time.
 * The DB migration script needs to be smart and should address 'IF EXISTS' scenarios.
 * We can use a npm module that can help us maintain a "SCHEMA_VERSION" in the DB to provide DB version management.
 *
 * Reviewer NOTE :: Simulating the DB Migration.
 * @type {()}
 */
exports = module.exports = () => {
    console.log(`DB ${db_config.host}:${db_config.port} migrated to version v_<number>.`);
    return Rx.Observable.of({});
};