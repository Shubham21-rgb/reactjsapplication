import React, { Component } from 'react'
import './ClassLifecycleDemo.css'

class ClassLifecycleDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      logs: [],
      isVisible: true,
      data: null,
      inputValue: ''
    }
    this.addLog('🏗️ Constructor called - Component is being initialized')
  }

  componentDidMount() {
    this.addLog('✅ componentDidMount - Component mounted to DOM')
    
    // Simulate API call
    setTimeout(() => {
      this.setState({ 
        data: 'Data loaded from API!' 
      })
      this.addLog('📡 Data fetched successfully')
    }, 1500)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      this.addLog(`🔄 componentDidUpdate - Count changed from ${prevState.count} to ${this.state.count}`)
    }
    if (prevState.inputValue !== this.state.inputValue) {
      this.addLog(`📝 componentDidUpdate - Input value changed`)
    }
  }

  componentWillUnmount() {
    this.addLog('🗑️ componentWillUnmount - Cleanup before unmounting')
    console.log('Component will unmount - cleanup happening')
  }

  addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString()
    this.setState(prevState => ({
      logs: [...prevState.logs, { message, timestamp }]
    }))
  }

  increment = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }))
  }

  decrement = () => {
    this.setState(prevState => ({ count: prevState.count - 1 }))
  }

  reset = () => {
    this.setState({ count: 0 })
    this.addLog('🔄 Counter reset to 0')
  }

  clearLogs = () => {
    this.setState({ logs: [] })
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  render() {
    const { count, logs, data, inputValue } = this.state

    return (
      <div className="lifecycle-container fade-in">
        <div className="header-section">
          <h1>🎓 Class Component Lifecycle</h1>
          <p>Traditional React class component with lifecycle methods</p>
        </div>

        <div className="demo-grid">
          {/* Counter Section */}
          <div className="demo-card slide-in-left">
            <h2>📊 Counter Demo</h2>
            <div className="counter-display">
              <span className="counter-value">{count}</span>
            </div>
            <div className="button-group">
              <button onClick={this.decrement} className="btn btn-danger">
                ➖ Decrement
              </button>
              <button onClick={this.reset} className="btn btn-secondary">
                🔄 Reset
              </button>
              <button onClick={this.increment} className="btn btn-success">
                ➕ Increment
              </button>
            </div>
          </div>

          {/* Input Section */}
          <div className="demo-card slide-in-right">
            <h2>📝 Input Tracker</h2>
            <input
              type="text"
              value={inputValue}
              onChange={this.handleInputChange}
              placeholder="Type something..."
              className="demo-input"
            />
            <p className="input-display">
              {inputValue ? `You typed: "${inputValue}"` : 'Start typing...'}
            </p>
          </div>

          {/* Data Loading Section */}
          <div className="demo-card slide-in-left">
            <h2>📡 Data Loading</h2>
            <div className="data-display">
              {data ? (
                <div className="data-success">
                  <span className="success-icon">✅</span>
                  <p>{data}</p>
                </div>
              ) : (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p>Loading data...</p>
                </div>
              )}
            </div>
          </div>

          {/* Lifecycle Methods Info */}
          <div className="demo-card slide-in-right">
            <h2>🔍 Lifecycle Methods</h2>
            <div className="methods-list">
              <div className="method-item">
                <span className="method-name">constructor()</span>
                <span className="method-badge mounting">Mounting</span>
              </div>
              <div className="method-item">
                <span className="method-name">componentDidMount()</span>
                <span className="method-badge mounting">Mounting</span>
              </div>
              <div className="method-item">
                <span className="method-name">componentDidUpdate()</span>
                <span className="method-badge updating">Updating</span>
              </div>
              <div className="method-item">
                <span className="method-name">componentWillUnmount()</span>
                <span className="method-badge unmounting">Unmounting</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lifecycle Logs */}
        <div className="logs-section">
          <div className="logs-header">
            <h2>📋 Lifecycle Event Logs</h2>
            <button onClick={this.clearLogs} className="btn btn-secondary">
              🗑️ Clear Logs
            </button>
          </div>
          <div className="logs-container">
            {logs.length === 0 ? (
              <p className="no-logs">No lifecycle events yet...</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="log-entry">
                  <span className="log-time">{log.timestamp}</span>
                  <span className="log-message">{log.message}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default ClassLifecycleDemo
