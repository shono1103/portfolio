import { Route, Routes } from 'react-router-dom'

import AdminLayout from './components/admin/AdminLayout'
import Dashboard from './components/admin/Dashboard'
import JobsManager from './components/admin/JobsManager'
import Login from './components/admin/Login'
import ProjectsManager from './components/admin/ProjectsManager'
import SkillsManager from './components/admin/SkillsManager'
import About from './components/normal/About'
import Contact from './components/normal/Contact'
import Experience from './components/normal/Experience'
import Home from './components/normal/Home'
import Layout from './components/normal/Layout'
import Projects from './components/normal/Projects'
import Skills from './components/normal/Skills'
import Soundbar from './components/normal/Soundbar'


import './App.scss'

function App() {
  return (
    <>
      <Soundbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="experience" element={<Experience />} />
          <Route path="projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/skills" element={<Skills />} />
        </Route>
        
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="jobs" element={<JobsManager />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="skills" element={<SkillsManager />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
