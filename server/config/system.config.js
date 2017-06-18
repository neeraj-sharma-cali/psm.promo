'use strict';

/**
 * The configuration of the system. We use nconf that works with the following precedence:
 *  1. commandline : arguments on the commandline e.g. --MYSQL_HOST mhost
 *  2. environment : the environment variable. e.g. SET MYSQL_HOST=mhost (windows) or export MYSQL_HOST=mhost (unix)
 *  3. json file  : config.json in the local filesystem.
 *  4. hardcoded default : in the code.
 */

const nconf = require('nconf');
const path = require('path');
const keys = require('./system.keys');

nconf
// 1. Command-line arguments
    .argv()
    // 2. Environment variables
    .env([
        keys.mysql_host,
        keys.mysql_port,
        keys.mysql_user,
        keys.mysql_password,
        keys.mysql_db,
        keys.mysql_root,
        keys.mysql_root_password,
        keys.port,
        keys.rt_ctx
    ])
    // 3. Config file
    .file({file: path.join(__dirname, 'config.json')})
    // 4. Defaults
    .defaults({
        MYSQL_HOST: 'mysql_host',
        MYSQL_PORT: '3306',
    });

// Check for required settings
// TODO - add configuration checks to narrow the failure during boot itself.

function checkConfig(setting) {
    if (!nconf.get(setting)) {
        throw new Error(`You must set ${setting} as an environment variable or in config.json!`);
    }
}

/**
 * Please review notes above at the top of the file.
 * @type {{port: *, db: {host: *, port: *}}}
 */
exports = module.exports = {
    port: nconf.get(keys.port),
    db: {
        host: nconf.get(keys.mysql_host),
        port: nconf.get(keys.mysql_port)
    }
    // TODO - add other keys ...
};