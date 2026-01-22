import React, { useState, useEffect } from 'react'
import './Dashboard.css'

function Dashboard() {
  const [stats, setStats] = useState({
    totalComponents: 3,
    activeHooks: 5,
    classComponents: 1,
    functionalComponents: 3
  })

  const [liveData, setLiveData] = useState([])
  const [chartData, setChartData] = useState([50, 30, 45, 60, 40, 55, 70])

  useEffect(() => {
    // Simulate live data updates
    const interval = setInterval(() => {
      const newValue = Math.floor(Math.random() * 100)
      setChartData(prev => [...prev.slice(1), newValue])
      
      const newLog = {
        id: Date.now(),
        type: ['info', 'success', 'warning'][Math.floor(Math.random() * 3)],
        message: [
          'Component rendered successfully',
          'State updated',
          'Effect triggered',
          'Hook executed',
          'Data fetched'
        ][Math.floor(Math.random() * 5)],
        timestamp: new Date().toLocaleTimeString()
      }
      
      setLiveData(prev => [newLog, ...prev].slice(0, 10))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="dashboard-container fade-in">
      <div className="header-section">
        <h1>📊 React Lifecycle Dashboard</h1>
        <p>Real-time monitoring and analytics</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card slide-in-left" style={{ animationDelay: '0.1s' }}>
          <div className="stat-icon">⚛️</div>
          <div className="stat-content">
            <h3>{stats.totalComponents}</h3>
            <p>Total Components</p>
          </div>
        </div>

        <div className="stat-card slide-in-left" style={{ animationDelay: '0.2s' }}>
          <div className="stat-icon">🪝</div>
          <div className="stat-content">
            <h3>{stats.activeHooks}</h3>
            <p>Active Hooks</p>
          </div>
        </div>

        <div className="stat-card slide-in-left" style={{ animationDelay: '0.3s' }}>
          <div className="stat-icon">🎓</div>
          <div className="stat-content">
            <h3>{stats.classComponents}</h3>
            <p>Class Components</p>
          </div>
        </div>

        <div className="stat-card slide-in-left" style={{ animationDelay: '0.4s' }}>
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <h3>{stats.functionalComponents}</h3>
            <p>Functional Components</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Live Chart */}
        <div className="dashboard-card chart-card">
          <h2>📈 Live Activity Chart</h2>
          <div className="chart-container">
            <div className="chart-bars">
              {chartData.map((value, index) => (
                <div key={index} className="chart-bar-wrapper">
                  <div 
                    className="chart-bar"
                    style={{ 
                      height: `${value}%`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  />
                  <span className="chart-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Logs */}
        <div className="dashboard-card logs-card">
          <h2>📋 Live Event Stream</h2>
          <div className="live-logs">
            {liveData.length === 0 ? (
              <p className="no-data">Waiting for events...</p>
            ) : (
              liveData.map(log => (
                <div key={log.id} className={`live-log-entry ${log.type}`}>
                  <span className="log-icon">
                    {log.type === 'info' && 'ℹ️'}
                    {log.type === 'success' && '✅'}
                    {log.type === 'warning' && '⚠️'}
                  </span>
                  <div className="log-content">
                    <span className="log-message">{log.message}</span>
                    <span className="log-time">{log.timestamp}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Component Info */}
        <div className="dashboard-card info-card">
          <h2>🔍 Component Breakdown</h2>
          <div className="component-breakdown">
            <div className="breakdown-item">
              <div className="breakdown-header">
                <span className="breakdown-label">Class Components</span>
                <span className="breakdown-percentage">25%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill class" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div className="breakdown-item">
              <div className="breakdown-header">
                <span className="breakdown-label">Functional Components</span>
                <span className="breakdown-percentage">75%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill functional" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Lifecycle Methods */}
        <div className="dashboard-card info-card">
          <h2>🔄 Lifecycle Coverage</h2>
          <div className="lifecycle-items">
            <div className="lifecycle-tag mounting">
              <span className="tag-icon">🚀</span>
              <span>Mounting</span>
            </div>
            <div className="lifecycle-tag updating">
              <span className="tag-icon">🔄</span>
              <span>Updating</span>
            </div>
            <div className="lifecycle-tag unmounting">
              <span className="tag-icon">🗑️</span>
              <span>Unmounting</span>
            </div>
          </div>
          <div className="hooks-coverage">
            <h3>Active Hooks:</h3>
            <div className="hooks-tags">
              <span className="hook-tag">useState</span>
              <span className="hook-tag">useEffect</span>
              <span className="hook-tag">useRef</span>
              <span className="hook-tag">useCallback</span>
              <span className="hook-tag">useMemo</span>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="dashboard-card metrics-card">
          <h2>⚡ Performance Metrics</h2>
          <div className="metrics-list">
            <div className="metric-item">
              <span className="metric-label">Render Time</span>
              <span className="metric-value success">~2ms</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Memory Usage</span>
              <span className="metric-value success">12MB</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Bundle Size</span>
              <span className="metric-value success">145KB</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">API Calls</span>
              <span className="metric-value">3 pending</span>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="dashboard-card status-card">
          <h2>🌐 System Status</h2>
          <div className="status-list">
            <div className="status-item online">
              <span className="status-dot"></span>
              <span>React App Running</span>
            </div>
            <div className="status-item online">
              <span className="status-dot"></span>
              <span>Hot Module Replacement</span>
            </div>
            <div className="status-item online">
              <span className="status-dot"></span>
              <span>Development Server</span>
            </div>
            <div className="status-item online">
              <span className="status-dot"></span>
              <span>All Hooks Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
