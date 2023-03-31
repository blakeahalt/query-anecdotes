import React, { useState } from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient} from 'react-query'
import { getAnecdotes, createAnecdote, updateAnecdote, deleteAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  const [notificationMessage, setNotificationMessage] = useState('');

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      setNotificationMessage(`New anecdote "${newAnecdote.content}" has been created.`)
    }
  })
  

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    console.log(content)
  }

  const deleteAnecdoteMutation = useMutation(deleteAnecdote, {
    onSuccess: (deletedAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
      console.log('deletedAnecdote:', deletedAnecdote)
      setNotificationMessage(`You deleted "${deletedAnecdote.content}"`)
    },
  })
  

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
      setNotificationMessage(`You voted for "${updatedAnecdote.content}"`)
    },
  })
  

  const handleVote = (anecdote) => {
    const anecdotes = queryClient.getQueryData('anecdotes')
    const votingAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    queryClient.setQueryData('anecdotes', anecdotes.map(a => a.id === votingAnecdote.id ? votingAnecdote : a));
    updateAnecdoteMutation.mutate(votingAnecdote);
  }

  const handleDelete = async (anecdote) => {
    const anecdotes = queryClient.getQueryData('anecdotes')
    const toDeleteAnecdote = anecdotes.filter(a => a.id !== anecdote.id)
    queryClient.setQueryData('anecdotes', toDeleteAnecdote)
    // deleteAnecdoteMutation.mutate(anecdote.id)
    await deleteAnecdoteMutation.mutateAsync(anecdote)

  }

  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false
  })
  console.log(result)

  if ( result.isLoading ) {
  return <div>loading data...</div>
  }

  const anecdotes = result.data.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification message={notificationMessage} setMessage={setNotificationMessage} />
      <AnecdoteForm addAnecdote={addAnecdote} setNotificationMessage={setNotificationMessage}/>
    
      {anecdotes.map((anecdote, index) =>
        <div key={`${anecdote.id}_${index}`} style={{ border: '1px solid black', padding: '5px', margin: '1vh', display: 'flex', flexDirection: 'row'}}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div style={{ height: 'auto', width: '7vh', display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
              <button style={{ width: '100%' }} onClick={() => handleVote(anecdote)}>vote</button>
              <button style={{ width: '100%' }} onClick={() => handleDelete(anecdote)}>delete</button>
            </div>
            <div style={{minWidth: '20px', margin: '10px', textAlign: 'center' }}>
                {anecdote.votes}
            </div>
        </div>
          <div style={{ display: 'flex', lineHeight: 1.2, textAlign: 'left', alignItems: 'center' }}>
                {anecdote.content}
            </div>
        </div>
      )}
    </div>
  )
}

export default App
