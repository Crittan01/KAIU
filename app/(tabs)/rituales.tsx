import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { useApp } from '@/providers/AppProvider';

export default function RitualsScreen() {
  const { rituals } = useApp();
  const router = useRouter();

  const renderRitualItem = ({ item }: { item: typeof rituals[0] }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => router.push({ pathname: '/ritual/[id]', params: { id: item.titulo } })}
    >
      <Image source={{ uri: item.imagen_url }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.cardTitle}>{item.titulo}</Text>
        <Text style={styles.cardSummary}>{item.resumen}</Text>
        <Text style={styles.cardBody} numberOfLines={3}>{item.contenido}</Text>
        
        <View style={styles.footer}>
          <Text style={styles.relatedLabel}>Usar con:</Text>
          <Text style={styles.relatedProduct}>{item.productos_relacionados}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rituales</Text>
        <Text style={styles.subtitle}>Momentos de conexión</Text>
      </View>
      
      <FlatList
        data={rituals}
        renderItem={renderRitualItem}
        keyExtractor={item => item.titulo}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'android' ? 40 : 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    color: Colors.primary,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 22,
    color: Colors.primary,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
    fontWeight: '600',
    marginBottom: 8,
  },
  cardSummary: {
    fontSize: 14,
    color: Colors.accent,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  cardBody: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  relatedLabel: {
    fontSize: 12,
    color: Colors.textLight,
    marginRight: 6,
  },
  relatedProduct: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
});
