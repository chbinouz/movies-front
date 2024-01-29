import {
    Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Import des différentes pages
import LoginPage from "../pages/login-page/LoginPage";
import SignupPage from "../pages/signupPage/SignupPage";
import HomePage from "../pages/homePage/HomePage";
import MyFavsPage from "../pages/myFavsPage/MyFavsPage";
import AdminPage from "../pages/adminPage.jsx/AdminPage";

// Configuration des routes pour les utilisateurs authentifiés
const HomeRoute = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/home" element={<HomePage />} />
      <Route path="/myFavs" element={<MyFavsPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={ <Navigate to="/home" /> } />
    </Route>
  )
);

// Configuration des routes pour les utilisateurs non authentifiés
const unauthenticatedRoute = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sinup" element={<SignupPage />} />
      <Route path="*" element={ <Navigate to="/login" />} />
    </Route>
  )
);

// Export des configurations de routes
export { HomeRoute, unauthenticatedRoute };
