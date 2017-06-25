import fetch from 'node-fetch';

const API_HOST = "http://localhost:10010/";

// CONTIENE LAS FUNCIONES QUE MAPEAN LOS DIFERENTES METODOS DE LA API
function getValidToken(token) {
  return {
    'X-API-KEY': window.localStorage.getItem('API_TOKEN')
  }
}

function health() {
  return new Promise(function (resolve, reject) {
    fetch(API_HOST + 'health')
      .then(res => {
        if (res.status === 200) {
          resolve();
        } else {
          reject();
        }
        return res.text()
      })
      .then(body => {
        console.log('Response body', body)
      });
  });
}

function login(request) {
  return new Promise(function (resolve, reject) {
    // TODO: Validate the fields? later...
    const args = {
      'username': request.username,
      'password': request.password
    };

    fetch(API_HOST + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(args)
    })
      .then(res => {
        console.log(res.ok);
        console.log(res.status);
        console.log(res.statusText);
        if (res.status !== 200) {
          reject(res.status)
        }
        return res.text();
      })
      .then(body => {
        let res = JSON.parse(body);
        if (!res.success) {
          reject(res.message);
        }
        window.localStorage.setItem('API_TOKEN', res.token);
        resolve('TODO: Give back user info');
      });
  });
}

function register(request) {
  return new Promise(function (resolve, reject) {
    // TODO: Validate the fields? later...
    const args = {
      'username': request.username,
      'email': request.email,
      'password': request.password
    };

    fetch(API_HOST + 'user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(args)
    })
      .then(res => {
        console.log(res.ok);
        console.log(res.status);
        console.log(res.statusText);
        if (res.status === 200) {
          resolve('TODO: Get response object from Barbell API');
        } else {
          reject(res.status);
        }
      });
  });
}

function userGet(username) {
  return new Promise(function(resolve, reject) {
    let headers = getValidToken();
    fetch(API_HOST + 'user/' + username, {
      headers
    })
      .then(res => {
        console.log(res.ok);
        console.log(res.status);
        console.log(res.statusText);
        if (res.status === 200) {
          resolve('TODO: Get response object from Barbell API');
        } else {
          reject(res.status);
        }
      });
  })
}

export default  {
    health,
    login,
    register,
    userGet,
}
