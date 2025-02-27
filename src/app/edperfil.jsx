import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '@/src/firebase/firebase';
import { updatePassword, deleteUser } from 'firebase/auth';

const EditPerfilScreen = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
  });
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserInfo({
        name: user.displayName || 'Usuário',
        email: user.email || 'Email não disponível',
      });
    }
  }, []);

  const handleChangePassword = () => {
    if (newPassword.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    const user = auth.currentUser;
    if (user) {
      updatePassword(user, newPassword)
        .then(() => {
          Alert.alert('Sucesso', 'Senha alterada com sucesso!');
          setNewPassword('');
        })
        .catch((error) => {
          Alert.alert('Erro', 'Não foi possível alterar a senha.');
        });
    }
  };

  const handleDeleteAccount = () => {
    const user = auth.currentUser;
    if (user) {
      deleteUser(user)
        .then(() => {
          Alert.alert('Sucesso', 'Conta excluída com sucesso!');
          // Navegar para a tela de login após excluir a conta.
        })
        .catch((error) => {
          Alert.alert('Erro', 'Não foi possível excluir a conta.');
        });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <View style={styles.profileContainer}>
        <Text style={styles.profileInfo}>Nome: {userInfo.name}</Text>
        <Text style={styles.profileInfo}>E-mail: {userInfo.email}</Text>
      </View>

      <View style={styles.passwordContainer}>
        <Text style={styles.inputLabel}>Nova Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a nova senha"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Alterar Senha</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.deleteAccountButton} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Excluir Conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  profileContainer: {
    marginBottom: 30,
  },
  profileInfo: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  passwordContainer: {
    marginBottom: 40,
  },
  inputLabel: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  changePasswordButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  deleteAccountButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
}
export default EditPerfilScreen;
