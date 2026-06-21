import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import Cookies from "js-cookie"
import Navbar from "../components/Navbar"

function Dashboard() {
  const navigate = useNavigate()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getDashboardData()
  }, [])

  const getDashboardData = async () => {
    const token = Cookies.get("jwt_token")

    const url =
      "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals"

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const result = await response.json()
      setData(result.data)
      setLoading(false)
    } else {
      setError("Failed to fetch data")
      setLoading(false)
    }
  }

  if (loading) {
    return <h1 className="status-text">Loading...</h1>
  }

  if (error) {
    return <h1 className="status-text">{error}</h1>
  }

  return (
    <div className="container">
      <Navbar />

      <div className="dashboard-header">
        <h1>Referral Dashboard</h1>

        <p>
          Track your referrals, earnings, and partner
          activity in one place.
        </p>
      </div>

      <section>
        <h2>Overview</h2>

        <div className="metrics-grid">
          {data.metrics.map(metric => (
            <div className="metric-card" key={metric.id}>
              <h3>{metric.label}</h3>
              <p>{metric.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="summary-card">
        <h2>Service Summary</h2>

        <p>
          <strong>Service:</strong>{" "}
          {data.serviceSummary.service}
        </p>

        <p>
          <strong>Your Referrals:</strong>{" "}
          {data.serviceSummary.yourReferrals}
        </p>

        <p>
          <strong>Active Referrals:</strong>{" "}
          {data.serviceSummary.activeReferrals}
        </p>

        <p>
          <strong>Total Ref. Earnings:</strong>{" "}
          {data.serviceSummary.totalRefEarnings}
        </p>
      </section>

      <section className="summary-card">
        <h2>Refer Friends and Earn More</h2>

        <p>
          <strong>Referral Link:</strong>
        </p>

        <input
          className="readonly-input"
          value={data.referral.link}
          readOnly
        />

        <p>
          <strong>Referral Code:</strong>
        </p>

        <input
          className="readonly-input"
          value={data.referral.code}
          readOnly
        />
      </section>

      <section>
        <h2>All Referrals</h2>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Service</th>
                <th>Date</th>
                <th>Profit</th>
              </tr>
            </thead>

            <tbody>
              {data.referrals.map(each => (
                <tr
                  key={each.id}
                  onClick={() =>
                    navigate(`/referral/${each.id}`)
                  }
                >
                  <td>{each.name}</td>
                  <td>{each.serviceName}</td>
                  <td>{each.date}</td>
                  <td>${each.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default Dashboard