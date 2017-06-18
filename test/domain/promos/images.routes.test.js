/**
 * Created by neeraj on 6/18/17.
 */
'use strict';

const app = require('../../../server/boot'),
    chai = require('chai'),
    request = require('supertest');

const expect = chai.expect;
const base_url = `http://localhost:3000/api`;

describe('Promo Images API Tests', function () {

    describe('# Get images - Error cases', function () {
        it('should get 404 for unknown endpoints', function (done) {
            request(base_url).get('/blah').end(function (err, res) {
                expect(res.statusCode).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('major', 404);
                done();
            });
        });

        it('should get 404 for unsupported HTTP verbs', function (done) {
            request(base_url).post('/promos/images').end(function (err, res) {
                expect(res.statusCode).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('major', 404);
                done();
            });
        });

        it('should handle 500 system errors gracefully.', function (done) {
            request(base_url).get("/promos/images?keywords=_sys.err").end(function (err, res) {
                expect(res.statusCode).to.equal(500);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('major', 1);
                expect(res.body).to.have.property('minor', 100);
                done();
            });
        });

        it('should handle 500 functional errors gracefully.', function (done) {
            request(base_url).get("/promos/images?keywords=_promo.err").end(function (err, res) {
                expect(res.statusCode).to.equal(500);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('major', 2);
                expect(res.body).to.have.property('minor', 1001);
                done();
            });
        });



        // Have sealed the api to catch errors. Uncomment the case to simulate errors that would be caught by catch-all.
        /*it('should handle 500 catch-all default errors gracefully.', function (done) {
         request(base_url).get("/promos/images").end(function (err, res) {
         expect(res.statusCode).to.equal(500);
         expect(res.body).to.be.an('object');
         done();
         });
         });*/
    });

    describe('# Get images - Success cases', function () {
        it('no params - should get 200 and valid data', function (done) {
            request(base_url).get('/promos/images').end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.imagesData).to.be.an('array');
                expect(res.body.imagesData).to.have.lengthOf(0);
                expect(res.body.numberResults).to.equal(0);
                done();
            });
        });

        it('valid keywords, no limit specified - should get 200 and only 1 image', function (done) {
            request(base_url).get('/promos/images?keywords=desert').end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.imagesData).to.be.an('array');
                expect(res.body.imagesData).to.have.lengthOf(1);
                expect(res.body.numberResults).to.equal(1);
                done();
            });
        });

        it('valid keywords, limit specified - should get 200 and images limited by limit', function (done) {
            request(base_url).get('/promos/images?keywords=desert&numImages=3').end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.imagesData).to.be.an('array');
                expect(res.body.imagesData).to.have.lengthOf(3);
                expect(res.body.numberResults).to.equal(3);
                done();
            });
        });

        it('invalid additional params are ignored - should get 200 and valid data', function (done) {
            request(base_url).get('/promos/images?keywords=desert&numImages=3&aaa=ada').end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.imagesData).to.be.an('array');
                expect(res.body.imagesData).to.have.lengthOf(3);
                expect(res.body.numberResults).to.equal(3);
                done();
            });
        });

        it('partially valid params with additional params - should get 200 and valid data assuming defaults', function (done) {
            request(base_url).get('/promos/images?keywords=desert&aaa=ada').end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.imagesData).to.be.an('array');
                expect(res.body.imagesData).to.have.lengthOf(1);
                expect(res.body.numberResults).to.equal(1);
                done();
            });
        });

        it('keywords with no match - should get 200 and no data', function (done) {
            request(base_url).get('/promos/images?keywords=blah&numImages=3').end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.imagesData).to.be.an('array');
                expect(res.body.imagesData).to.have.lengthOf(0);
                expect(res.body.numberResults).to.equal(0);
                done();
            });
        });
    });
});