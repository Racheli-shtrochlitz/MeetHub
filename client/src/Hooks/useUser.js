import { useSelector } from 'react-redux'

const useUser = () => {
  return useSelector(state => state.user); 
}

export default useUser

