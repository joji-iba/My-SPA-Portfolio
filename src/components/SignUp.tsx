import { signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, provider } from '../firebase';

// Googleサインイン
const SignInButton = () => {
  const signInWithGoogle = () => {
    // Googleでサインイン
    signInWithPopup(auth, provider);
  };

  return <button onClick={signInWithGoogle}>Googleでサインイン</button>;
};

// サインアウト
const SignOutButton = () => {
  return <button onClick={() => auth.signOut()}>サインアウト</button>;
};

// ユーザー情報
const UserInfo = () => {
  const currentUser = auth.currentUser;

  return (
    <>
      <div className="userInfo">
        {currentUser && (
          <div>
            <img src={auth.currentUser?.photoURL || ''} alt="" />
            <p>{auth.currentUser?.displayName || ''}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default function SignUp() {
  const [user] = useAuthState(auth); // アカウントの認識

  return (
    <>
      {user ? (
        // サインイン後に表示
        <div>
          <UserInfo />
          <SignOutButton />
        </div>
      ) : (
        // サインイン前に表示
        <SignInButton />
      )}
    </>
  );
}
