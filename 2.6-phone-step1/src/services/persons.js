import axios from 'axios'
const baseUrl = 'http://ec2-100-21-61-59.us-west-2.compute.amazonaws.com:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteItem = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => {
    console.log(response)
  })
}

export default { getAll, create, update, deleteItem }