const mock = require('mock-fs');
// const express = require('express');
// const request = require('supertest');
const chai = require('chai');
const request = require('chai-http');


const app = require('../server');
const { expect } = chai;
chai.should();
chai.use(request);

const { numbersController } = require('../numbersController');

describe('NumberController fs', () => {
  it('should create new numbers and save to file', (done) => {
    mock({
      'data': {
          'test.txt': 'wgdhdjkskdh'
        }
    });
      chai.request(app).post('/generateNumbers', numbersController)
      .send({ generateNumber: 2 })
      .end((err, data) => {
        if(!err) {
          console.log("WHY");
          done();
        }
      })
    })
  })
// 'phoneNumbers.csv': '0123456789,0112233445'

// describe('NumbersController', () => {
//   it('should hit the test route',  (done) => {
//     request(app).get('/tester').expect(200, done);
//   });
  
//   it("should return 400 if 'generateNumber' value is less than 1", (done) => {
//     request(app).post('/generateNumbers')
//       .send({ generateNumber: 0 })
//       .expect(400, done);
//   });
// });
