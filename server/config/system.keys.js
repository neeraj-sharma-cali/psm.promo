'use strict';

/**
 * The configuration keys for the system.
 * @type {{mysql_host: string, mysql_port: string, mysql_user: string, mysql_password: string, mysql_db: string, mysql_root: string, mysql_root_password: string, port: string, rt_ctx: string}}
 */
exports = module.exports = {
    mysql_host: 'MYSQL_HOST',
    mysql_port: 'MYSQL_PORT',
    mysql_user: 'MYSQL_USER',
    mysql_password: 'MYSQL_PASSWORD',
    mysql_db: 'MYSQL_DATABASE',
    mysql_root: 'MYSQL_ROOT',
    mysql_root_password: 'MYSQL_ROOT_PASSWORD',
    port: 'SYS_PORT',
    rt_ctx: "RT_CTX"
};