import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>FocusForge</h2>
      <button onClick={() => navigate("/dashboard/create")}>
        Enter App
      </button>
    </div>
  );
}
