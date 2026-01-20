import { useState } from "react";
import { createTopic } from "./api";

export default function CreateTopic() {
  const [text, setText] = useState("");

  const submit = async () => {
    await createTopic(text);
    alert("Topic created");
    setText("");
  };

  return (
    <div className="card">
      <h3 style={{ color: "black" }}>Create Topic</h3>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={submit}>Create</button>
    </div>
  );
}
