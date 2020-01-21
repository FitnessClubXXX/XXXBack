var expect  = require('chai').expect;
var request = require('request');

it('API is running', function (done) {
  request('http://localhost:3003/', function (error, response, body) {
    expect(body).to.equal('App is working!');
    done();
  });
});

it('Login with correct data', function (done) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      { 
        mail: "test@gmail2.com",
        password: "test-passwd" 
      }),
  };

  request('http://localhost:3003/login', options, function (error, response, body) {
    expect(response.statusCode).to.equal(200);
    done();
  });
});

it('Login with invalid email', function (done) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      { 
        mail: "incorrect223@gmail2.com",
        password: "test-passwd" 
      }),
  };

  request('http://localhost:3003/login', options, function (error, response, body) {
    expect(response.statusCode).to.equal(404);
    done();
  });
});


it('Login with invalid password', function (done) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      { 
        mail: "test@gmail2.com",
        password: "test-passwd-incorrect!" 
      }),
  };

  request('http://localhost:3003/login', options, function (error, response, body) {
    expect(response.statusCode).to.equal(401);
    done();
  });
});


it('Get user by correct email', function (done) {
  request('http://localhost:3003/user/test@gmail2.com', function (error, response, body) {
    expect(response.statusCode).to.equal(200);
    done();
  });
});

it('Get user by non-existing email', function (done) {
  request('http://localhost:3003/user/incorrect', function (error, response, body) {
    expect(response.statusCode).to.equal(404);
    done();
  });
});