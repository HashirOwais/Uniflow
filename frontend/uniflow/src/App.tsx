import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Dashboard } from "@/components/Dashboard"
import { Calendar18 } from "@/components/Calendar18"

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'calendar'>('dashboard')

  return (
    <div className="flex min-h-screen flex-col">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 bg-background min-h-0 overflow-hidden">
        {activeTab === "dashboard" ? (
          <Dashboard />
        ) : (
          <div className="flex items-center justify-center w-full h-full p-3 sm:p-4 lg:p-6">
            <div className="w-full max-w-3xl">
              <Calendar18 />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
