import React from "react";
import { useAuth } from "../../services/auth";

const ProfilePage = () => {
  const { getUser, handleLogin } = useAuth();

  const user = getUser();
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const email = urlParams.get("email");

  if(userId && email) {
    handleLogin({userId, email})
  }

  return (
    <div>
      <h1>Profile Page</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default ProfilePage;
