import axios from 'axios';
import {
	URL
} from '@/api'

const getUserBundles = (id) => axios.get(`${URL}bundles/?author_id=${id}`);
const createBundle = (payload) => axios.post(`${URL}bundles/`, payload);
const updateBundle = (payload, id) => axios.put(`${URL}bundles/${id}/`, payload);
const getBundle = (id) => axios.get(`${URL}bundles/${id}/`);
const deleteBundle = (id) => axios.delete(`${URL}bundles/${id}/`);

export default {
	createBundle,
	getUserBundles,
	updateBundle,
	getBundle,
	deleteBundle
}