import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = async (newAnecdote) => {
  const res = await axios.post(baseUrl, newAnecdote)
  return newAnecdote
}

export const updateAnecdote = updatedAnecdote =>
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)

export const deleteAnecdote = async (anecdote) => {
  const res = await axios.delete(`${baseUrl}/${anecdote.id}`)
  return anecdote
}

