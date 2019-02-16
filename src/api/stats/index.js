import axios from 'axios';
import { URL } from '@/api';

const getTestAnswers = () => axios.get(`${URL}answers/`);
const postTestAnswer = payload => axios.post(`${URL}answers/`, payload);
const readTestAnswers = () => axios.get(`${URL}read-answers/`);
const deleteAnswers = id => axios.delete(`${URL}answers/${id}`);
//
const postZnoResult = payload =>
	axios.post(`http://127.0.0.1:8000/api/zno/`, payload);
const getZnoResult = () => axios.get(`http://127.0.0.1:8000/api/zno/`);
//
export default {
	getTestAnswers,
	postTestAnswer,
	deleteAnswers,
	readTestAnswers,
	postZnoResult,
	getZnoResult
};
