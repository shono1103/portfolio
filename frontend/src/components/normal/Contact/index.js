import { useEffect, useState } from 'react'

import Loader from 'react-loaders'

import AnimatedLetters from '../AnimatedLetters'
import MailForm from './MailForm'
import MapTile from './MapTile'
import './index.scss'

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const contactArray = 'Contact Me'.split('')

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={contactArray}
              idx={15}
            />
          </h1>
          <p>
            I’m open to new opportunities and collaborations! If you’re looking
            for someone who can bring fresh ideas and deliver impactful results,
            let’s get in touch!
          </p>

          <MailForm />
        </div>
        <MapTile />
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Contact
