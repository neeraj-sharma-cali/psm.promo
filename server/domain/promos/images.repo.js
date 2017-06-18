/**
 * Created by neeraj on 6/18/17.
 */
const Rx = require('rxjs/Rx');

const {SystemError} = require('../../infra/system.error');
const mock_db = require("./images.repo.mock");

/**
 * The DB proxy to interface with the backend.
 * Capture the backend end table name, statements, and then either use another abstraction to
 * actually execute query, async to avoid io blocking.
 *
 * TODO - In the interest of time, skipping all the DB related details. TBD.
 */
class DbProxy {

    search(filter) {
        try {
            return Rx.Observable.of(mock_db.search(filter));
        } catch (e) {
            throw new SystemError(1, 100, "System Error. Check Database.");
        }
    }
}

const dbProxy = new DbProxy();

exports = module.exports = dbProxy;