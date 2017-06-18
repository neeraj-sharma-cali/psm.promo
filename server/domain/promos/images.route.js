const url = require('url');
const svc = require("./images.svc");
const {KeywordsFilter} = require('./images.protocol');

// the images REST end-point.
const base = '/promos/images';

/**
 * Function to convert request to filter.
 * It assumes sensible defaults, if required inputs are not found and then returns a filter object.
 *
 * TODO: no error checks are added here. The defaults should suffice. But error checks can be easily added here.
 *
 * @param req The HTTP request.
 * @returns {*} The Keywords filter object with paging parameters.
 */
function toFilter(req) {
    const query = url.parse(req.url, true).query;

    // TODO: ADD checks here, per any other requirements to validate input.

    /* This code has an example of a Developer mistake to trigger the catch-all default error handler.
     * The developer (deliberately, in this case) does not check for presence of keywords.
     * swap the commented and uncommented keywords line below to toggle error condition.*/
    return new KeywordsFilter(
        {
            'keywords': query.keywords && query.keywords.split(",") || []
            //'keywords': query.keywords.split(",") || []
        },
        [],
        {
            'limit': query.numImages || 1,
            offset: query.offset || 0
        }
    )
}

exports = module.exports = {
    base,
    routes: (router) => {
        router.get(base, (req, res) => {
            svc.search(toFilter(req))
                .subscribe(keyword_results => res.json(keyword_results))
                .catch(e => res.status(500).json(e));
        });

        // other REST functions. POST, PUT .... etc.
    }
};
