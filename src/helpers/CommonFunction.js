import axios from "axios";
let apiURL = 'http://localhost:4080/';

export async function getAPICall(requestData) {
    return new Promise((resolve, reject) => {
        let params = {};

        for (const key in requestData.data) {
            if (requestData.data.hasOwnProperty(key)) {
                params[key] = requestData.data[key];
            }
        }

        axios.get(apiURL + requestData.url, {
            params: params,
            headers: {
                authorization: (localStorage.getItem('accessToken')) ? `Bearer ${localStorage.getItem('accessToken')}` : '',
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(result => {
            resolve(result.data);
        }).catch((error) => {
            reject(error);
        })
    })
}

export async function postAPICall(requestData) {
    return new Promise((resolve, reject) => {
        let params = {};

        for (const key in requestData.data) {
            if (requestData.data.hasOwnProperty(key)) {
                params[key] = requestData.data[key];
            }
        }

        axios.post(apiURL + requestData.url, params,{
            headers: {
                authorization: (localStorage.getItem('accessToken')) ? `Bearer ${localStorage.getItem('accessToken')}` : '',
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then(result => {
            resolve(result.data);
        }).catch((error) => {
            reject(error);
        })
    })
}

export async function putAPICall(requestData) {
    return new Promise((resolve, reject) => {
        let params = {};

        for (const key in requestData.data) {
            if (requestData.data.hasOwnProperty(key)) {
                params[key] = requestData.data[key];
            }
        }

        axios.put(apiURL + requestData.url, params,{
            headers: {
                authorization: (localStorage.getItem('accessToken')) ? `Bearer ${localStorage.getItem('accessToken')}` : '',
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then(result => {
            resolve(result.data);
        }).catch((error) => {
            reject(error);
        })
    })
}

export async function deleteAPICall(requestData) {
    return new Promise((resolve, reject) => {
        axios.delete(apiURL + requestData.url, {
            headers: {
                authorization: (localStorage.getItem('accessToken')) ? `Bearer ${localStorage.getItem('accessToken')}` : '',
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then(result => {
            resolve(result.data);
        }).catch((error) => {
            reject(error);
        })
    })
}