function Home({ setPage, currentUser }) {
  return (
    <div className="hero">

      <div className="left">
        <p className="tag">AI-Powered Career Guidance</p>

        <h1>
          Discover Your <br />
          <span>Perfect Career Path</span>
        </h1>

        <p className="desc">
          Take a smart assessment and explore the best career path.
        </p>

        <button
          className="primary"
          onClick={() =>
            currentUser ? setPage("dashboard") : setPage("login")
          }
        >
          Start Assessment
        </button>

        <button
          className="secondary"
          onClick={() => setPage("explore")}
        >
          Explore Careers
        </button>
      </div>

      <div className="right">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
          alt="career"
        />
      </div>

    </div>
  );
}

export default Home;