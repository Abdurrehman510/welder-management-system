// src/pages/AuthTest.jsx

import { useAuth } from '../contexts/AuthContext'

export default function AuthTest() {
  const { user, session, loading } = useAuth()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Auth Test Page</h1>
      
      <div className="bg-gray-100 p-4 rounded">
        <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
        <p><strong>User:</strong> {user ? user.email : 'Not logged in'}</p>
        <p><strong>Session:</strong> {session ? 'Active' : 'None'}</p>
      </div>

      {user && (
        <div className="mt-4">
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}