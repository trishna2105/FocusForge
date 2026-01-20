import { useEffect, useState } from "react";
import { joinTopic } from "./api";

export default function Topics({ topics = [], user, open }) {

  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!topics.length) {
    return <p style={{ color: "black" }}>No topics available.</p>;
  }

  return (
    <div>
      <h3 style={{ color: "black" }}>
        Browse and join active study sessions
      </h3>

      <div className="card-grid" style={{ marginTop: 12 }}>
        {topics.map(t => {
          const isFull = t.members >= 5;
          const isClosed = t.status === "closed";

          return (
            <div key={t.id} className="card">
              <h3>{t.text}</h3>

              <p>{t.members}/5 members</p>

              <p>
                {Math.floor(t.time_left / 3600)}h{" "}
                {Math.floor((t.time_left % 3600) / 60)}m left
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  marginTop: 12
                }}
              >
                <button
                  disabled={isFull || isClosed}
                  onClick={() => {
                    if (isFull || isClosed) return;
                    joinTopic({ topic: t.text, user });
                    open(t.text);
                  }}
                  style={{ flex: 1 }}
                >
                  {isClosed ? "Done" : isFull ? "Full" : "Join"}
                </button>

                <button style={{ padding: 8, borderRadius: 8 }}>
                  🗑
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
