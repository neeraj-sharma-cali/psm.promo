/**
 * Created by neeraj on 6/17/17.
 */
/**
 * This layer only works with javascript objects. It receives objects and return observables.
 *
 * @type {{search: module.exports.search}}
 */
const {PromoError} = require('./images.protocol');
const image_repo = require('./images.repo');
const {KeywordsResult} = require('./images.protocol');

exports = module.exports = {
    search: function (filter) {
        function validate() {
            if (filter.criteria.keywords.includes("_promo.err")) {
                throw new PromoError(2, 1001, "Promo Error.");
            }
        }

        // we first validate the input in the svc. Any contextual validation or other data-based validations.
        validate();

        // and then we call the backend.
        // Reviewer NOTE :: in the interest of time, skipping this step for now.
        return image_repo.search(filter)
            .map(db_results => new KeywordsResult(db_results, db_results.size()));
    }
};