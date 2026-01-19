import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/colors';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Info</Text>
      <View style={styles.separator} />
      <Text style={styles.text}>Kaiu - Cosmética Natural</Text>
      <Text style={styles.subtext}>Versión 1.0.0</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: Colors.border,
  },
  text: {
    fontSize: 18,
    color: Colors.text,
    marginBottom: 10,
  },
  subtext: {
    fontSize: 14,
    color: Colors.textLight,
  },
});
