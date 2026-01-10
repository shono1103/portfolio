import './index.scss'
import {
	faBriefcase,
	faEnvelope,
	faHome,
	faLaptopCode,
	faScrewdriverWrench,
	faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink } from 'react-router-dom'

import LogoS from '../../assets/images/logo-s.png'
import LogoSubtitle from '../../assets/images/Shono_logo_white.png'

const Sidebar = () => {
	return (
		<>
			<div className="nav-bar">
				<Link className="logo" to="/">
					<img src={LogoS} alt="Logo" />
					<img className="sub-logo" src={LogoSubtitle} alt="shono" />
				</Link>
				<nav>
					<NavLink exact="true" activeclassname="active" to="/">
						<FontAwesomeIcon icon={faHome} color="#4d4d4e" />
					</NavLink>
					<NavLink activeclassname="active" className="about-link" to="/about">
						<FontAwesomeIcon icon={faUser} color="#4d4d4e" />
					</NavLink>

					<NavLink
						activeclassname="active"
						className="experience-link"
						to="/experience"
					>
						<FontAwesomeIcon icon={faBriefcase} color="#4d4d4e" />
					</NavLink>

					<NavLink
						activeclassname="active"
						className="projects-link"
						to="/projects"
					>
						<FontAwesomeIcon icon={faLaptopCode} color="#4d4d4e" />
					</NavLink>

					<NavLink
						activeclassname="active"
						className="skills-link"
						to="/skills"
					>
						<FontAwesomeIcon icon={faScrewdriverWrench} color="#4d4d4e" />
					</NavLink>

					<NavLink
						activeclassname="active"
						className="contact-link"
						to="/contact"
					>
						<FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />
					</NavLink>
				</nav>
			</div>
		</>
	)
}

export default Sidebar
