import { useState, useEffect } from "react";

function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState(1);

  const steps = [
    { title: "Create Profile", desc: "Enter your details." },
    { title: "Take Test", desc: "Answer simple questions." },
    { title: "AI Analysis", desc: "We analyze your skills." },
    { title: "Career Match", desc: "Find best options." },
    { title: "Final Result", desc: "Get full guidance." }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleSteps((prev) => {
        if (prev === steps.length) return prev;
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="how-container">
      <h1 className="how-title">How It Works</h1>

      <div className="steps">
        {steps.map((step, index) =>
          index < visibleSteps && (
            <div key={index} className="step-card">
              <div className="step-number">0{index + 1}</div>
              <div>
                <h2>{step.title}</h2>
                <p>{step.desc}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default HowItWorks;