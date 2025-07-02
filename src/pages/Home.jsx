const Home = ({ user }) => {
  const isSignedIn = !!user

  return (
    <main className="home">
      <header className="home-header">
        <img
          src="https://i.imgur.com/QGcDAiC.png"
          alt="TuneNest Logo"
          id="welcome"
        />
        {isSignedIn && user.img && (
          <img
            src={`http://localhost:3001/${user.img}`}
            alt={user.username}
            className="home-avatar"
          />
        )}
        <section className="welcome-signin">
          <h2>Welcome {isSignedIn ? user.username : 'Guest'}</h2>
          <p className="home-tagline">
            Discover, create, and share playlists with your favorite music.
          </p>
          <a href="/playlists" className="cta-btn">
            Browse Playlists
          </a>
        </section>
      </header>
      <section className="home-features">
        <div>
          <span role="img" aria-label="music">
            🎵
          </span>{' '}
          Create custom playlists
        </div>
        <div>
          <span role="img" aria-label="discover">
            🔍
          </span>{' '}
          Discover new music
        </div>
        <div>
          <span role="img" aria-label="share">
            🤝
          </span>{' '}
          Share with friends
        </div>
        <div>
          <span role="img" aria-label="comment">
            💬
          </span>{' '}
          Comment and like playlists
        </div>
      </section>
    </main>
  )
}

export default Home
