'use strict';

const chai = require('chai');
const request = require('supertest');
const sinon = require('sinon');
const sinonAsPromised = require('sinon-as-promised');

const app = require('../server').app;
const Errors = require('../config/errors.json');

const expect = chai.expect;

describe('sends request to server', () => {
    it('should fail if the request is not recognised', (done) => {
        request(app)
            .post('/unknown-route')
            .send({})
            .expect(404)
            .end((error, response) => {
                if(error) {
                    console.log(error);
                }

                expect(error).to.equal(null);
                expect(response.text)
                    .to.be.an('string')
                    .to.eql(Errors.UNKNOWN_ROUTE);

                done();
            });
    });

    it('should fail if the token is invalid', (done) => {
        const body = {
            token: 'invalid-token',
            team_id: 'T0001',
            team_domain: 'example',
            channel_id: 'C2147483705',
            channel_name: 'test',
            user_id: 'U2147483697',
            user_name: 'Steve',
            command: '/quentin',
            text: '94070',
            response_url: 'https://hooks.slack.com/commands/1234/5678'
        };

        request(app)
            .post('/quentin')
            .send(body)
            .expect(401)
            .end((error, response) => {
                if(error) {
                    console.log(error);
                }

                expect(error).to.equal(null);
                expect(response.text)
                    .to.be.an('string')
                    .to.eql(Errors.INVALID_SLACK_TOKEN);

                done();
            });
    });
});