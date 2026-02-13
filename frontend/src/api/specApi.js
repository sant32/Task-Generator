import axios from "axios"

const API = "http://localhost:3001/api/spec"

export const generateSpec = (data) =>
  axios.post(`${API}/generate`, data)

export const getRecentSpecs = () =>
  axios.get(`${API}/recent`)

export const getSpecById = (id) =>
  axios.get(`${API}/${id}`)

export const updateSpec = (id, data) =>
  axios.put(`${API}/${id}`, data)
