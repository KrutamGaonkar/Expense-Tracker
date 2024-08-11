import React, { useState } from 'react'
import './style.css'
import Input from '../Input'
import Button from '../Button';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function SignUpSignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

  function signUpWithEmail() {
    setLoading(true);
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            toast.success("Signed In successfully");
            createDoc(user);
            navigate('/dashboard');
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorCode + ":" + errorMessage)
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          });
      } else {
        toast.error("Password and Confirm password don't match")
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }

  function logInWithEmail(){
    setLoading(true);
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            toast.success("Signed In successfully");
            createDoc(user);
            navigate('/dashboard');
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorCode + ":" + errorMessage)
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          });
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }

  function googleAuth() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        createDoc(user);
        navigate('/dashboard');
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        toast.error(errorMessage);
      });
  }

  async function createDoc(user){
    if(!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if(!userData.exists()){
      try{
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date() 
        })
        toast.success("Doc Created");
      }catch(e){
        toast.error(e.message);
      }
    }else{
      toast.error("User already exists");
    }
  }

  return (
    loginForm ? <>
      <div className="signup-wrapper">
        <h2 className='title'>Log In on <span style={{ color: "var(--theme)" }}>FinTracker</span></h2>
        <form>
          <Input
            type={"email"}
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
            state={email}
            setState={setEmail} />
          <Input
            type={"password"}
            label={"Password"}
            placeholder={"Example@123"}
            state={password}
            setState={setPassword} />
          <Button disable={loading} text={loading ? "Loading..." : "Log In with Email and Password"} onClick={logInWithEmail} blue={false} />
          <p style={{ textAlign: 'center' }}>or</p>
          <Button text={loading ? "Loading..." : "Log In with Google"} onClick={googleAuth} blue={true} />
          <p className='p-login'>Don't Have An Account? <span className='span-login' onClick={()=>setLoginForm(false)}>Create One.</span></p>
        </form>
      </div>
    </> :
      <>
        <div className="signup-wrapper">
          <h2 className='title'>Sign Up on <span style={{ color: "var(--theme)" }}>FinTracker</span></h2>
          <form>
            <Input
              label={"Full Name"}
              placeholder={"John Doe"}
              state={name}
              setState={setName} />
            <Input
              type={"email"}
              label={"Email"}
              placeholder={"johndoe@gmail.com"}
              state={email}
              setState={setEmail} />
            <Input
              type={"password"}
              label={"Password"}
              placeholder={"Example@123"}
              state={password}
              setState={setPassword} />
            <Input
              type={"password"}
              label={"Confirm Passsword"}
              placeholder={"Example@123"}
              state={confirmPassword}
              setState={setConfirmPassword} />
            <Button disable={loading} text={loading ? "Loading..." : "Sign Up using Email and Password"} onClick={signUpWithEmail} blue={false} />
            <p style={{ textAlign: 'center' }}>or</p>
            <Button text={loading ? "Loading..." : "Sign Up using Google"} onClick={googleAuth} blue={true} />
            <p className='p-login'>Already Have An Account? <span className='span-login' onClick={()=>setLoginForm(true)}>Click Here.</span></p>
          </form>
        </div>
      </>
  )
}

export default SignUpSignIn
