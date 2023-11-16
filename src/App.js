import React, { useState } from 'react';
import './App.css'; // Import the CSS file for styling
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Anthony from "./Anthony.js"
const LoginForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleGoogleSignIn = (credentialResponse) => {
    const details = jwtDecode(credentialResponse.credential);
    console.log(details);
    console.log(credentialResponse);
    setLoggedIn(true);

    // Redirect to a different website upon successful Google Sign-In
    window.location.href = "https://marketplace-benjcrpy.vercel.app/";
  };

  return (
    <div className="login-container">
      <label>
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
        I agree to the terms and conditions
      </label>

      <br />

      {isChecked && (
        <GoogleOAuthProvider clientId="354546675754-l0qb6u36crsh957js7lt54soesom752j.apps.googleusercontent.com" className="google-ri">
          <GoogleLogin
            onSuccess={handleGoogleSignIn}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </GoogleOAuthProvider>
      )}
      {loggedIn && <Anthony />}
    </div>
  );
};

export default LoginForm;
