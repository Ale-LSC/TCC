import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Menu = ({ navigation }) => {
  return (
    <View style={styles.menu}>
      <TouchableOpacity onPress={() => navigation.navigate('home')}>
        <Text style={styles.menuItem}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('minhashortas')}>
        <Text style={styles.menuItem}>Minha Horta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('favoritos')}>
        <Text style={styles.menuItem}>Favoritos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Dicas')}>
        <Text style={styles.menuItem}>Dicas</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Perfíl')}>
        <Text style={styles.menuItem}>Perfíl</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuItem: { fontSize: 16, color: '#555' },
});

export default Menu;
