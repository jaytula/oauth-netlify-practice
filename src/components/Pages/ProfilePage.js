import React from "react";
import { useAuth } from "../../services/auth";

const ProfilePage = () => {
  const { getUser } = useAuth();

  const user = getUser();

  return (
    <div>
      <h1>Profile Page</h1>
  <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default ProfilePage;
