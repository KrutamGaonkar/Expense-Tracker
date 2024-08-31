import React from 'react'
import SignUpSignIn from '../components/SignUpSignIn'
import Header from '../components/Header'

function SignUp() {
  return (
    <div>
      <Header/>
      <div className="wrapper">
        <SignUpSignIn/>
      </div>
    </div>
  )
}

export default SignUp
