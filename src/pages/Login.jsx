import {useState} from "react"
import {useNavigate} from "react-router-dom"
import Cookies from "js-cookie"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const navigate = useNavigate()

  const submitForm = async event => {
    event.preventDefault()

    const userDetails = {
      email,
      password,
    }

    const url =
      "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin"

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      Cookies.set("jwt_token", data.data.token)
      navigate("/")
    } else {
      setErrorMsg(data.message)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Go Business</h1>

        <p className="login-subtitle">
          Sign in to open your referral dashboard.
        </p>

        <form onSubmit={submitForm}>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={event => setEmail(event.target.value)}
            className="input-field"
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            className="input-field"
          />

          <button type="submit" className="login-btn">
            Sign in
          </button>

          {errorMsg && (
            <p className="error-message">{errorMsg}</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default Login