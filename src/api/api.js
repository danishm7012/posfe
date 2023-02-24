import axios from 'axios'

export default axios.create({
    baseURL: "http://localhost:4001/api/"
    // baseURL: "http://3.130.132.140/api/"
})