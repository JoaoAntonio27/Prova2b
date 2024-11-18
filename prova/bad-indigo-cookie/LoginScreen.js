import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { supabase } from './supabaseClient';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profile')
        .select('*')
        .eq('email', email)
        .eq('senha', password);

      if (error) {
        setErrorMessage('Ocorreu um erro ao verificar suas credenciais.');
        return;
      }

      if (data && data.length > 0) {
        navigation.navigate('Main');
      } else {
        setErrorMessage('Email ou senha inválidos. Por favor, verifique suas credenciais.');
      }
    } catch (error) {
      setErrorMessage('Ocorreu um erro inesperado. Tente novamente.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
      />
      <Text>Senha:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
        value={password}
        onChangeText={setPassword}
        placeholder="Digite sua senha"
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />
      <Button
        title="Cadastrar-se"
        onPress={() => navigation.navigate('RegisterScreen')}
        color="gray"
      />

      
      {errorMessage ? (
        <Text style={{ color: 'red', marginTop: 10 }}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

export default LoginScreen;

