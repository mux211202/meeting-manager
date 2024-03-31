import { signOut } from "firebase/auth";
import { auth } from "../../configs/firebaseConfig";
import { USER_MEETINGS } from "../../configs/UserPageConfig";

const AuthDetails = ({ authUser }) => {
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem(USER_MEETINGS);
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {authUser ? <button onClick={userSignOut}>Sign Out</button> : null}
    </div>
  );
};

export default AuthDetails;
