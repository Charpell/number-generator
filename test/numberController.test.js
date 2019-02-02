require('iconv-lite/encodings');
const mock = require('mock-fs');
const chai = require('chai');
const request = require('chai-http');

const { expect } = chai;
chai.should();
chai.use(request);

const { numbersController, getNumbers } = require('../numbersController');
const app = require('../server');

describe('NumberController: POST', () => {
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
            .equal('Please enter a number greater than 0 ');
          done();
        }
      })
  })

  it("should return 400 if 'generateNumber' value is a string", (done) => {
    chai.request(app).post('/api/v1/numbers/generate', numbersController)
      .send({generateNumber: "stringM" })
      .end((err, res) => {
        if(!err) {
          expect(res).to.have.status(400);
          res.body.should.have.property('message')
            .equal('Please enter a number greater than 0 ');
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
          mock.restore();
          done();
        }
      })
  })
});

describe('NumberController: GET', () => {

  it('should return 200 and existing numbers when they exists', (done) => {
    mock({
      'data/phoneNumbers.txt': '0123456789,0112233445'
    });
    
    chai.request(app).get('/api/v1/numbers', getNumbers)
      .end((err, res) => {
        if(!err) {
          expect(res).to.have.status(200);
          res.body.should.have.property('message')
            .equal('phoneNumbers fetched successfully');
            expect(res.body).to.have.property('phoneNumbers').with.lengthOf(2);
            mock.restore();
          done();
        }
      })
  })

  it('should return 200 and a message if no number exists', (done) => {
    mock({
      'data': {}
    });
    chai.request(app).get('/api/v1/numbers', getNumbers)
      .end((err, res) => {
        if(!err) {
          expect(res).to.have.status(200);
          res.body.should.have.property('message')
            .equal('There are no phonNumbers yet!');
            mock.restore();
          done();
        }
      })
  })
});
