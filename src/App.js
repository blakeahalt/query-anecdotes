import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import VoteButton from './components/VoteButton'
import DeleteButton from './components/DeleteButton'
import { useQuery } from 'react-query'
import { getAnecdotes } from './requests'

const App = () => {

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
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map((anecdote, index) =>
        <div key={`${anecdote.id}_${index}`} style={{ border: '1px solid black', padding: '5px', margin: '1vh', display: 'flex', flexDirection: 'row'}}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div style={{ height: 'auto', width: '7vh', display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
              <VoteButton anecdote={anecdote} />
              <DeleteButton anecdote={anecdote} />
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
