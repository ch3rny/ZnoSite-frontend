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
const readTestAnswers = () => axios.get(
    `${URL}read-answers/`
)

const deleteAnswers = (id) => axios.delete(`${URL}answers/${id}`)

export default {
    getTestAnswers,
    postTestAnswer,
    deleteAnswers,
    readTestAnswers
}