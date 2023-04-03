import { useMutation, useQueryClient} from 'react-query'
import { updateAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext';

const VoteButton = ({ anecdote }) => {

    const queryClient = useQueryClient()
    const notificationDispatch = useNotificationDispatch();
  
    const updateAnecdoteMutation = useMutation(updateAnecdote, {
      onSuccess: (updatedAnecdote) => {
        queryClient.invalidateQueries('anecdotes')
        notificationDispatch({ type: 'SET', payload: `You voted for "${updatedAnecdote.content}"` });
        setTimeout(() => {
          notificationDispatch({ type: 'RESET' });
        }, 3000) 
      },
    })

    const handleVote = (anecdote) => {
        const anecdotes = queryClient.getQueryData('anecdotes')
        const votingAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
        queryClient.setQueryData('anecdotes', anecdotes.map(a => a.id === votingAnecdote.id ? votingAnecdote : a));
        updateAnecdoteMutation.mutate(votingAnecdote);
      }

    return (
        <button style={{ width: '100%' }} onClick={() => handleVote(anecdote)}>vote</button>
    )
  }
  
  export default VoteButton