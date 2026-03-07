import { useState, useEffect } from 'react';
import { onAuthStateChanged, FirebaseAuthTypes } from '@react-native-firebase/auth';
import { auth } from '../config/firebase';
import { AuthState } from '../types';

const useAuth = (): AuthState => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user: FirebaseAuthTypes.User | null) => {
        setState({
          user: user
            ? {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
              }
            : null,
          loading: false,
          error: null,
        });
      }
    );

    return () => unsubscribe();
  }, []);

  return state;
};

export default useAuth;
