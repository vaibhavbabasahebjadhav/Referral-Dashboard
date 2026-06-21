import Cookies from "js-cookie"
import {useNavigate} from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()

  const onLogout = () => {
    Cookies.remove("jwt_token")
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <h2 className="logo">Referral Dashboard</h2>

      <button
        type="button"
        className="logout-btn"
        onClick={onLogout}
      >
        Logout
      </button>
    </nav>
  )
}

export default Navbar