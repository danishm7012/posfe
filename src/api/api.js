import axios from 'axios'

export default axios.create({
    // baseURL: "http://localhost:4001/api/"
    baseURL: "https://heaven-engineering-be.herokuapp.com/api/"
})