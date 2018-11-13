import axios from 'axios';

//const AUTH_URL = "http://127.0.0.1:8000/auth/"
const AUTH_URL = "https://zno-site.herokuapp.com/auth/"

const getToken = (token) => axios.post(`${AUTH_URL}google/`, {
	access_token: token
});
const refreshToken = (payload) => axios.post(`${AUTH_URL}refresh_token/`, payload)


export default {
	getToken,
	refreshToken
}