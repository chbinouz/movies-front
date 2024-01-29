import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectLoggedUser } from "../../redux/slice/UserSlice";

const Navbar = ({ isLoggedIn = false }) => {
  const navigate = useNavigate();
  const user = useSelector(selectLoggedUser);

  return (
    <div className="w-[100%] h-16 bg-slate-500 flex items-center">
      <div className="w-[10%] flex justify-center">
        <img
          src="src/assets/pngtree-m-movie-logo-design-awesome-inspiration-png-image_5243550-removebg-preview.png"
          className="w-[50%]"
        />
      </div>
      <div className="w-[90%]">
        <div className="flex justify-start gap-5">
          {isLoggedIn ? (
            <div className="w-[100%] flex justify-between">
            <div className="flex gap-5">
              <Link to={"/home"}>Home</Link>
              <Link to={"/myFavs"}>Mes favoris</Link>
              {user.roles.includes("ROLE_ADMIN") && <Link to={"/admin"}>Admin</Link>}
            </div>
            <Link className="mr-5" onClick={() => {
              localStorage.clear();
              navigate(0);
            }}>déconnecter</Link>
            </div>
          ) : (
            <>
              <Link to={"/Login"}>Login</Link>
              <Link to={"/sinup"}>{"S'inscrire"}</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
