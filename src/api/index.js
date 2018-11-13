//export const URL = "http://127.0.0.1:8000/api/"
export const URL = "https://zno-site.herokuapp.com/api/"

import auth from './auth'
import bundles from './bundles';
import reviews from './reviews'
import tasks from './tasks';

export default {
	auth,
	bundles,
	reviews,
	tasks
};