import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.scss'

const ProjectsManager = () => {
	const [projects, setProjects] = useState([])
	const [editingProject, setEditingProject] = useState(null)
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		technologies: [],
		category: '',
		status: '',
		year: '',
		company: '',
		features: [],
		images: [],
		githubUrl: '',
		liveUrl: '',
		isPrivate: false,
	})

	useEffect(() => {
		fetchProjects()
	}, [])

	const fetchProjects = async () => {
		try {
			const response = await axios.get('http://localhost:8000/api/projects')
			setProjects(response.data)
		} catch (error) {
			console.error('Error fetching projects:', error)
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const token = localStorage.getItem('admin_token')

		try {
			if (editingProject) {
				await axios.put(`http://localhost:8000/api/projects/${editingProject.id}`, formData, {
					headers: { Authorization: `Bearer ${token}` },
				})
			} else {
				await axios.post('http://localhost:8000/api/projects', formData, {
					headers: { Authorization: `Bearer ${token}` },
				})
			}
			resetForm()
			fetchProjects()
		} catch (error) {
			console.error('Error saving project:', error)
			alert('Failed to save project. Please check your authentication.')
		}
	}

	const handleDelete = async id => {
		if (!window.confirm('Are you sure you want to delete this project?')) return

		const token = localStorage.getItem('admin_token')
		try {
			await axios.delete(`http://localhost:8000/api/projects/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			fetchProjects()
		} catch (error) {
			console.error('Error deleting project:', error)
		}
	}

	const handleEdit = project => {
		setEditingProject(project)
		setFormData({ ...project })
	}

	const resetForm = () => {
		setEditingProject(null)
		setFormData({
			title: '',
			description: '',
			technologies: [],
			category: '',
			status: '',
			year: '',
			company: '',
			features: [],
			images: [],
			githubUrl: '',
			liveUrl: '',
			isPrivate: false,
		})
	}

	const handleArrayInput = (field, value) => {
		const items = value.split(',').map(item => item.trim()).filter(item => item)
		setFormData({ ...formData, [field]: items })
	}

	return (
		<div className="projects-manager">
			<h1>Projects Manager</h1>

			<form onSubmit={handleSubmit} className="project-form">
				<h2>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>

				<div className="form-group">
					<label>Title</label>
					<input
						type="text"
						value={formData.title}
						onChange={e => setFormData({ ...formData, title: e.target.value })}
						required
					/>
				</div>

				<div className="form-group">
					<label>Description</label>
					<textarea
						value={formData.description}
						onChange={e => setFormData({ ...formData, description: e.target.value })}
						required
						rows="4"
					/>
				</div>

				<div className="form-group">
					<label>Technologies (comma-separated)</label>
					<input
						type="text"
						value={formData.technologies.join(', ')}
						onChange={e => handleArrayInput('technologies', e.target.value)}
						placeholder="React, Node.js, MongoDB"
						required
					/>
				</div>

				<div className="form-group">
					<label>Category</label>
					<input
						type="text"
						value={formData.category}
						onChange={e => setFormData({ ...formData, category: e.target.value })}
						required
					/>
				</div>

				<div className="form-group">
					<label>Status</label>
					<input
						type="text"
						value={formData.status}
						onChange={e => setFormData({ ...formData, status: e.target.value })}
						required
					/>
				</div>

				<div className="form-group">
					<label>Year</label>
					<input
						type="text"
						value={formData.year}
						onChange={e => setFormData({ ...formData, year: e.target.value })}
						required
					/>
				</div>

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
					<label>Features (comma-separated)</label>
					<input
						type="text"
						value={formData.features.join(', ')}
						onChange={e => handleArrayInput('features', e.target.value)}
						placeholder="Feature 1, Feature 2"
						required
					/>
				</div>

				<div className="form-group">
					<label>Images (comma-separated URLs)</label>
					<input
						type="text"
						value={formData.images.join(', ')}
						onChange={e => handleArrayInput('images', e.target.value)}
						placeholder="https://example.com/img1.jpg"
					/>
				</div>

				<div className="form-group">
					<label>GitHub URL</label>
					<input
						type="url"
						value={formData.githubUrl}
						onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
					/>
				</div>

				<div className="form-group">
					<label>Live URL</label>
					<input
						type="url"
						value={formData.liveUrl}
						onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
					/>
				</div>

				<div className="form-group">
					<label>
						<input
							type="checkbox"
							checked={formData.isPrivate}
							onChange={e => setFormData({ ...formData, isPrivate: e.target.checked })}
						/>
						Private Project
					</label>
				</div>

				<div className="form-actions">
					<button type="submit">{editingProject ? 'Update' : 'Create'}</button>
					{editingProject && (
						<button type="button" onClick={resetForm}>
							Cancel
						</button>
					)}
				</div>
			</form>

			<div className="projects-list">
				<h2>Existing Projects</h2>
				{projects.map(project => (
					<div key={project.id} className="project-item">
						<h3>{project.title}</h3>
						<p>{project.description}</p>
						<p>
							<strong>Technologies:</strong> {project.technologies.join(', ')}
						</p>
						<div className="project-actions">
							<button type="button" onClick={() => handleEdit(project)}>
								Edit
							</button>
							<button type="button" onClick={() => handleDelete(project.id)} className="delete">
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default ProjectsManager
