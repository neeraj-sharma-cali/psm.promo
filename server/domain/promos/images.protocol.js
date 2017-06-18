/**
 * Created by neeraj on 6/18/17.
 */
/**
 * The message exchanges to-fro from the promo endpoint.
 * Included Input, Output and Error messages.
 */
const {Filter} = require('../../infra/web.support');
const {Error} = require('../../infra/system.error');

/**
 * The Keywords Filter.
 */
class KeywordsFilter extends Filter {
}

/**
 * If there is a problem with the promo end-point. This error is returned.
 * e.g. If you add defensive checks for the presence of attributes.
 */
class PromoError extends Error {
}

/**
 * The details of the image per the keyword.
 */
class ImageDetails {
    constructor(url, width, height) {
        this.url = url;
        this.width = width;
        this.height = height;
    }
}

/**
 * The keywords based results.
 */
class KeywordsResult {
    constructor(imagesData, numberResults) {
        this.imagesData = imagesData;
        this.numberResults = numberResults;
    }
}

exports = module.exports = {
    KeywordsFilter,
    KeywordsResult,
    PromoError,
    ImageDetails
};