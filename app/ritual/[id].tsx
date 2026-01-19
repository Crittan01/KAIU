import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ArrowLeft, Clock } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useApp } from '@/providers/AppProvider';



export default function RitualDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { rituals, products } = useApp();
  
  // Find ritual by title (using id param as title for now)
  const ritual = rituals.find(r => r.titulo === id);

  if (!ritual) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Ritual no encontrado</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const relatedProduct = products.find(p => p.nombre === ritual.productos_relacionados || ritual.productos_relacionados.includes(p.nombre));

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header Image */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: ritual.imagen_url }} style={styles.image} />
            <View style={styles.overlay} />
            <TouchableOpacity style={styles.headerBackButton} onPress={() => router.back()}>
              <ArrowLeft color={Colors.white} size={24} />
            </TouchableOpacity>
            
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>{ritual.titulo}</Text>
              <Text style={styles.headerSubtitle}>{ritual.resumen}</Text>
            </View>
          </View>

          {/* Content */}
          <View style={styles.contentContainer}>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Clock size={16} color={Colors.accent} />
                <Text style={styles.metaText}>5-10 min</Text>
              </View>
            </View>

            <Text style={styles.bodyText}>{ritual.contenido}</Text>
            
            {/* If there's a long content, we would render more paragraphs here. 
                For now, simulating content structure. */}
            <Text style={styles.bodyText}>
              Recuerda que este momento es para ti. No hay prisa, solo presencia. 
              Siente cómo los aromas transforman el ambiente y tu estado de ánimo.
            </Text>

            {relatedProduct && (
              <View style={styles.relatedContainer}>
                <Text style={styles.relatedTitle}>Para este ritual necesitas</Text>
                <TouchableOpacity 
                  style={styles.productCard}
                  onPress={() => router.push({ pathname: '/product/[id]', params: { id: relatedProduct.nombre } })}
                >
                  <Image source={{ uri: relatedProduct.imagen_url }} style={styles.productImage} />
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{relatedProduct.nombre}</Text>
                    <Text style={styles.productLink}>Ver producto</Text>
                  </View>
                  <ArrowLeft size={20} color={Colors.primary} style={{ transform: [{ rotate: '180deg' }] }} />
                </TouchableOpacity>
              </View>
            )}

            <View style={{ height: 60 }} />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: Colors.text,
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: Colors.primary,
    fontSize: 16,
  },
  imageContainer: {
    height: 400,
    width: '100%',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(46, 93, 79, 0.4)',
  },
  headerBackButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 20,
    padding: 8,
  },
  headerContent: {
    padding: 24,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 36,
    color: Colors.white,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 24,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    marginTop: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: Colors.textLight,
    fontSize: 14,
  },
  bodyText: {
    fontSize: 18,
    color: Colors.text,
    lineHeight: 30,
    marginBottom: 20,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  relatedContainer: {
    marginTop: 30,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
  },
  relatedTitle: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '600',
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  productLink: {
    fontSize: 14,
    color: Colors.textLight,
    textDecorationLine: 'underline',
  },
});
