import axios from 'axios';


const api = axios.create({
    baseURL: "http://192.168.1.81:8080",
    headers: { 
        "content-type": "application/json"
    }
})


export default api;