import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-86646.firebaseio.com/'
});

export default instance;
