import React, { useEffect } from "react";
import { Redirect } from "react-router";
import { useAuth } from "../../providers/auth-provider";

const ProfilePage = () => {
  const { user, handleLogin } = useAuth();

  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const email = urlParams.get("email");
  const iat = Number(urlParams.get("iat") || 0);
  const exp = Number(urlParams.get("exp") || 0);

  useEffect(() => {
    if (userId && email) {
      console.log({userId, email})
      handleLogin({ userId, email, iat, exp });
    }
  }, [userId, email, iat, exp, handleLogin]);

  if(userId === user.userId) {
    return <Redirect to="/profile" />
  }

  return (
    <div>
      <h1>Profile Page</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default ProfilePage;
