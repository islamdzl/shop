import { getToken, baseURL } from '../utils/controller'

const Fetch = async(methode, path, body = {}) => {
  const xhr = new XMLHttpRequest();
  const url = path.startsWith('http') ? path : baseURL + path
  xhr.open(methode, url, true)
  xhr.setRequestHeader('token', getToken())
  xhr.setRequestHeader('Content-Type', 'application/json')
  return new Promise((resolve, reject)=> {
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.responseText))
          } catch (e) {
            reject({ error: 'Error Parsing Data', raw: xhr.responseText })
          }
        } else {
          reject({
            status: xhr.status,
            message: xhr.statusText,
            response: xhr.responseText
          })
        }
      }
    }
    methode == "GET" ? xhr.send() : xhr.send(JSON.stringify(body));
  })
}

export const post = async(path, body)=> Fetch('POST', path, body);
export const get  = async(path, query)=> {
  const queryString = new URLSearchParams(query).toString()
  const fullPath = queryString ? `${path}?${queryString}` : path;
  return await Fetch('GET', fullPath, undefined)
}



export default {
  post,
  get,
  Fetch
}
