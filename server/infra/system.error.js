/**
 * Created by neeraj on 6/18/17.
 */
/**
 * The generic error with major and minor code and the corresponding message.
 */
class Error {
    constructor(major, minor, msg) {
        this.major = major;
        this.minor = minor;
        this.msg = msg;
    }
}

/**
 * The System error.
 */
class SystemError extends Error {
}

/** Web based errors - 500 & 404 **/
class _500 extends SystemError {
    constructor() {
        super(500, undefined, "Unknown Internal Server Error");
    }
}

class _404 extends SystemError {
    constructor() {
        super(404, undefined, "Endpoint Not Found.");
    }
}

exports = module.exports = {
    Error,
    SystemError,
    _500: new _500(),
    _404: new _404()
};