import { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import Results from "./pages/Results";

function App() {
  const [page, setPage] = useState("home");
  const [stage, setStage] = useState(null);

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("cg_current");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("cg_current");
    setCurrentUser(null);
    setPage("home");
  };

  return (
    <div className="main">

      <div className="navbar">
        <span className="logo" onClick={() => setPage("home")} style={{ cursor:"pointer" }}>
          CareerGPS
        </span>

        <div className="menu">
          <span onClick={() => setPage("home")}>Home</span>
          <span onClick={() => setPage("about")}>About</span>
          <span onClick={() => setPage("how")}>How it Works</span>
          <span onClick={() => setPage("explore")}>Explore</span>
        </div>

        {currentUser ? (
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <button className="btn" onClick={() => setPage("dashboard")}>
              Dashboard
            </button>
            <button
              className="btn"
              onClick={handleLogout}
              style={{ background:"transparent", border:"1px solid var(--border)", color:"var(--muted)" }}
            >
              Logout
            </button>
          </div>
        ) : (
          <button className="btn" onClick={() => setPage("login")}>
            Get Started
          </button>
        )}
      </div>

     {page === "home" && <Home setPage={setPage} currentUser={currentUser} />}
      {page === "about"      && <About />}
      {page === "how"        && <HowItWorks />}
      {page === "explore"    && <Explore />}
      {page === "login"      && <Login setPage={setPage} setCurrentUser={setCurrentUser} />}
      {page === "dashboard"  && <Dashboard setPage={setPage} currentUser={currentUser} setStage={setStage} />}
      {page === "assessment" && <Assessment setPage={setPage} currentUser={currentUser} stage={stage} />}
      {page === "results" && <Results setPage={setPage} currentUser={currentUser} />}

    </div>
  );
}

export default App;