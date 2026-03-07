import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from '@react-native-firebase/auth';
import { auth } from '../config/firebase';

export const authService = {
  // Register a new user
  register: async (email: string, password: string, displayName?: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    return userCredential.user;
  },

  // Sign in with email and password
  login: async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  // Sign out
  logout: async () => {
    await signOut(auth);
  },

  // Reset password
  resetPassword: async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  },
};

export default authService;
