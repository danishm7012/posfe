import axios from 'axios'

export default axios.create({
    baseURL: "https://heaven-engineering-be.herokuapp.com/api/"
})