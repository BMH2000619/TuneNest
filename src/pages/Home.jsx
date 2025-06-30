const Home = ({ user }) => {
  const isSignedIn = !!user

  return (
    <div className="col home">
      <img src="https://i.imgur.com/clM1jkC.jpeg" alt="welcome" id="welcome" />

      <section className="welcome-signin">
        <h2>Welcome {isSignedIn ? user.username : 'Guest'}</h2>
      </section>
    </div>
  )
}

export default Home
