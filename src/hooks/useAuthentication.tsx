import {useState} from 'react';
import {UserBase} from '../types/store';
import {Login} from '../controls/API/UserAPIControl';
import {saveToken} from '../store/storage';

const useAuthentication = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authenticateUser = async (userData: UserBase) => {
    setLoading(true);
    setError(null);

    try {
      console.log('hi');
      const res = await Login(userData);
      console.log('res', res);

      if (res.access_token && res.refresh_token) {
        await saveToken('access_token', res.access_token);
        await saveToken('refresh_token', res.refresh_token);
      }

      setLoading(false);
      return res;
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'An error occurred during authentication');
      throw new Error(err.message || 'Authentication failed');
    }
  };

  return {
    authenticateUser,
    loading,
    error,
  };
};

export default useAuthentication;
