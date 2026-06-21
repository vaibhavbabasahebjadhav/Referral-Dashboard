import {useEffect, useState} from "react"
import {useParams, Link} from "react-router-dom"
import Cookies from "js-cookie"

function ReferralDetails() {
  const {id} = useParams()

  const [referral, setReferral] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getReferralDetails()
  }, [id])

  const getReferralDetails = async () => {
    const token = Cookies.get("jwt_token")

    const url = `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?id=${id}`

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    try {
      const response = await fetch(url, options)
      const responseData = await response.json()

      if (response.ok) {
        let referralData = null

        if (
          responseData.data &&
          responseData.data.id
        ) {
          referralData = responseData.data
        } else if (
          responseData.data &&
          responseData.data.referrals
        ) {
          referralData = responseData.data.referrals.find(
            each => String(each.id) === String(id)
          )
        }

        if (referralData) {
          setReferral(referralData)
        } else {
          setError("Referral not found")
        }
      } else {
        setError("Referral not found")
      }
    } catch (error) {
      setError("Referral not found")
    }

    setLoading(false)
  }

  if (loading) {
    return <h1 className="status-text">Loading...</h1>
  }

  if (error || !referral) {
    return (
      <div className="details-container">
        <div className="details-card">
          <h1>Referral not found</h1>

          <Link className="back-link" to="/">
            ← Back to dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="details-container">
      <div className="details-card">
        <h1>Referral Details</h1>

        <h2 className="partner-name">
          {referral.name}
        </h2>

        <div className="detail-row">
          <span>Referral ID</span>
          <strong>{referral.id}</strong>
        </div>

        <div className="detail-row">
          <span>Service Name</span>
          <strong>{referral.serviceName}</strong>
        </div>

        <div className="detail-row">
          <span>Date</span>
          <strong>{referral.date}</strong>
        </div>

        <div className="detail-row">
          <span>Profit</span>
          <strong>${referral.profit}</strong>
        </div>

        <Link className="back-link" to="/">
          ← Back to dashboard
        </Link>
      </div>
    </div>
  )
}

export default ReferralDetails