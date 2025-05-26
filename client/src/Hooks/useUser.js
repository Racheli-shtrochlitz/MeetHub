import { useSelector } from 'react-redux'

const useUser = () => {
  console.log("in hook:",useSelector(state => state.user))
  return useSelector(state => state.user); 
}

export default useUser

