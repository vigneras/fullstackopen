import axios from 'axios'
const baseUrl = 'http://ec2-100-21-61-59.us-west-2.compute.amazonaws.com:3001/api/persons'

const getAll = () => {
  console.log("Requesting ALL")
  const request = axios.get(baseUrl, {timeout:5000})
  const res = request.then(response => response.data)
  console.log("Requesting ALL -> ", res)
  return res
}

const create = newObject => {
  console.log("Create")
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  console.log("Update")
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteItem = (id) => {
  console.log("Delete")
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => {
    console.log(response)
  })
}

export default { getAll, create, update, deleteItem }