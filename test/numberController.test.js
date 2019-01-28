require('iconv-lite/encodings');
const mock = require('mock-fs');
const chai = require('chai');
const request = require('chai-http');

const { expect } = chai;
chai.should();
chai.use(request);

const { numbersController } = require('../numbersController');
const app = require('../server');


describe('NumberController', () => {
  let testNumbers = [];
  before(function () {
    mock({
      'data': {}
    });
  });
  after(mock.restore);

  it("should return 400 if 'generateNumber' value is less than 1", (done) => {
    chai.request(app).post('/api/v1/numbers/generate', numbersController)
      .send({generateNumber: 0 })
      .end((err, res) => {
        if(!err) {
          expect(res).to.have.status(400);
          res.body.should.have.property('message')
            .equal('Please enter number greater than 0 ');
          done();
        }
      })
  })

  it('should create a new file if file does not exist', (done) => {
    chai.request(app).post('/api/v1/numbers/generate', numbersController)
      .send({ generateNumber: 2 })
      .end((err, res) => {
        if (!err) {
          testNumbers = res.body.phoneNumbers;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('phoneNumbers').with.lengthOf(2);
          done();
        }
      })
  })
  it('should add new numbers to already existing list', (done) => {
    chai.request(app).post('/api/v1/numbers/generate', numbersController)
      .send({ generateNumber: 3 })
      .end((err, res) => {
        if (!err) {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('phoneNumbers').with.lengthOf(5);
          done();
        }
      })
  })
});
