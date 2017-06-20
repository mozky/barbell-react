import fetch from 'node-fetch';

function health() {
    return new Promise(function (resolve, reject) {
        fetch('http://localhost:10010/health')
            .then(res => {
                if (res.status == 200) {
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

function login(payload) {
    return new Promise(function (resolve, reject) {
        console.log('TODO: Make request from payload data', payload)
        // We prepare the data...
        const args = {
            'username': 'moz',
            'password': 'moz'
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
                if (res.status == 200) {
                    resolve('TODO: Get response object from Barbell API');
                } else {
                    reject();
                }
            });
    });

}

export default  {
    health,
    login
}
