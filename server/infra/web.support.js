/**
 * The generic filter class. Accepts the criteria, ordering and the paging parameters.
 */
class Filter {
    constructor(criteria = {}, orderBy = [], pages = {limit: 10, offset: 0}) {
        this.criteria = criteria;
        this.orderBy = orderBy;
        this.pages = pages;
    }
}

exports = module.exports = {
    Filter
};