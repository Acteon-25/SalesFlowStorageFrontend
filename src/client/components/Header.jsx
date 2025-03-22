import { use } from "react";
import { UserContext } from "@/context/userContext";
import { NavbarLoggedOut } from "@/client/components/NavbarLoggedOut";
import { NavbarLoggedIn } from "@/client/components/NavbarLoggedIn";

export const Header = () => {
  const { user } = use(UserContext);

  return (
    <>
      {user ? <NavbarLoggedIn /> : <NavbarLoggedOut />}
    </>
  );
};