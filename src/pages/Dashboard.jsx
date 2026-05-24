import { useState } from "react";

const STAGES = [
  { key:"school10", icon:"🏫", title:"Just finished 10th",    desc:"Help choosing which group to take in 11th" },
  { key:"school12", icon:"📚", title:"Just finished 12th",    desc:"Help choosing the right college and course" },
  { key:"ug",       icon:"🎓", title:"Completed UG / Pursuing UG", desc:"Whether you have some idea or no idea — we will figure out the best path" },
  { key:"working",  icon:"💼", title:"Currently Working",     desc:"Career switch, growth or upskilling" },
  { key:"business", icon:"🚀", title:"Want to Start Business", desc:"Find the right business path for you" },
];

function Dashboard({ setPage, currentUser, setStage }) {
  const progress       = JSON.parse(localStorage.getItem("cg_progress_" + currentUser.email) || "{}");
  const savedStage     = progress.stage || null;
  const assessmentDone = progress.done  || false;

  const handleStageSelect = (key) => {
    const updated = { ...progress, stage: key };
    localStorage.setItem("cg_progress_" + currentUser.email, JSON.stringify(updated));
    setStage(key);
    setPage("assessment");
  };

  return (
    <div className="dash-wrapper">

      <div className="dash-header">
        <div>
          <h1 className="dash-title">Hello, {currentUser.name.split(" ")[0]}! 👋</h1>
          <p className="dash-sub">Let's find your perfect career path. Tell us where you are right now!</p>
        </div>
        {assessmentDone && (
          <button className="dash-results-btn" onClick={() => setPage("results")}>
            View My Results →
          </button>
        )}
      </div>

      {assessmentDone && (
        <div className="dash-results-banner">
          <div>
            <div className="dash-results-title">🎉 Your Career GPS is ready!</div>
            <div className="dash-results-sub">You have already completed the assessment. View your personalised roadmap.</div>
          </div>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <button className="dash-results-btn" onClick={() => setPage("results")}>
              View Results →
            </button>
            <button
              className="dash-start-btn"
              onClick={() => {
                localStorage.setItem("cg_progress_" + currentUser.email, JSON.stringify({}));
                window.location.reload();
              }}
            >
              Retake Assessment
            </button>
          </div>
        </div>
      )}

      {!assessmentDone && (
        <>
          <div className="dash-section-title">Where are you right now?</div>
          <p className="dash-pick-sub">Pick the option that best describes you — we will ask the right questions from there</p>

          <div className="dash-stage-grid">
            {STAGES.map(s => (
              <div
                key={s.key}
                className={`dash-stage-card ${savedStage === s.key ? "selected" : ""}`}
                onClick={() => handleStageSelect(s.key)}
              >
                <div className="dash-stage-icon">{s.icon}</div>
                <div className="dash-stage-title">{s.title}</div>
                <div className="dash-stage-desc">{s.desc}</div>
                <div className="dash-stage-arrow">Start →</div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="dash-tip">
        💡 There are no right or wrong answers — just be honest and we will find the best path for you!
      </div>

    </div>
  );
}

export default Dashboard;