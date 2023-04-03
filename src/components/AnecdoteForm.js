import React from 'react';
import { useMutation, useQueryClient} from 'react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (addAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      if (anecdotes) {
        queryClient.setQueryData('anecdotes', anecdotes.concat(addAnecdote))
      }
      notificationDispatch({ type: 'SET', payload: `Anecdote: "${addAnecdote.content}" created` });
      setTimeout(() => {
        notificationDispatch({ type: 'RESET' });
      }, 3000) 
    },
    onError: (err) => {
      const errorMessage = err?.response?.data?.error;
      if (errorMessage) {
        notificationDispatch({ type: 'SET', payload: errorMessage });
        setTimeout(() => {
          notificationDispatch({ type: 'RESET' });
        }, 3000) 
      }
    },
  })
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    console.log('new anecdote')
}
  return (
    <div >
      <h3>create new</h3>
      <form style={{margin: '2vh'}} onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
  
}

export default AnecdoteForm
