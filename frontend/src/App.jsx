import { useEffect, useState } from 'react'

function App() {
  const [status, setStatus] = useState('loading...')

  useEffect(() => {
    fetch('/api/health/')
      .then((response) => response.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus('backend is down'))
  }, [])

  return (
    <main>
      <h1>YouTube Clone</h1>
      <p>Backend: {status}</p>
    </main>
  )
}

export default App
