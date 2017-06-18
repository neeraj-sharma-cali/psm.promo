/**
 * Created by neeraj on 6/17/17.
 */
'use strict';

const db_init = require('../../cxn/db/db.init');
const db_migrator = require('../../cxn/db/db.migrator');


/**
 * DB proxy boot to keep the App and DB in sync. It will,
 *  - First initialize the Database. Create Schemas, Users, Privileges etc.
 *  - And then migrate the Database to the latest version of the schema. All tables, views etc. would be migrated to the latest.
 * @type {{boot: (())}}
 */
module.exports = {
    boot: () => {
        return db_init()
            .flatMap(() => db_migrator())
    }
};
