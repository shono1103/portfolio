/* eslint-disable no-unused-vars */
import { useRef } from 'react'

import MyImage from '../../../assets/images/myImage.jpg'
import './index.scss'

const Logo = () => {
	const bgRef = useRef()
	const outlineLogoRef = useRef()
	const solidLogoRef = useRef()

	return (
		<div className="logo-container" ref={bgRef}>
			<img
				className="solid-logo"
				ref={solidLogoRef}
				src={MyImage}
				draggable="false"
				alt="JavaScript,  Developer"
			/>
		</div>
	)
}

export default Logo
