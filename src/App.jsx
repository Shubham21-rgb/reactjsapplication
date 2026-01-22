import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import ClassLifecycleDemo from './components/ClassLifecycleDemo'
import FunctionalHooksDemo from './components/FunctionalHooksDemo'
import Dashboard from './components/Dashboard'
import Home from './components/Home'

function App() {
  const [activeNav, setActiveNav] = useState('home')

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-brand">
              <span className="logo-icon">⚛️</span>
              <h1>React Lifecycle Hub</h1>
            </div>
            <ul className="nav-links">
              <li>
                <Link 
                  to="/" 
                  className={activeNav === 'home' ? 'active' : ''}
                  onClick={() => setActiveNav('home')}
                >
                  🏠 Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/class-lifecycle" 
                  className={activeNav === 'class' ? 'active' : ''}
                  onClick={() => setActiveNav('class')}
                >
                  🎓 Class Lifecycle
                </Link>
              </li>
              <li>
                <Link 
                  to="/functional-hooks" 
                  className={activeNav === 'hooks' ? 'active' : ''}
                  onClick={() => setActiveNav('hooks')}
                >
                  🪝 Hooks
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard" 
                  className={activeNav === 'dashboard' ? 'active' : ''}
                  onClick={() => setActiveNav('dashboard')}
                >
                  📊 Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/class-lifecycle" element={<ClassLifecycleDemo />} />
            <Route path="/functional-hooks" element={<FunctionalHooksDemo />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>Built with ⚛️ React • Demonstrating Lifecycle Methods & Hooks</p>
          <p className="footer-subtitle">Professional UI/UX Design • 2026</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
