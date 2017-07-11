import 'whatwg-fetch';
import { ValidateToken } from '../helpers';

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
          resolve(res.text());
        } else {
          reject('unexpected response from server');
        }
      }).catch(err => {
        reject(err);
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

        // We validate the token and store it on browser's localStorage
        let userInfo = ValidateToken(res.token);
        if (userInfo) {
          window.localStorage.setItem('API_TOKEN', res.token);
          resolve(userInfo);
        } else {
          reject('error')
        }
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

        // We validate the token and store it on browser's localStorage
        let userInfo = ValidateToken(res.token);
        if (userInfo) {
          window.localStorage.setItem('API_TOKEN', res.token);
          resolve(userInfo);
        } else {
          reject('error')
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
          resolve(res.text());
        } else {
          reject(res.status);
        }
      });
  })
}

function exerciseListGet() {
  return new Promise(function(resolve, reject) {
    const headers = getValidToken();
    headers['Content-Type'] = 'application/json';

    fetch(API_HOST + 'exercise', {
      headers
    })
      .then(res => {
        console.log(res.ok);
        console.log(res.status);
        console.log(res.statusText);
        if (res.status !== 200) {
          reject(res.status);
        }
        resolve(res.text());
      });
  })
}

function exercisePost(request) {
  return new Promise(function (resolve, reject) {
    // TODO: Validate the fields? later...
    const args = {
      'id': request.id,
      'name': request.name
    };

    const headers = getValidToken();
    headers['Content-Type'] = 'application/json';

    fetch(API_HOST + 'exercise', {
      method: 'POST',
      headers,
      body: JSON.stringify(args)
    })
      .then(res => {
        console.log(res.ok);
        console.log(res.status);
        console.log(res.statusText);
        if (res.status !== 200) {
          reject(res.status)
        }
        resolve(res.text())
      })

  });
}

function exercisePatch(exerciseId, updates) {
  return new Promise(function (resolve, reject) {
    // TODO: Validate the updates? later...

    const headers = getValidToken();
    headers['Content-Type'] = 'application/json';

    fetch(API_HOST + 'exercise/' + exerciseId, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(updates)
    })
      .then(res => {
        console.log(res.ok);
        console.log(res.status);
        console.log(res.statusText);
        if (res.status !== 200) {
          reject(res.status)
        }
        resolve(res.text())
      })

  });
}

function exerciseDelete(exerciseId) {
  return new Promise(function (resolve, reject) {

    const headers = getValidToken();
    headers['Content-Type'] = 'application/json';


    fetch(API_HOST + 'exercise/' + exerciseId, {
      method: 'DELETE',
      headers
    })
      .then(res => {
        console.log(res.ok);
        console.log(res.status);
        console.log(res.statusText);
        if (res.status !== 200) {
          reject(res.status)
        }
        resolve(res.text())
      })

  });
}

function exerciseSubscribe() {
  return new EventSource(API_HOST + "exerciseUpdates");
}

export default  {
    health,
    login,
    register,
    userGet,
    exerciseListGet,
    exercisePost,
    exercisePatch,
    exerciseDelete,
    exerciseSubscribe
}
