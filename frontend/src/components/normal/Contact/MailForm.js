import { useRef, useState } from 'react'

import emailjs from '@emailjs/browser'
import { ClipLoader } from 'react-spinners'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MailForm = () => {
  const form = useRef()
  const [loading, setLoading] = useState(false)

  const sendEmail = async (event) => {
    event.preventDefault()
    setLoading(true)

    const email = form.current.email.value
    const isValidEmail = await verifyEmail(email)

    if (!isValidEmail) {
      setLoading(false)
      toast.error('Please enter a valid email address', {
        position: 'bottom-center',
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      return
    }

    const fullName = form.current.name.value
    const subject = form.current.subject.value
    const message = form.current.message.value

    let firstName = fullName.split(' ')[0]
    firstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()

    const templateParams = {
      firstname: firstName,
      name: fullName,
      subject,
      message,
      email,
    }

    emailjs
      .send(
        process.env.REACT_APP_EMAIL_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        () => {
          toast.success('Message successfully sent!', {
            position: 'bottom-center',
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          })
          const timeout = setTimeout(() => {
            form.current.reset()
            setLoading(false)
          }, 3800)

          return () => clearTimeout(timeout)
        },
        () => {
          setLoading(false)
          toast.error('Failed to send the message, please try again', {
            position: 'bottom-center',
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          })
        }
      )
  }

  const verifyEmail = async (email) => {
    const validationUrl = process.env.REACT_APP_EMAIL_VALIDATION_URL
    if (!validationUrl) {
      return false
    }

    const response = await fetch(
      `${validationUrl}?email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
        },
      }
    )

    const data = await response.json()
    return response.status === 200 && data.status === 'valid'
  }

  return (
    <div className="contact-form">
      <form ref={form} onSubmit={sendEmail}>
        <ul>
          <li className="half">
            <input placeholder="Name" type="text" name="name" required />
          </li>
          <li className="half">
            <input placeholder="Email" type="email" name="email" required />
          </li>
          <li>
            <input placeholder="Subject" type="text" name="subject" required />
          </li>
          <li>
            <textarea placeholder="Message" name="message" required></textarea>
          </li>
          <li>
            <button type="submit" className="flat-button" disabled={loading}>
              {loading ? <ClipLoader color="#fff" size={20} /> : 'SEND'}
            </button>
          </li>
        </ul>
        <ToastContainer />
      </form>
    </div>
  )
}

export default MailForm
