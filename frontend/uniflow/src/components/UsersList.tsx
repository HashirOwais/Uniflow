import { useState, useEffect } from "react"
import { usersApi, type User } from "@/lib/api"
import { Button } from "@/components/ui/button"

export function UsersList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await usersApi.getAll()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users")
      console.error("Error loading users:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async () => {
    const email = prompt("Enter email:")
    const name = prompt("Enter name (optional):")
    
    if (!email) return

    try {
      const newUser = await usersApi.create({ 
        email, 
        name: name || undefined 
      })
      setUsers([...users, newUser])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user")
      console.error("Error creating user:", err)
    }
  }

  if (loading) return <div>Loading users...</div>
  if (error) return <div className="text-destructive">Error: {error}</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Users</h2>
        <Button onClick={handleCreateUser}>Add User</Button>
      </div>
      <div className="space-y-2">
        {users.map(user => (
          <div key={user.id} className="rounded-lg border p-4">
            <p className="font-medium">{user.name || "No name"}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

