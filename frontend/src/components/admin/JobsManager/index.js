import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.scss'

const JobsManager = () => {
	const [jobs, setJobs] = useState([])
	const [editingJob, setEditingJob] = useState(null)
	const [formData, setFormData] = useState({
		company: '',
		companyUrl: '',
		position: '',
		duration: '',
		location: '',
		achievements: [],
	})
	const [achievementInput, setAchievementInput] = useState('')

	useEffect(() => {
		fetchJobs()
	}, [])

	const fetchJobs = async () => {
		try {
			const response = await axios.get('http://localhost:8000/api/jobs')
			setJobs(response.data)
		} catch (error) {
			console.error('Error fetching jobs:', error)
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const token = localStorage.getItem('admin_token')

		try {
			if (editingJob) {
				await axios.put(`http://localhost:8000/api/jobs/${editingJob.id}`, formData, {
					headers: { Authorization: `Bearer ${token}` },
				})
			} else {
				await axios.post('http://localhost:8000/api/jobs', formData, {
					headers: { Authorization: `Bearer ${token}` },
				})
			}
			resetForm()
			fetchJobs()
		} catch (error) {
			console.error('Error saving job:', error)
			alert('Failed to save job. Please check your authentication.')
		}
	}

	const handleDelete = async id => {
		if (!window.confirm('Are you sure you want to delete this job?')) return

		const token = localStorage.getItem('admin_token')
		try {
			await axios.delete(`http://localhost:8000/api/jobs/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			fetchJobs()
		} catch (error) {
			console.error('Error deleting job:', error)
		}
	}

	const handleEdit = job => {
		setEditingJob(job)
		setFormData({
			company: job.company,
			companyUrl: job.companyUrl,
			position: job.position,
			duration: job.duration,
			location: job.location,
			achievements: job.achievements,
		})
	}

	const resetForm = () => {
		setEditingJob(null)
		setFormData({
			company: '',
			companyUrl: '',
			position: '',
			duration: '',
			location: '',
			achievements: [],
		})
		setAchievementInput('')
	}

	const addAchievement = () => {
		if (achievementInput.trim()) {
			setFormData({
				...formData,
				achievements: [...formData.achievements, achievementInput.trim()],
			})
			setAchievementInput('')
		}
	}

	const removeAchievement = index => {
		setFormData({
			...formData,
			achievements: formData.achievements.filter((_, i) => i !== index),
		})
	}

	return (
		<div className="jobs-manager">
			<h1>Jobs Manager</h1>

			<form onSubmit={handleSubmit} className="job-form">
				<h2>{editingJob ? 'Edit Job' : 'Add New Job'}</h2>

				<div className="form-group">
					<label>Company</label>
					<input
						type="text"
						value={formData.company}
						onChange={e => setFormData({ ...formData, company: e.target.value })}
						required
					/>
				</div>

				<div className="form-group">
					<label>Company URL</label>
					<input
						type="url"
						value={formData.companyUrl}
						onChange={e => setFormData({ ...formData, companyUrl: e.target.value })}
						required
					/>
				</div>

				<div className="form-group">
					<label>Position</label>
					<input
						type="text"
						value={formData.position}
						onChange={e => setFormData({ ...formData, position: e.target.value })}
						required
					/>
				</div>

				<div className="form-group">
					<label>Duration</label>
					<input
						type="text"
						value={formData.duration}
						onChange={e => setFormData({ ...formData, duration: e.target.value })}
						required
					/>
				</div>

				<div className="form-group">
					<label>Location</label>
					<input
						type="text"
						value={formData.location}
						onChange={e => setFormData({ ...formData, location: e.target.value })}
						required
					/>
				</div>

				<div className="form-group">
					<label>Achievements</label>
					<div className="achievements-input">
						<input
							type="text"
							value={achievementInput}
							onChange={e => setAchievementInput(e.target.value)}
							placeholder="Add achievement"
						/>
						<button type="button" onClick={addAchievement}>
							Add
						</button>
					</div>
					<ul className="achievements-list">
						{formData.achievements.map((achievement, index) => (
							<li key={index}>
								{achievement}
								<button type="button" onClick={() => removeAchievement(index)}>
									Remove
								</button>
							</li>
						))}
					</ul>
				</div>

				<div className="form-actions">
					<button type="submit">{editingJob ? 'Update' : 'Create'}</button>
					{editingJob && (
						<button type="button" onClick={resetForm}>
							Cancel
						</button>
					)}
				</div>
			</form>

			<div className="jobs-list">
				<h2>Existing Jobs</h2>
				{jobs.map(job => (
					<div key={job.id} className="job-item">
						<h3>{job.position}</h3>
						<p>
							<strong>{job.company}</strong> - {job.location}
						</p>
						<p>{job.duration}</p>
						<div className="job-actions">
							<button type="button" onClick={() => handleEdit(job)}>
								Edit
							</button>
							<button type="button" onClick={() => handleDelete(job.id)} className="delete">
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default JobsManager
