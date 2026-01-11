import { useState } from 'react'

import {
	faBars,
	faBriefcase,
	faEnvelope,
	faHome,
	faLaptopCode,
	faScrewdriverWrench,
	faUser,
	faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink } from 'react-router-dom'

import LogoS from '../../../assets/images/logo-s.png'
import LogoSubtitle from '../../../assets/images/Shono_logo_white.png'
import './index.scss'

const Header = () => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleMenu = () => setIsOpen(prev => !prev)
	const closeMenu = () => setIsOpen(false)

	return (
		<header className="top-nav">
			<Link className="logo" to="/" onClick={closeMenu}>
				<img src={LogoS} alt="Logo" />
				<img className="sub-logo" src={LogoSubtitle} alt="shono" />
			</Link>

			<button
				type="button"
				className="menu-toggle"
				onClick={toggleMenu}
				aria-label="Toggle navigation"
				aria-expanded={isOpen}
			>
				<FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
			</button>

			<nav className={`nav-links ${isOpen ? 'show' : ''}`}>
				<NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/" onClick={closeMenu}>
					<FontAwesomeIcon icon={faHome} />
					<span>Home</span>
				</NavLink>
				<NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/about" onClick={closeMenu}>
					<FontAwesomeIcon icon={faUser} />
					<span>About</span>
				</NavLink>
				<NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/experience" onClick={closeMenu}>
					<FontAwesomeIcon icon={faBriefcase} />
					<span>Experience</span>
				</NavLink>
				<NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/projects" onClick={closeMenu}>
					<FontAwesomeIcon icon={faLaptopCode} />
					<span>Projects</span>
				</NavLink>
				<NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/skills" onClick={closeMenu}>
					<FontAwesomeIcon icon={faScrewdriverWrench} />
					<span>Skills</span>
				</NavLink>
				<NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/contact" onClick={closeMenu}>
					<FontAwesomeIcon icon={faEnvelope} />
					<span>Contact</span>
				</NavLink>
			</nav>
		</header>
	)
}

export default Header
