import axios from 'axios'

axios.interceptors.response.use(
    response => {
            return response
    }, 
    error => {
        return Promise.reject(error)
    }
  );

  axios.interceptors.request.use(
    request => {
            return request
    }, 
    error => {
        return Promise.reject(error)
    }
  );