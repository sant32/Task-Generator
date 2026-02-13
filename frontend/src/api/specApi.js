import axios from "axios"

const API = "https://task-generator-hrz3.onrender.com/api/spec"

export const generateSpec = (data) =>
  axios.post(`${API}/generate`, data)

export const getRecentSpecs = () =>
  axios.get(`${API}/recent`)

export const getSpecById = (id) =>
  axios.get(`${API}/${id}`)

export const updateSpec = (id, data) =>
  axios.put(`${API}/${id}`, data)
