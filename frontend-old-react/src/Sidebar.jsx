import React from "react";

export default function Sidebar({ onNavigate, currentView, user }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="logo">⚡ FocusForge</div>
      </div>

      <nav className="nav">
        <button
          className={`nav-item ${currentView === "create" ? "active" : ""}`}
          onClick={() => onNavigate("create")}
        >
          + Create Topic
        </button>

        <button
          className={`nav-item ${currentView === "list" ? "active" : ""}`}
          onClick={() => onNavigate("list")}
        >
          🔖 Topics
        </button>
      </nav>

      <div className="sidebar-bottom">
        <div className="user">Logged in as <strong>{user}</strong></div>
        <button className="logout" onClick={() => window.location.reload()}>
          Logout
        </button>
      </div>
    </aside>
  );
}
