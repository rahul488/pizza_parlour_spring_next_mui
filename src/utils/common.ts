import axios from 'axios';
const httpInstance = axios.create({
  baseURL: 'https://pizza-parlour.onrender.com/pizza-parlour',
});
//live URL
// https://pizza-parlour.onrender.com/

export default httpInstance;
