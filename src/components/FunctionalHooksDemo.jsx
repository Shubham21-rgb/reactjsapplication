import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import './FunctionalHooksDemo.css'

function FunctionalHooksDemo() {
  // useState Hook
  const [count, setCount] = useState(0)
  const [logs, setLogs] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState([])
  const [isOnline, setIsOnline] = useState(true)

  // useRef Hook
  const renderCount = useRef(0)
  const inputRef = useRef(null)

  // Add log helper
  const addLog = useCallback((message) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prevLogs => [...prevLogs, { message, timestamp }])
  }, [])

  // useEffect - Component Mount (runs once)
  useEffect(() => {
    addLog('🎯 useEffect (Mount) - Component mounted')
    
    return () => {
      addLog('🗑️ useEffect (Unmount) - Cleanup function called')
    }
  }, [])

  // useEffect - Watching count changes
  useEffect(() => {
    if (renderCount.current > 0) {
      addLog(`🔄 useEffect (Update) - Count changed to ${count}`)
    }
  }, [count])

  // useEffect - Watching input changes with debounce
  useEffect(() => {
    if (inputValue) {
      const timer = setTimeout(() => {
        addLog(`⌨️ useEffect (Debounce) - Input value: "${inputValue}"`)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [inputValue])

  // useEffect - Simulating online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      addLog('🌐 Network status: Online')
    }
    const handleOffline = () => {
      setIsOnline(false)
      addLog('📴 Network status: Offline')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Track render count with useRef
  useEffect(() => {
    renderCount.current += 1
  })

  // useCallback - Memoized function
  const increment = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  const decrement = useCallback(() => {
    setCount(prev => prev - 1)
  }, [])

  const reset = useCallback(() => {
    setCount(0)
    addLog('🔄 Counter reset via useCallback')
  }, [addLog])

  const addTodo = useCallback(() => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      }
      setTodos(prev => [...prev, newTodo])
      addLog(`✅ Todo added: "${inputValue}"`)
      setInputValue('')
      inputRef.current?.focus()
    }
  }, [inputValue, addLog])

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
    addLog('✓ Todo toggled')
  }, [addLog])

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
    addLog('🗑️ Todo deleted')
  }, [addLog])

  // useMemo - Expensive computation
  const expensiveComputation = useMemo(() => {
    addLog('🧮 useMemo - Computing expensive value')
    let result = 0
    for (let i = 0; i < count * 1000; i++) {
      result += i
    }
    return result
  }, [count])

  const todosStats = useMemo(() => {
    const total = todos.length
    const completed = todos.filter(t => t.completed).length
    const pending = total - completed
    return { total, completed, pending }
  }, [todos])

  const clearLogs = () => {
    setLogs([])
  }

  const focusInput = () => {
    inputRef.current?.focus()
    addLog('🎯 useRef - Input focused programmatically')
  }

  return (
    <div className="hooks-container fade-in">
      <div className="header-section">
        <h1>🪝 Functional Component with Hooks</h1>
        <p>Modern React using useState, useEffect, useRef, useCallback, and useMemo</p>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-label">Render Count:</span>
          <span className="stat-value">{renderCount.current}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Network:</span>
          <span className={`stat-value ${isOnline ? 'online' : 'offline'}`}>
            {isOnline ? '🌐 Online' : '📴 Offline'}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Expensive Computation:</span>
          <span className="stat-value">{expensiveComputation.toLocaleString()}</span>
        </div>
      </div>

      <div className="demo-grid">
        {/* Counter Section */}
        <div className="demo-card slide-in-left">
          <h2>📊 useState Hook</h2>
          <div className="counter-display">
            <span className="counter-value">{count}</span>
          </div>
          <div className="button-group">
            <button onClick={decrement} className="btn btn-danger">
              ➖ Decrement
            </button>
            <button onClick={reset} className="btn btn-secondary">
              🔄 Reset
            </button>
            <button onClick={increment} className="btn btn-success">
              ➕ Increment
            </button>
          </div>
        </div>

        {/* useRef Demo */}
        <div className="demo-card slide-in-right">
          <h2>🎯 useRef Hook</h2>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a todo..."
            className="demo-input"
          />
          <div className="button-group">
            <button onClick={focusInput} className="btn btn-secondary">
              🎯 Focus Input
            </button>
            <button onClick={addTodo} className="btn btn-success">
              ➕ Add Todo
            </button>
          </div>
        </div>

        {/* Todos Section */}
        <div className="demo-card slide-in-left wide">
          <h2>📝 Todo List (useCallback Demo)</h2>
          <div className="todos-stats">
            <span>Total: {todosStats.total}</span>
            <span>✅ Completed: {todosStats.completed}</span>
            <span>⏳ Pending: {todosStats.pending}</span>
          </div>
          <div className="todos-list">
            {todos.length === 0 ? (
              <p className="no-todos">No todos yet. Add one above!</p>
            ) : (
              todos.map(todo => (
                <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="todo-checkbox"
                  />
                  <span className="todo-text">{todo.text}</span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="btn-delete"
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Hooks Info */}
        <div className="demo-card slide-in-right">
          <h2>🔍 React Hooks Used</h2>
          <div className="hooks-list">
            <div className="hook-item">
              <span className="hook-name">useState</span>
              <span className="hook-badge state">State</span>
            </div>
            <div className="hook-item">
              <span className="hook-name">useEffect</span>
              <span className="hook-badge effect">Effects</span>
            </div>
            <div className="hook-item">
              <span className="hook-name">useRef</span>
              <span className="hook-badge ref">Refs</span>
            </div>
            <div className="hook-item">
              <span className="hook-name">useCallback</span>
              <span className="hook-badge performance">Performance</span>
            </div>
            <div className="hook-item">
              <span className="hook-name">useMemo</span>
              <span className="hook-badge performance">Performance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lifecycle Logs */}
      <div className="logs-section">
        <div className="logs-header">
          <h2>📋 Hook Event Logs</h2>
          <button onClick={clearLogs} className="btn btn-secondary">
            🗑️ Clear Logs
          </button>
        </div>
        <div className="logs-container">
          {logs.length === 0 ? (
            <p className="no-logs">No events logged yet...</p>
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

export default FunctionalHooksDemo
