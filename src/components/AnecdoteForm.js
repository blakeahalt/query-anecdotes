import React, { useState } from 'react';
import { createAnecdote, updateAnecdote, getAnecdotes } from '../requests'
import { useQuery, useMutation, useQueryClient} from 'react-query'


const AnecdoteForm = (addAnecdote) => {
  const queryClient = useQueryClient()
  const [notificationMessage, setNotificationMessage] = useState('');

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (addAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      if (anecdotes) {
        queryClient.setQueryData('anecdotes', anecdotes.concat(addAnecdote))
      }
      setNotificationMessage(`New anecdote "${addAnecdote.content}" has been created.`)
      setTimeout(() => {
        setNotificationMessage('')
      }, 3000) 
    },
  })
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    console.log('new anecdote')
}

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  return (
    <div >
      <h3>create new</h3>
      {notificationMessage && <div>{notificationMessage}</div>}
      <form style={{margin: '2vh'}} onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
  
}

export default AnecdoteForm
