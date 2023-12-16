import {Link} from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="header">
        <div className="logo-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
            />
          </Link>
        </div>
      </div>
      <div className="inner-container-not-found">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
          alt="not found"
        />
        <h1>Page Not Found</h1>
        <p>We are sorry, the page you requested could not be found</p>
      </div>
    </div>
  )
}
