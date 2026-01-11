import { useEffect, useState } from 'react'

import axios from 'axios'
import './index.scss'

const SkillsManager = () => {
	const [skills, setSkills] = useState([])
	const [newSkill, setNewSkill] = useState('')

	useEffect(() => {
		fetchSkills()
	}, [])

	const fetchSkills = async () => {
		try {
			const response = await axios.get('http://localhost:8000/api/skills')
			setSkills(response.data)
		} catch (error) {
			console.error('Error fetching skills:', error)
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const token = localStorage.getItem('admin_token')

		try {
			await axios.post(
				'http://localhost:8000/api/skills',
				{ name: newSkill },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			setNewSkill('')
			fetchSkills()
		} catch (error) {
			console.error('Error adding skill:', error)
			alert('Failed to add skill. Please check your authentication.')
		}
	}

	const handleDelete = async skillName => {
		if (!window.confirm(`Are you sure you want to delete "${skillName}"?`)) return

		const token = localStorage.getItem('admin_token')
		try {
			await axios.delete(`http://localhost:8000/api/skills/${encodeURIComponent(skillName)}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			fetchSkills()
		} catch (error) {
			console.error('Error deleting skill:', error)
		}
	}

	return (
		<div className="skills-manager">
			<h1>Skills Manager</h1>

			<form onSubmit={handleSubmit} className="skill-form">
				<h2>Add New Skill</h2>
				<div className="form-group">
					<input
						type="text"
						value={newSkill}
						onChange={e => setNewSkill(e.target.value)}
						placeholder="Enter skill name"
						required
					/>
					<button type="submit">Add Skill</button>
				</div>
			</form>

			<div className="skills-list">
				<h2>Existing Skills ({skills.length})</h2>
				<div className="skills-grid">
					{skills.map(skill => (
						<div key={skill} className="skill-item">
							<span>{skill}</span>
							<button type="button" onClick={() => handleDelete(skill)} className="delete">
								Delete
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default SkillsManager
