import React from 'react';
import { StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import { MessageCircle } from 'lucide-react-native';

export const GlobalWhatsAppButton = () => {
  const handlePress = () => {
    const phone = "+521234567890";
    const text = "¡Hola! Estoy desde la app de Kaiu. ¿En qué puedo ayudarte?";
    const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(text)}`;
    
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <MessageCircle color="#FFFFFF" size={28} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 100 : 80, // Above tab bar
    right: 20,
    backgroundColor: '#25D366',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    zIndex: 1000,
  },
});
