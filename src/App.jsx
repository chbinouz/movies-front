import { useEffect, useState } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { HomeRoute, unauthenticatedRoute } from "./routes/HomeRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <RouterProvider router={isLoggedIn ? HomeRoute : unauthenticatedRoute} />
    </div>
  );
}

export default App;
