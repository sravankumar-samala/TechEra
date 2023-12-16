import {useEffect, useState, useCallback} from 'react'
import {Link, useParams} from 'react-router-dom'
import convertJsonToJSObj from '../../helpers/convertJsonToJsObj'
import LoadingView from '../LoadingView'
import './index.css'

export default function CourseItemDetails() {
  const [courseData, setCourseData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errMessage, setErrorMessage] = useState(null)
  const {id} = useParams()

  const getCourseDetails = useCallback(async () => {
    setIsLoading(true)
    const baseUrl = `https://apis.ccbp.in/te/courses/${id}`

    try {
      const response = await fetch(baseUrl)
      const data = await response.json()
      if (!response.ok) throw new Error('Something gone wrong!')
      const updatedData = convertJsonToJSObj(data.course_details)
      setCourseData(updatedData)
      setErrorMessage(null)
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    getCourseDetails()
  }, [])

  return (
    <div className="course-item-details-container">
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
      {!isLoading && errMessage && <FailedView onRetry={getCourseDetails} />}
      {!isLoading && courseData?.length !== 0 && (
        <div className="course-details">
          <img src={courseData?.imageUrl} alt={courseData?.name} />
          <div className="course-content">
            <h2>{courseData?.name}</h2>
            <p>{courseData?.description}</p>
          </div>
        </div>
      )}
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
