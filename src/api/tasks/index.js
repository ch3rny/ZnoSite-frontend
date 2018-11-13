import axios from 'axios';
import {
	URL
} from '@/api'


const getTasks = (years, themes, types, znoTypes) => axios.get(
	`${URL}tasks/?year__in=${years}&theme__name__in=${themes}&type__in=${types}&zno_type__in=${znoTypes}`
);
const getBundleTasks = (tasks) => axios.get(`${URL}tasks/?id__in=${tasks}`);

export default {
	getTasks,
	getBundleTasks
}