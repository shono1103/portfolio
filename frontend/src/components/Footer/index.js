import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import codechefLogo from '../../assets/images/codechef.png'
import './index.scss'

const Footer = () => {
	return (
		<footer className="footer-nav">
			<ul>
				<li>
					<a
						href="https://www.linkedin.com/in/banerjee-sudip/"
						target="_blank"
						rel="noreferrer"
					>
						<FontAwesomeIcon icon={faLinkedin} />
					</a>
				</li>
				<li>
					<a
						href="https://github.com/metal-oopa"
						target="_blank"
						rel="noreferrer"
					>
						<FontAwesomeIcon icon={faGithub} />
					</a>
				</li>
				<li>
					<a
						href="https://www.codechef.com/users/metal_oopa"
						target="_blank"
						rel="noreferrer"
					>
						<img src={codechefLogo} width="24" alt="Codechef" />
					</a>
				</li>
			</ul>
		</footer>
	)
}

export default Footer
