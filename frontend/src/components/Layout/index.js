import { Outlet } from 'react-router-dom'

import Footer from '../Footer'
import Header from '../Header'
import './index.scss'

const Layout = () => {
	return (
		<div className="App">
			<Header />
			<div className="page">
				<span className="tags top-tags">&lt;body&gt;</span>

				<Outlet />
				<Footer />
			</div>
		</div>
	)
}

export default Layout
