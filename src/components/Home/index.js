import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import convertJsonToJsObj from '../../helpers/convertJsonToJsObj'
import LoadingView from '../LoadingView'
import './index.css'

export default function Home() {
  const [coursesData, setCoursesData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errMessage, setErrorMessage] = useState(null)

  const getCourses = async () => {
    setIsLoading(true)
    const baseUrl = 'https://apis.ccbp.in/te/courses'

    try {
      const response = await fetch(baseUrl)
      const data = await response.json()
      if (!response.ok) throw new Error('Something gone wrong!')
      const updatedData = convertJsonToJsObj(data.courses)
      setCoursesData(updatedData)
      setErrorMessage(null)
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getCourses()
  }, [])

  return (
    <div className="home-container">
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
      {isLoading && <LoadingView />}
      {!isLoading && coursesData?.length !== 0 && (
        <div className="courses-list-container">
          <h1>Courses</h1>
          <ul className="courses-list">
            {coursesData?.map(each => (
              <Link
                to={`/courses/${each.id}`}
                className="course-item"
                key={each.id}
              >
                <li>
                  <img src={each.logoUrl} alt={each.name} />
                  <p>{each.name}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
      {!isLoading && errMessage && <FailedView onRetry={getCourses} />}
    </div>
  )
}

function FailedView({onRetry}) {
  return (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="retry-btn" onClick={onRetry}>
        Retry
      </button>
    </div>
  )
}
