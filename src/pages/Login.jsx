import { useState } from "react";

function Login({ setPage, setCurrentUser }) {
  const [tab, setTab]       = useState("login");
  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [password, setPass] = useState("");
  const [error, setError]   = useState("");

  const getUsers  = () => JSON.parse(localStorage.getItem("cg_users") || "[]");
  const saveUsers = (users) => localStorage.setItem("cg_users", JSON.stringify(users));

  const handleSignup = () => {
    setError("");
    if (!name || !email || !password) return setError("Please fill all fields.");
    const users = getUsers();
    if (users.find(u => u.email === email)) return setError("Email already registered.");
    const newUser = { name, email, password, createdAt: Date.now() };
    saveUsers([...users, newUser]);
    localStorage.setItem("cg_current", JSON.stringify(newUser));
    setCurrentUser(newUser);
    setPage("dashboard");
  };

  const handleLogin = () => {
    setError("");
    if (!email || !password) return setError("Please fill all fields.");
    const users = getUsers();
    const user = users.find(
      u => u.email.trim().toLowerCase() === email.trim().toLowerCase()
      && u.password === password
    );
    if (!user) return setError("Invalid email or password.");
    localStorage.setItem("cg_current", JSON.stringify(user));
    setCurrentUser(user);
    setPage("dashboard");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <div className="login-logo" onClick={() => setPage("home")}>
          CareerGuide
        </div>

        <h2 className="login-heading">
          {tab === "login" ? "Welcome Back! 👋" : "Create Account ✨"}
        </h2>
        <p className="login-sub">
          {tab === "login"
            ? "Sign in to continue your career journey"
            : "Start your AI-powered career discovery"}
        </p>

        <div className="login-tabs">
          <button
            className={`login-tab ${tab === "login" ? "active" : ""}`}
            onClick={() => { setTab("login"); setError(""); }}
          >
            Login
          </button>
          <button
            className={`login-tab ${tab === "signup" ? "active" : ""}`}
            onClick={() => { setTab("signup"); setError(""); }}
          >
            Sign Up
          </button>
        </div>

        <div className="login-fields">
          {tab === "signup" && (
            <div className="login-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
          )}

          <div className="login-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="login-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPass(e.target.value)}
              onKeyDown={e => e.key === "Enter" && (tab === "login" ? handleLogin() : handleSignup())}
            />
          </div>
        </div>

        {error && <div className="login-error">{error}</div>}

        <button
          className="login-btn"
          onClick={tab === "login" ? handleLogin : handleSignup}
        >
          {tab === "login" ? "Login" : "Create Account"}
        </button>

        <p className="login-switch">
          {tab === "login" ? (
            <>Don't have an account?{" "}
              <span onClick={() => { setTab("signup"); setError(""); }}>Sign Up</span>
            </>
          ) : (
            <>Already have an account?{" "}
              <span onClick={() => { setTab("login"); setError(""); }}>Login</span>
            </>
          )}
        </p>

      </div>
    </div>
  );
}

export default Login;