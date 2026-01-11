import { useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './index.scss'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()
		setError('')

		try {
			const response = await axios.post('http://localhost:8000/api/auth/login', {
				username,
				password,
			})

			if (response.data.access_token) {
				localStorage.setItem('admin_token', response.data.access_token)
				navigate('/admin/dashboard')
			}
		} catch (err) {
			setError(err.response?.data?.detail || 'Login failed')
		}
	}

	return (
		<div className="login-container">
			<div className="login-box">
				<h1>Admin Login</h1>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={e => setUsername(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
						/>
					</div>
					{error && <div className="error-message">{error}</div>}
					<button type="submit">Login</button>
				</form>
			</div>
		</div>
	)
}

export default Login
