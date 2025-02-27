import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './app/login';
import HomeScreen from './app/home';
import CadastroScreen from './app/cadastro';
import HortasScreen from './app/Hortas';
import SuasHortasScreen from './app/minhashortas';
import PerfilScreen from './app/perfil';
import FavoritosScreen from './app/favoritos';
import Menu from './app/Menu';
import DetalhesScreen from './app/detalhes';
import EditPerfilScreen from './app/edperfil';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegação com Tabs
const UserTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Hortas" component={HortasScreen} />
      <Tab.Screen name="Suas Hortas" component={SuasHortasScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      <Tab.Screen name="Favoritos" component={FavoritosScreen} />
      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  );
};

// Navegação Principal
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="HomeTabs" component={UserTabs} />
        <Stack.Screen name="Detalhes" component={DetalhesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
