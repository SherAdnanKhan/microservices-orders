import React from 'react'

const Welcome = ({ user }) => {
  return (
    <div className=" welcome">
      {user && user.username &&
        <div className="welcomeMessage">
          <p> Welcome, Hello {user.username} </p>
          <p> how do you feel?</p>
        </div>
      }
    </div>
  )
}

export default Welcome;
