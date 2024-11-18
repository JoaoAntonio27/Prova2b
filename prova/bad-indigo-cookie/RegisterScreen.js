import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { supabase } from './supabaseClient';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    setLoading(true);


    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profile')
        .insert([
          {
            email,
            senha: password,
          },
        ]);

      if (error) {
        Alert.alert('Erro', 'Erro ao registrar na tabela de alunos.');
        setLoading(false);
        return;
      }

      Alert.alert('Sucesso', 'Dados registrados com sucesso!');
      navigation.navigate('Login');
      setLoading(false);
    } catch (error) {
      console.error('Erro inesperado:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
      setLoading(false);
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
      <Button title="Registrar" onPress={handleSignUp} />
      <Button
        title="Já tenho uma conta"
        onPress={() => navigation.navigate('LoginScreen')}
        color="gray"
      />
    </View>
  );
};

export default RegisterScreen;
