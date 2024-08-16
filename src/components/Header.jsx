import { useNavigate } from "react-router-dom";
import Logo from "../images/Netflix_Logo_PMS.png";
import { auth } from "../utils/Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
            navigate("/error");
          });
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            const {uid, email, displayName, photoURL} = user;
            dispatch(addUser({ uid:uid , email:email, displayName:displayName, photoURL:photoURL }));
            navigate("/browse");
        } else {
            // User is signed out
            dispatch(removeUser());
            navigate("/");
        }
        });
        
        //unsubscribed when components unmounts
        return () =>unsubscribe();
    },[])

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