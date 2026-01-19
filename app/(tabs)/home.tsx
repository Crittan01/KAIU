import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useApp } from '@/providers/AppProvider';



export default function HomeScreen() {
  const router = useRouter();
  const { rituals, products } = useApp();

  const featuredProduct = products[0];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2670&auto=format&fit=crop' }}
          style={styles.heroImage}
        />
        <LinearGradient
          colors={['transparent', 'rgba(46, 93, 79, 0.9)']}
          style={styles.heroGradient}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroSubtitle}>Rituales Diarios</Text>
            <Text style={styles.heroTitle}>Vuelve a lo esencial</Text>
            <TouchableOpacity 
              style={styles.heroButton}
              onPress={() => router.push('/(tabs)/catalogo')}
            >
              <Text style={styles.heroButtonText}>Explorar Colección</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      {/* Categories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explorar por Categoría</Text>
        <View style={styles.categoriesContainer}>
          <TouchableOpacity 
             style={styles.categoryCard}
             onPress={() => router.push({ pathname: '/(tabs)/catalogo', params: { category: 'Aceites Esenciales' } })}
          >
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=2670&auto=format&fit=crop' }} 
              style={styles.categoryImage} 
            />
            <View style={styles.categoryOverlay} />
            <Text style={styles.categoryText}>Aceites Esenciales</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => router.push({ pathname: '/(tabs)/catalogo', params: { category: 'Aceites Vegetales' } })}
          >
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=2535&auto=format&fit=crop' }} 
              style={styles.categoryImage} 
            />
            <View style={styles.categoryOverlay} />
            <Text style={styles.categoryText}>Aceites Vegetales</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Featured Rituals */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Rituales Destacados</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/rituales')}>
            <Text style={styles.seeAllText}>Ver todos</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.ritualsScroll}>
          {rituals.map((ritual, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.ritualCard}
              onPress={() => router.push({ pathname: '/ritual/[id]', params: { id: ritual.titulo } })}
            >
              <Image source={{ uri: ritual.imagen_url }} style={styles.ritualImage} />
              <View style={styles.ritualContent}>
                <Text style={styles.ritualTitle}>{ritual.titulo}</Text>
                <Text style={styles.ritualSummary} numberOfLines={2}>{ritual.resumen}</Text>
                <View style={styles.readMoreContainer}>
                  <Text style={styles.readMoreText}>Leer más</Text>
                  <ArrowRight size={16} color={Colors.primary} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Product */}
      {featuredProduct && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Elegido para ti</Text>
          <TouchableOpacity 
            style={styles.featuredProductCard}
            onPress={() => router.push({ pathname: '/product/[id]', params: { id: featuredProduct.nombre } })}
          >
            <Image source={{ uri: featuredProduct.imagen_url }} style={styles.featuredProductImage} />
            <View style={styles.featuredProductInfo}>
              <Text style={styles.featuredProductCategory}>{featuredProduct.categoria}</Text>
              <Text style={styles.featuredProductName}>{featuredProduct.nombre}</Text>
              <Text style={styles.featuredProductDesc} numberOfLines={2}>{featuredProduct.descripcion}</Text>
              <Text style={styles.featuredProductLink}>Ver detalles</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.footerSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroContainer: {
    height: 450,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: 24,
    paddingBottom: 40,
  },
  heroContent: {
    gap: 8,
  },
  heroSubtitle: {
    color: Colors.accent,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: Colors.white,
    fontSize: 36,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), // Using system serif
    fontWeight: 'bold',
    marginBottom: 16,
  },
  heroButton: {
    backgroundColor: Colors.white,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    color: Colors.primary,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
    fontWeight: '600',
    marginBottom: 16,
  },
  seeAllText: {
    color: Colors.textLight,
    fontSize: 14,
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  categoryCard: {
    flex: 1,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(46, 93, 79, 0.4)',
  },
  categoryText: {
    position: 'absolute',
    bottom: 16,
    left: 12,
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    width: '80%',
  },
  ritualsScroll: {
    paddingRight: 20,
    gap: 16,
  },
  ritualCard: {
    width: 260,
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 10,
  },
  ritualImage: {
    width: '100%',
    height: 140,
  },
  ritualContent: {
    padding: 16,
  },
  ritualTitle: {
    fontSize: 18,
    color: Colors.primary,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
    fontWeight: '600',
    marginBottom: 8,
  },
  ritualSummary: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
    marginBottom: 16,
  },
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  readMoreText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  featuredProductCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  featuredProductImage: {
    width: '100%',
    height: 200,
  },
  featuredProductInfo: {
    padding: 20,
  },
  featuredProductCategory: {
    color: Colors.accent,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  featuredProductName: {
    fontSize: 20,
    color: Colors.primary,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
    fontWeight: '600',
    marginBottom: 8,
  },
  featuredProductDesc: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 22,
    marginBottom: 16,
  },
  featuredProductLink: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  footerSpacing: {
    height: 100,
  }
});
