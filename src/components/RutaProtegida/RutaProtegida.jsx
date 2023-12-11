import { Navigate, Outlet } from "react-router-dom"

export const RutaProtegida = ({ token }) => {
  if (!token) {
    return <Navigate to="/" />
  }
  return <Outlet />
}
