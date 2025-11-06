import axios from 'axios';


const api = axios.create({
    baseURL: "http://192.168.1.85:8080",
    headers: { 
        "content-type": "application/json"
    }
})


export default api;