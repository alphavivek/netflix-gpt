import { useNavigate } from "react-router-dom";
import Logo from "../images/Netflix_Logo_PMS.png";
import { auth } from "../utils/Firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";

const Header = () =>{
    const navigate = useNavigate();
    const user = useSelector(store => store.user);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
          }).catch((error) => {
            // An error happened.
            navigate("/error");
          });
    }
    return(
        <div className="absolute w-screen px-16 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
            <img className="w-44" src={Logo} alt="Logo" />
            {user && (<div className="flex ">
                <img className="w-12 h-12 mt-4 rounded-3xl" src={user?.photoURL} alt="usericon" />
                <button onClick={handleSignOut} className="bg-gray-500 text-white font-bold m-2">Sign Out</button>
            </div>)}
        </div>
    );
};

export default Header;