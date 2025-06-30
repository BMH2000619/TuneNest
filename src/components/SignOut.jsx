const SignOut = ({ setUser }) => {
  const handleSignOut = () => {
    setUser(null)
    alert('Signed out!')
  }

  return (
    <div>
      <div>
        <h2 >Sign Out</h2>
        <button onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default SignOut
