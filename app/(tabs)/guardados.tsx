import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, Trash2 } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useApp } from '@/providers/AppProvider';

export default function SavedScreen() {
  const router = useRouter();
  const { savedProducts, products, toggleSavedProduct } = useApp();

  const savedItems = products.filter(p => savedProducts.includes(p.nombre));

  const renderItem = ({ item }: { item: typeof products[0] }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.nombre } })}
    >
      <Image source={{ uri: item.imagen_url }} style={styles.image} />
      <View style={styles.info}>
        <View>
          <Text style={styles.category}>{item.categoria}</Text>
          <Text style={styles.name}>{item.nombre}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleSavedProduct(item.nombre)} style={styles.removeButton}>
          <Trash2 size={20} color={Colors.textLight} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Guardados</Text>
      </View>
      
      <FlatList
        data={savedItems}
        renderItem={renderItem}
        keyExtractor={item => item.nombre}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Heart size={48} color={Colors.border} />
            <Text style={styles.emptyTitle}>Aún no tienes favoritos</Text>
            <Text style={styles.emptyText}>Guarda los productos que más te gusten para encontrarlos fácilmente.</Text>
            <TouchableOpacity 
              style={styles.browseButton}
              onPress={() => router.push('/(tabs)/catalogo')}
            >
              <Text style={styles.browseButtonText}>Explorar catálogo</Text>
            </TouchableOpacity>
          </View>
        }
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
    fontSize: 28,
    color: Colors.primary,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  info: {
    flex: 1,
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
  },
  removeButton: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.textLight,
    lineHeight: 22,
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  browseButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
