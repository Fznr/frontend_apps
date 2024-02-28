import { Outlet, Navigate } from 'react-router-dom'

const isLoggedIn = () => {
  return (localStorage.getItem('accessToken') !== null && localStorage.getItem('accessToken') !== undefined);
};

const PrivateRoute = () => {
    return(
      isLoggedIn() ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoute