const SignOut = ({ setUser }) => {
  const handleSignOut = () => {
    setUser(null)
    localStorage.removeItem('token')
    delete window.localStorage.token
    delete require('../services/api').default.defaults.headers.common[
      'Authorization'
    ]
    alert('Signed out!')
  }

  return (
    <div>
      <div>
        <h2>Sign Out</h2>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  )
}

export default SignOut
