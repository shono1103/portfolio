import { useEffect, useState } from 'react'

import { Outlet, useNavigate } from 'react-router-dom'
import './index.scss'

const AdminLayout = () => {
	const navigate = useNavigate()
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		const token = localStorage.getItem('admin_token')
		if (!token) {
			navigate('/admin/login')
		} else {
			setIsAuthenticated(true)
		}
	}, [navigate])

	const handleLogout = () => {
		localStorage.removeItem('admin_token')
		navigate('/admin/login')
	}

	if (!isAuthenticated) {
		return null
	}

	return (
		<div className="admin-layout">
			<nav className="admin-nav">
				<h1>Portfolio Admin</h1>
				<ul>
					<li>
						<a href="/admin/dashboard">Dashboard</a>
					</li>
					<li>
						<a href="/admin/jobs">Jobs</a>
					</li>
					<li>
						<a href="/admin/projects">Projects</a>
					</li>
					<li>
						<a href="/admin/skills">Skills</a>
					</li>
					<li>
						<button type="button" onClick={handleLogout}>
							Logout
						</button>
					</li>
				</ul>
			</nav>
			<main className="admin-content">
				<Outlet />
			</main>
		</div>
	)
}

export default AdminLayout
