import axios from 'axios';
import {
    URL
} from '@/api'


const getTestAnswers = () => axios.get(
    `${URL}answers/`
);
const postTestAnswer = (payload) => axios.post(
    `${URL}answers/`, payload
);

export default {
    getTestAnswers,
    postTestAnswer
}