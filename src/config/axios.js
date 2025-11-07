import axios from 'axios'
import {
  setupCache
} from 'axios-cache-adapter'
import {SERVICE} from "./config";

const cache = setupCache({
  maxAge: 200,
  debug: false,
  exclude: {
    query: false
  }
})

function API_LOGIN(){
  return axios.create({
    baseURL: SERVICE.JAVA_SERVICE + "/auth",
    adapter:cache.adapter,
    withCredentials:false,
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': "application/x-www-form-urlencoded, text/plain, */*"
    }
  })
}

function APIFormData() {
  return axios.create({
    baseURL: SERVICE.JAVA_SERVICE,
    adapter: cache.adapter,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'responseType':'blob',
      'Accept': "application/json, text/plain, */*"
    }
  })
}

export {
  APIFormData,
  API_LOGIN
}

export default axios
