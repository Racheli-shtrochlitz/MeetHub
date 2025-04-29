import { useSelector } from 'react-redux'

const useUser = () => {
  const user = JSON.stringify(useSelector(state => state.user));
  return user;
}

export default useUser
