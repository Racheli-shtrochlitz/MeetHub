import { useSelector } from 'react-redux'

const useUser = () => {
  return useSelector(state => state.user.user); 
}

export default useUser

