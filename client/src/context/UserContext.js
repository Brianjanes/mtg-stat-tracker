import React, { useEffect, createContext, useState } from "react";
import { useUser } from "@clerk/clerk-react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { user } = useUser();
  const [loggedInUser, setLoggedInUser] = useState(null);

  //need to create a fucntion that checks the my clerk account for a user's email to see it if exists? i think?

  return (
    <UserContext.Provider value={(loggedInUser, setLoggedInUser)}>
      {children}
    </UserContext.Provider>
  );
};
