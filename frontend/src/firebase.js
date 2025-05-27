import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAwSuoEK_kfTsdKvG5Wund1o6C7qUF-CIE',
  authDomain: 'nextjs-portfolio-53ca9.firebaseapp.com',
  projectId: 'nextjs-portfolio-53ca9',
  storageBucket: 'nextjs-portfolio-53ca9.appspot.com',
  messagingSenderId: '711734396270',
  appId: '1:711734396270:web:0b7f327e899c935b75ad7f',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
