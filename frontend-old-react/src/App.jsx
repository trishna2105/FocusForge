import React, { useEffect, useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Topics from "./Topics";
import TopicDetails from "./TopicDetails";
import Sidebar from "./Sidebar";
import { getTopics, getTopicDetails } from "./api";

export default function App() {
  const [user, setUser] = useState(null);
  const [topics, setTopics] = useState([]);
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("create"); // "create" | "list" | "details"

  // load topics
  const load = async () => {
    try {
      const res = await getTopics();
      setTopics(res.data);
    } catch (e) {
      console.error("Failed to load topics", e);
    }
  };

  useEffect(() => {
  if (!user) return;

  const fetchTopics = async () => {
    await load();
  };

  fetchTopics();

  const onPop = async (ev) => {
    const state = ev.state ?? {};
      if (state.view === "details" && state.topic) {
        try {
          const res = await getTopicDetails(state.topic);
          setSelected(res.data);
          setView("details");
        } catch {
          setSelected(null);
          setView("list");
        }
      } else {
        setSelected(null);
        setView(state.view === "create" ? "create" : "list");
      }
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);

  }, [user]);


  // open topic details (push history so Back works)
  const open = async (topicText) => {
    try {
      const res = await getTopicDetails(topicText);
      setSelected(res.data);
      setView("details");

      // push to history so Back will go back to previous state
      // store minimal state: view & topic
      window.history.pushState({ view: "details", topic: topicText }, "", `/topic/${encodeURIComponent(topicText)}`);
    } catch (e) {
      console.error("Failed to open topic", e);
    }
  };

  // programmatic navigate from sidebar
  const goTo = (v) => {
    setSelected(null);
    setView(v);
    // push a lightweight history entry for consistent back behavior
    window.history.pushState({ view: v }, "", v === "create" ? "/" : v === "list" ? "/topics" : "/");
  };

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div>
      <Sidebar onNavigate={goTo} currentView={view} user={user} />
      <main className="main-area">
        {view === "create" && <Dashboard user={user} refresh={load} />}
        {view === "list" && <Topics topics={topics} user={user} open={open} />}
        {view === "details" && selected && (
          <TopicDetails
            topic={selected}
            onBack={() => {
              // go back to list view and pop history
              window.history.back();
              // also set local state (popstate handler will handle most cases)
              setSelected(null);
              setView("list");
            }}
          />
        )}
      </main>
    </div>
  );
}
