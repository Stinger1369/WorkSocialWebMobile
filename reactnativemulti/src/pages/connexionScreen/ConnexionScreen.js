import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DisplayURL from '../../utils/DisplayURL';
import {hostname} from '../../components/HostnameConnect/Hostname';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../../utils/useConnecte';
import VerificationCodeModal from '../../components/VerificationCodeModal/VerificationCodeModal';

const styles =
  Platform.OS === 'web'
    ? require('./styles.web').default
    : require('./styles.mobile').default;

const ConnexionScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // État pour gérer la visibilité du modal
  const navigation = useNavigation();
  const {login} = useAuth();

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${hostname}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.user.emailVerified) {
          // L'email a été vérifié, continuer la connexion
          const {authToken, user} = data;
          login(authToken, user.User_ID.toString()); // Mise à jour de l'état global
          await AsyncStorage.setItem('userToken', authToken);
          await AsyncStorage.setItem('userId', user.User_ID.toString());
          await AsyncStorage.setItem('username', user.Username);
          await AsyncStorage.setItem('firstName', user.FirstName);
          await AsyncStorage.setItem('user', JSON.stringify(user));
          setIsSubmitted(true);
          navigation.navigate('HomeScreen');
        } else {
          // L'email n'a pas été vérifié
          setModalVisible(true); // Afficher le modal en cas d'erreur de connexion
        }
      } else {
        // Gestion des erreurs de connexion
        setErrorMessages({
          name: 'pass',
          message: data.message || 'Erreur de connexion',
        });
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setErrorMessages({
        name: 'pass',
        message: 'Une erreur est survenue lors de la tentative de connexion.',
      });
    }
  };

  const requestNewVerificationCode = async email => {
    // Implémentez la logique pour demander un nouveau code
    console.log('Demande de nouveau code pour:', email);
    // Fermez le modal après la demande
    setModalVisible(false);
  };

  const renderErrorMessage = name =>
    name === errorMessages.name && (
      <Text style={styles.errorMessage}>{errorMessages.message}</Text>
    );

  return (
    <View style={styles.container}>
      <DisplayURL style={styles.urlText} />
      <Text style={styles.title}>Page de Connexion</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry={true}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      {renderErrorMessage('pass')}
      <Button title="Connexion" onPress={handleSubmit} />
      <TouchableOpacity
        onPress={() => navigation.navigate('InscriptionScreen')}>
        <Text>Vous n'avez pas de compte ? Inscrivez-vous</Text>
      </TouchableOpacity>
      {isSubmitted && <Text>Connexion réussie !!</Text>}
      {/* Affichage du modal en cas d'erreur de connexion */}
      <VerificationCodeModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onResendCode={requestNewVerificationCode}
      />
    </View>
  );
};

export default ConnexionScreen;
