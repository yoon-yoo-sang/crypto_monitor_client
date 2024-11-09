import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import useAuthentication from '../../hooks/useAuthentication';

const LoginScreen = () => {
  const navigation = useNavigation();
  const {authenticateUser} = useAuthentication();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1051998036237-6ksjgsbnh5s3jo2ap56bv5osgb5g5nhj.apps.googleusercontent.com',
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Firebase로 Google 인증
      await auth().signInWithCredential(googleCredential);

      const user = auth().currentUser;

      if (!user) {
        return;
      }

      await authenticateUser({
        socialId: user.uid,
        username: user.displayName || '',
        email: user.email || '',
      });

      // 로그인 성공 후 홈 화면으로 이동
      navigation.navigate('Home');
    } catch (error) {
      console.error('Google Login Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.logoText}>Copamine</Text>
        <Text style={styles.subtitle}>코인으로 스트레스를 날려버리세요!</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleLogin}>
            <Text style={styles.buttonText}>구글 계정으로 계속하기</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.orText}>or</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  googleButton: {
    backgroundColor: '#4F61FF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  facebookButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 15,
    color: '#888',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#4F61FF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#000',
  },
  linkText: {
    color: '#4F61FF',
    fontWeight: '600',
  },
});

export default LoginScreen;
