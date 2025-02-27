import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const BackToHomeButton = () => {
  const navigation = useNavigation();
  const [isHovered, setIsHovered] = useState(false);

  const handlePress = () => {
    navigation.navigate('home');
  };

  return (
    <Pressable
      style={[styles.button, isHovered && styles.hovered]}
      onPress={handlePress}
      onPressIn={() => setIsHovered(true)}
      onPressOut={() => setIsHovered(false)}
    >
      <Icon name="arrow-back" size={24} color="#fff" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#28A745',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  hovered: {
    backgroundColor: '#218838',
  },
});

export default BackToHomeButton;
