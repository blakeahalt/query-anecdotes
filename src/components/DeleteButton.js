import { useMutation, useQueryClient} from 'react-query'
import { deleteAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext';

const DeleteButton = ({ anecdote }) => {
    const queryClient = useQueryClient()
    const notificationDispatch = useNotificationDispatch();
  
    const deleteAnecdoteMutation = useMutation(deleteAnecdote, {
        onSuccess: (deletedAnecdote) => {
          queryClient.invalidateQueries('anecdotes')
          console.log('deletedAnecdote:', deletedAnecdote)
          notificationDispatch({ type: 'SET', payload: `anecdote "${deletedAnecdote.content}" deleted` });
          setTimeout(() => {
            notificationDispatch({ type: 'RESET' });
          }, 3000) 
        },
      })

      const handleDelete = async (anecdote) => {
        const anecdotes = queryClient.getQueryData('anecdotes')
        const toDeleteAnecdote = anecdotes.filter(a => a.id !== anecdote.id)
        queryClient.setQueryData('anecdotes', toDeleteAnecdote)
        await deleteAnecdoteMutation.mutateAsync(anecdote)
      }

    return (
        <button style={{ width: '100%' }} onClick={() => handleDelete(anecdote)}>delete</button>
    )
  }
  
  export default DeleteButton