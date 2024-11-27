"use client";

import useGetCurrentUser from "../api/use-getCurrentUser";

const UserButton = () => {
  const { data: user, isLoading } = useGetCurrentUser();
  return <div>user button</div>;
};

export default UserButton;
