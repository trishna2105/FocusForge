"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import CreateTopicContent from "./create-topic-content"
import TopicsContent from "./topics-content"

const PRIMARY_COLOR = "#3179F7"

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick: () => void
}

function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
        active ? "text-white" : "text-gray-600 hover:bg-gray-100"
      }`}
      style={active ? { backgroundColor: PRIMARY_COLOR } : undefined}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  )
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const [activeItem, setActiveItem] = useState("create-topic")

  const handleNavClick = (item: string) => {
    setActiveItem(item)
  }

  const handleLogout = () => {
    router.push("/")
  }

  const renderContent = () => {
    switch (activeItem) {
      case "create-topic":
        return <CreateTopicContent />
      case "topics":
        return <TopicsContent />
      default:
        return children
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-semibold text-sidebar-foreground">FocusForge</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <NavItem
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
            label="Create Topic"
            active={activeItem === "create-topic"}
            onClick={() => handleNavClick("create-topic")}
          />
          <NavItem
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            }
            label="Topics"
            active={activeItem === "topics"}
            onClick={() => handleNavClick("topics")}
          />
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-card-foreground">
            {activeItem === "create-topic" && "Create Topic"}
            {activeItem === "topics" && "Topics"}
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="font-medium">Logout</span>
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  )
}
