import { useState } from "react";
import { createTopic } from "./api";

export default function Dashboard({ user, refresh }) {
  const [text, setText] = useState("");

  const submit = async () => {
    await createTopic({ text, user });
    refresh();
  };

  return (
    <div>
      <h2 style={{ color: "black" }}>Create Topic</h2>
      <input onChange={e => setText(e.target.value)} />
      <button onClick={submit}>Create</button>
    </div>
  );
}


