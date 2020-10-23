import React, { useEffect } from "react";
import { useAuth } from "../../services/auth";

const ProfilePage = () => {
  const { getStoredUser, handleLogin } = useAuth();

  const user = getStoredUser();
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const email = urlParams.get("email");

  useEffect(() => {
    if (userId && email) {
      handleLogin({ userId, email });
    }
  }, [userId, email]);


  return (
    <div>
      <h1>Profile Page</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default ProfilePage;
