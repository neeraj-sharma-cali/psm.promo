/**
 * Created by neeraj on 6/18/17.
 */

// MOCK data. Just for prototype.
const images = [
    {
        url: "http://images.1.com",
        width: 50,
        height: 25,
        keywords: ['desert', 'flowers']
    },
    {
        url: "http://images.2.com",
        width: 50,
        height: 25,
        keywords: ['blue', 'desert']
    },
    {
        url: "http://images.3.com",
        width: 50,
        height: 25,
        keywords: ['blue', 'flowers']
    },
    {
        url: "http://images.4.com",
        width: 50,
        height: 25,
        keywords: ['desert', 'blue']
    },
    {
        url: "http://images.5.com",
        width: 50,
        height: 25,
        keywords: ['desert', 'flowers']
    },
    {
        url: "http://images.6.com",
        width: 50,
        height: 25,
        keywords: ['desert', 'flowers']
    },
    {
        url: "http://images.7.com",
        width: 50,
        height: 25,
        keywords: ['desert', 'flowers']
    },
    {
        url: "http://images.8.com",
        width: 50,
        height: 25,
        keywords: ['desert', 'flowers']
    },
    {
        url: "http://images.9.com",
        width: 50,
        height: 25,
        keywords: ['desert', 'flowers']
    },
    {
        url: "http://images.10.com",
        width: 50,
        height: 25,
        keywords: ['desert', 'blue']
    }
];

const _ = require('lodash');
const {SystemError} = require('../../infra/system.error');
class DBError extends SystemError {
    constructor() {
        super(-20, undefined, "DB not available");
    }
}

/**
 * The DB mock to simulate DB behavior. I use lodash here to chain the ops;
 * filter, limit results with 0 offset (always - per requirement), and then map over to omit keywords.
 *
 * I actually really like the keywords being returned, to be able to validate the results. Discuss with ...?
 */
class MockRepo {

    search(filter) {
        if (filter.criteria.keywords.includes("_sys.err")) {
            throw new DBError();
        }

        return _.chain(images)
            .filter(image => _.intersection(image.keywords, filter.criteria.keywords).length > 0)
            .take(filter.pages.limit)
            .map(x => _.omit(x, 'keywords')); // comment this line to see keywords used to return this result.
    }
}

const mock = new MockRepo();

exports = module.exports = mock;