import axios , {CanceledError} from "axios";

export default axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/users',
    // headers: {}
})

export {CanceledError}