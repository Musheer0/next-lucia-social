import LoadingButton from '../LoadingButton'
import { useDeletePostMutation } from './mutations'

const DeletePostButton = () => {
    const mutaiton = useDeletePostMutation()
  return (
  <LoadingButton onClick={()=>{mutaiton.mutate}} loading={mutaiton.isPending} variant={'destructive'}>
    Delete Post
  </LoadingButton>
  )
}

export default DeletePostButton