import { signOut } from "firebase/auth";
import { auth } from "../../configs/firebaseConfig";

const AuthDetails = ({authUser}) => {
  
    const userSignOut = () => {
      signOut(auth)
        .then(() => {
          console.log("sign out successful");
        })
        .catch((error) => console.log(error));
    };
  
    return (
      <div>
        {authUser ? (
          <>
            <p>{`Signed In as ${authUser.email}`}</p>
            <button onClick={userSignOut}>Sign Out</button>
          </>
        ) : (
          <p>Signed Out</p>
        )}
      </div>
    );
  };

export default AuthDetails;