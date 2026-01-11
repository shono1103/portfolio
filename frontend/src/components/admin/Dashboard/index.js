import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.scss'

const Dashboard = () => {
	const [stats, setStats] = useState({
		jobsCount: 0,
		projectsCount: 0,
		skillsCount: 0,
	})

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const [jobsRes, projectsRes, skillsRes] = await Promise.all([
					axios.get('http://localhost:8000/api/jobs'),
					axios.get('http://localhost:8000/api/projects'),
					axios.get('http://localhost:8000/api/skills'),
				])

				setStats({
					jobsCount: jobsRes.data.length,
					projectsCount: projectsRes.data.length,
					skillsCount: skillsRes.data.length,
				})
			} catch (error) {
				console.error('Error fetching stats:', error)
			}
		}

		fetchStats()
	}, [])

	return (
		<div className="dashboard">
			<h1>Dashboard</h1>
			<div className="stats-grid">
				<div className="stat-card">
					<h2>{stats.jobsCount}</h2>
					<p>Job Experiences</p>
				</div>
				<div className="stat-card">
					<h2>{stats.projectsCount}</h2>
					<p>Projects</p>
				</div>
				<div className="stat-card">
					<h2>{stats.skillsCount}</h2>
					<p>Skills</p>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
