import fetch from 'node-fetch';

// CONTIENE LAS FUNCIONES QUE MAPEAN LOS DIFERENTES METODOS DE LA API

function health() {
    return new Promise(function (resolve, reject) {
        fetch('http://localhost:10010/health')
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

        fetch('http://localhost:10010/login', {
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

function register(request) {
    return new Promise(function (resolve, reject) {
        // TODO: Validate the fields? later...
        const args = {
            'username': request.username,
            'email': request.email,
            'password': request.password
        };

        fetch('http://localhost:10010/user', {
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

export default  {
    health,
    login,
    register,
}
