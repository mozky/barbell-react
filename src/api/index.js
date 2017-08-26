import 'whatwg-fetch'
import { ValidateToken, RemoveToken } from '../helpers'

const API_HOST = "http://localhost:10010/"

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
          resolve(res.text())
        } else {
          reject('unexpected response from server')
        }
      }).catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

function login(request) {
  return new Promise(function (resolve, reject) {
    // TODO: Validate the fields? later...
    const args = {
      'username': request.username,
      'password': request.password
    }

    fetch(API_HOST + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(args)
    })
      .then(res => {
        console.log('POST LOGIN', res.ok, res.status, res.statusText)
        if (res.status !== 200) {
          reject(res.status)
        }
        return res.text()
      })
      .then(body => {
        let res = JSON.parse(body)
        if (!res.success) {
          reject(res.message)
        }

        // We validate the token and store it on browser's localStorage
        let userInfo = ValidateToken(res.token)
        if (userInfo) {
          window.localStorage.setItem('API_TOKEN', res.token)
          resolve(userInfo)
        } else {
          reject('error')
        }
      }).catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

function register(request) {
  return new Promise(function (resolve, reject) {
    // TODO: Validate the fields? later...
    const args = {
      'username': request.username,
      'email': request.email,
      'password': request.password
    }

    fetch(API_HOST + 'user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(args)
    })
      .then(res => {
        console.log('POST REGISTER', res.ok, res.status, res.statusText)
        if (res.status !== 200) {
          reject(res.status)
        }
        return res.text()
      })
      .then(body => {
        let res = JSON.parse(body)
        if (!res.success) {
          reject(res.message)
        }

        // We validate the token and store it on browser's localStorage
        let userInfo = ValidateToken(res.token)
        if (userInfo) {
          window.localStorage.setItem('API_TOKEN', res.token)
          resolve(userInfo)
        } else {
          reject('error')
        }
      }).catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

function userGet(username) {
  return new Promise(function(resolve, reject) {
    let headers = getValidToken()
    fetch(API_HOST + 'user/' + username, {
      headers
    })
      .then(res => {
        console.log('GET USER', res.ok, res.status, res.statusText)
        if (res.status === 200) {
          resolve(res.text())
        } else if (res.status === 403) {
          console.log('token expired or user revoked access')
          RemoveToken()
        } else {
          reject(res.status)
        }
      }).catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

function exerciseListGet() {
  return new Promise(function(resolve, reject) {
    const headers = getValidToken()
    headers['Content-Type'] = 'application/json'

    fetch(API_HOST + 'exercise', {
      headers
    })
      .then(res => {
        console.log('GET EXERCISE LIST', res.ok, res.status, res.statusText)
        if (res.status !== 200) {
          reject(res.status)
        }
        resolve(res.text())
      }).catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

function exercisePost(request) {
  return new Promise(function (resolve, reject) {
    // TODO: Validate the fields? later...
    const args = {
      'id': request.id,
      'name': request.name
    }

    const headers = getValidToken()
    headers['Content-Type'] = 'application/json'

    fetch(API_HOST + 'exercise', {
      method: 'POST',
      headers,
      body: JSON.stringify(args)
    })
      .then(res => {
        console.log('POST EXERCISE', res.ok, res.status, res.statusText)
        if (res.status !== 200) {
          reject(res.status)
        }
        resolve(res.text())
      }).catch(err => {
        console.log(err)
        reject(err)
      })

  })
}

function exercisePatch(exerciseId, updates) {
  return new Promise(function (resolve, reject) {
    // TODO: Validate the updates? later...

    const headers = getValidToken()
    headers['Content-Type'] = 'application/json'

    fetch(API_HOST + 'exercise/' + exerciseId, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(updates)
    })
      .then(res => {
        console.log('PATCH EXERCISE', res.ok, res.status, res.statusText)
        if (res.status !== 200) {
          reject(res.status)
        }
        resolve(res.text())
      }).catch(err => {
        console.log(err)
        reject(err)
      })

  })
}

function exerciseDelete(exerciseId) {
  return new Promise(function (resolve, reject) {

    const headers = getValidToken()
    headers['Content-Type'] = 'application/json'


    fetch(API_HOST + 'exercise/' + exerciseId, {
      method: 'DELETE',
      headers
    })
      .then(res => {
        console.log('DELETE EXERCISE', res.ok, res.status, res.statusText)
        if (res.status !== 200) {
          reject(res.status)
        }
        resolve(res.text())
      }).catch(err => {
        console.log(err)
        reject(err)
      })

  })
}

function exerciseSubscribe() {
  const eventSource = new EventSource(API_HOST + "exerciseUpdates")

  eventSource.onerror = function(e) {
    console.log("EventSource failed", e)
    eventSource.close()
  }

  return eventSource
}

function routinePost(request) {
  return new Promise(function (resolve, reject) {
    // TODO: Validate the fields? later...
    const args = {
      'name': request.name || (request.username + '-' + Date.now()),
      'creator': request.userId,
      'data': request.routine,
      'type': request.type,
      // 'category': request.category,
    }

    const headers = getValidToken()
    headers['Content-Type'] = 'application/json'

    fetch(API_HOST + 'routine', {
      method: 'POST',
      headers,
      body: JSON.stringify(args)
    })
      .then(res => {
        console.log('POST ROUTINE', res.ok, res.status, res.statusText)
        if (res.status !== 200) {
          reject(res.status)
        }
        resolve(res.text())
      }).catch(err => {
        console.log(err)
        reject(err)
      })

  })
}

function routineGet(routineId) {
  return new Promise(function(resolve, reject) {
    let headers = getValidToken()
    fetch(API_HOST + 'routine/' + routineId, {
      headers
    })
      .then(res => {
        console.log('GET ROUTINE', res.ok, res.status, res.statusText)
        if (res.status === 200) {
          resolve(res.text())
        } else if (res.status === 403) {
          console.log('token expired or user revoked access')
          RemoveToken()
        } else {
          reject(res.status)
        }
      }).catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

function subscriptionGet(subscriptionId) {
  return new Promise(function(resolve, reject) {
    let headers = getValidToken()
    fetch(API_HOST + 'subscription/' + subscriptionId, {
      headers
    })
      .then(res => {
        console.log('GET SUBSCRIPTION', res.ok, res.status, res.statusText)
        if (res.status === 200) {
          resolve(res.text())
        } else if (res.status === 403) {
          console.log('token expired or user revoked access')
          RemoveToken()
        } else {
          reject(res.status)
        }
      }).catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

function subscriptionPost(request) {
  return new Promise(function(resolve, reject) {
    const args = {
      'user': request.userId,
      'routine': request.routineId,
      'date': request.subscriptionDate,
    }

    const headers = getValidToken()
    headers['Content-Type'] = 'application/json'

    fetch(API_HOST + 'subscription', {
      method: 'POST',
      headers,
      body: JSON.stringify(args)
    })
      .then(res => {
        console.log('POST SUBSCRIPTION', res.ok, res.status, res.statusText)
        if (res.status !== 200) {
          reject(res.status)
        }
        resolve(res.text())
      }).catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

function subscriptionPatch(subscriptionId, updates) {
  return new Promise(function (resolve, reject) {
    // TODO: Validate the updates? later...

    const headers = getValidToken()
    headers['Content-Type'] = 'application/json'

    fetch(API_HOST + 'subscription/' + subscriptionId, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(updates)
    })
      .then(res => {
        console.log('PATCH SUBSCRIPTION', res.ok, res.status, res.statusText)
        if (res.status !== 200) {
          reject(res.status)
        }
        resolve(res.text())
      }).catch(err => {
        console.log(err)
        reject(err)
      })

  })
}

function recordPost(request) {
  return new Promise(function (resolve, reject) {
    // TODO: Validate the fields? later...
    const args = {
      'user': request.userId,
      'date': request.date,
      'data': request.recordData,
      'routine': request.routineId,
    }

    console.log('request data', args)

    const headers = getValidToken()
    headers['Content-Type'] = 'application/json'

    fetch(API_HOST + 'record', {
      method: 'POST',
      headers,
      body: JSON.stringify(args)
    })
      .then(res => {
        console.log('POST RECORD', res.ok, res.status, res.statusText)
        if (res.status !== 200) {
          reject(res.status)
        }
        resolve(res.text())
      }).catch(err => {
        console.log(err)
        reject(err)
      })

  })
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
    exerciseSubscribe,
    routinePost,
    routineGet,
    subscriptionGet,
    subscriptionPost,
    subscriptionPatch,
    recordPost
}
