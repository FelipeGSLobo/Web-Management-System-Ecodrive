import "./App.css";
import NavbarComponent from "./components/NavbarComponent";
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";
import { onAuthStateChanged } from "firebase/auth";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

import Routes from "./routes/Routes";

function App() {
  // Auth
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <AuthProvider value={user}>
        <BrowserRouter>
          <NavbarComponent />
          <Routes/>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
