const db_proxy = require("./cxn/db/db.proxy.boot");
const app = require("./app.js");

// boot the DB and then boot the app.
db_proxy
    .boot()
    .subscribe(() => app.boot());