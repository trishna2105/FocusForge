export default function TopicDetails({ topic, onBack }) {
  return (
    <div className="container">
      <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
        <button style={{ color: "black" }} className="back-btn" onClick={onBack}>← Back</button>
        <h2 style={{ marginLeft: 12, color: "black" }}>{topic.text}</h2>
      </div>

      <div className="card">
        <p>Status: <strong>{topic.status}</strong></p>
      </div>

      <div className="card">
        <h3>👥 Members</h3>
        <div className="member-list">
          {topic.members.map(m => (
            <span key={m} className="member-chip">{m}</span>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>📚 AI Resources</h3>

        {!topic.resources && (
          <p>Resources will be generated once the topic is closed.</p>
        )}

        {topic.resources && (
          <pre style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{topic.resources.raw || JSON.stringify(topic.resources, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
