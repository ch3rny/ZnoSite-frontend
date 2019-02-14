import axios from 'axios';
import { URL } from '@/api';

axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

const TELGRAM_BOT_URL =
	'https://api.telegram.org/bot646261973:AAGDMWCL2gNpYKU8xn3OKgtGNeiBiOYL0BU/';

const sendReview = (payload, token) =>
	axios.post(`${URL}reviews/`, payload, {
		// headers: {
		// 	"Authorization": `Bearer ${
		// 		token
		// 	}`
		// }
	});

const sendTelegramMessage = (chatId, message) =>
	axios.get(`${TELGRAM_BOT_URL}sendMessage`, {
		params: {
			chat_id: chatId,
			text: message
		}
	});
const sendTelegramDocument = payload =>
	axios.post(`${TELGRAM_BOT_URL}sendDocument`, payload, {
		headers: {
			accept: 'application/json',
			'Content-Type': `multipart/form-data;`
		}
	});

export default {
	sendReview,
	sendTelegramMessage,
	sendTelegramDocument
};
