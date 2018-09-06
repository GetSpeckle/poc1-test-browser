import axios from 'axios'
import {config} from './config'

let apiRequest = null,
  handleOnlineStateChange = (method, url, data) => {
    if (apiRequest) {
      apiRequest[method](url, data).then(() => {}).catch(() => {})
    }
  },
  setApiConfig = (url) => {
    apiRequest = axios.create({
      baseURL: url,
      headers: {}
    })
  }

export {
  apiRequest,
  handleOnlineStateChange,
  setApiConfig
}
