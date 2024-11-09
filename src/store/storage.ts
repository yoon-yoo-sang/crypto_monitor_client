import EncryptedStorage from 'react-native-encrypted-storage';

export const saveToken = async (key: string, value: string) => {
  try {
    await EncryptedStorage.setItem(key, value);
  } catch (error) {
    console.error('Failed to save token', error);
  }
};

export const getToken = async (key: string) => {
  try {
    const token = await EncryptedStorage.getItem(key);
    return token;
  } catch (error) {
    console.error('Failed to get token', error);
    return null;
  }
};

export const removeToken = async (key: string) => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to remove token', error);
  }
};
