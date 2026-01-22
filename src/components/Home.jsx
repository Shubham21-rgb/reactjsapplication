import React from 'react'
import './Home.css'

function Home() {
  return (
    <div className="home-container fade-in">
      <div className="hero-section">
        <h1 className="hero-title">
          Welcome to React Lifecycle Hub
        </h1>
        <p className="hero-subtitle">
          A Professional Demonstration of React Lifecycle Methods and Hooks
        </p>
        <div className="hero-gradient"></div>
      </div>

      <div className="features-grid">
        <div className="feature-card slide-in-left" style={{ animationDelay: '0.1s' }}>
          <div className="feature-icon">🎓</div>
          <h3>Class Lifecycle</h3>
          <p>
            Explore traditional React class components with lifecycle methods like 
            componentDidMount, componentDidUpdate, and componentWillUnmount.
          </p>
          <div className="feature-tag">Legacy API</div>
        </div>

        <div className="feature-card slide-in-left" style={{ animationDelay: '0.2s' }}>
          <div className="feature-icon">🪝</div>
          <h3>React Hooks</h3>
          <p>
            Discover modern functional components using hooks like useState, useEffect, 
            useRef, useCallback, and useMemo for state and side effects.
          </p>
          <div className="feature-tag success">Modern Approach</div>
        </div>

        <div className="feature-card slide-in-left" style={{ animationDelay: '0.3s' }}>
          <div className="feature-icon">📊</div>
          <h3>Interactive Dashboard</h3>
          <p>
            View real-time lifecycle events, state changes, and component interactions 
            in a beautiful, interactive dashboard.
          </p>
          <div className="feature-tag accent">Live Demo</div>
        </div>
      </div>

      <div className="info-section">
        <div className="info-card">
          <h2>🚀 What You'll Learn</h2>
          <ul className="info-list">
            <li>✅ Component mounting, updating, and unmounting phases</li>
            <li>✅ State management with useState and this.state</li>
            <li>✅ Side effects handling with useEffect and lifecycle methods</li>
            <li>✅ Performance optimization techniques</li>
            <li>✅ Best practices for modern React development</li>
          </ul>
        </div>

        <div className="info-card">
          <h2>💡 Features</h2>
          <ul className="info-list">
            <li>🎨 Professional UI/UX design with smooth animations</li>
            <li>📱 Fully responsive layout for all devices</li>
            <li>⚡ Fast development with Vite</li>
            <li>🔄 Real-time state updates and lifecycle tracking</li>
            <li>🎯 Interactive examples and demonstrations</li>
          </ul>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Explore?</h2>
        <p>Navigate through the menu above to see lifecycle methods in action!</p>
        <div className="cta-buttons">
          <button className="cta-button primary">
            🎓 View Class Lifecycle
          </button>
          <button className="cta-button secondary">
            🪝 Explore Hooks
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
