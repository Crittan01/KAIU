import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Linking, Platform, Modal, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ArrowLeft, Heart, MessageCircle, ShoppingBag, Bookmark } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useApp } from '@/providers/AppProvider';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { products, toggleSavedProduct, isProductSaved } = useApp();
  const [modalVisible, setModalVisible] = useState(false);
  
  const product = products.find(p => p.nombre === id);
  
  // Parse variants if available, otherwise default
  const variants = product?.variantes ? product.variantes.split(',').map(v => v.trim()) : ['Standard'];
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  const isSaved = product ? isProductSaved(product.nombre) : false;

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Producto no encontrado</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleWhatsApp = () => {
    const phone = "+521234567890"; // Replace with real number
    const text = `¡Hola! Quiero comprar ${product.nombre} en tamaño ${selectedVariant}.`;
    const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(text)}`;
    
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Error", "WhatsApp no está instalado en este dispositivo.");
      }
    });
    setModalVisible(false);
  };

  const handleMercadoLibre = () => {
    if (product.enlace_ml) {
      Linking.openURL(product.enlace_ml);
    }
    setModalVisible(false);
  };

  const handleSave = () => {
    toggleSavedProduct(product.nombre);
    setModalVisible(false);
    // Optional: Show toast
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header Image */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: product.imagen_url }} style={styles.image} />
            <TouchableOpacity style={styles.headerBackButton} onPress={() => router.back()}>
              <ArrowLeft color={Colors.white} size={24} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.contentContainer}>
            <View style={styles.headerRow}>
              <View style={styles.categoryTag}>
                <Text style={styles.categoryText}>{product.categoria}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleSavedProduct(product.nombre)}>
                <Heart 
                  color={isSaved ? Colors.error : Colors.textLight} 
                  fill={isSaved ? Colors.error : 'transparent'} 
                  size={24} 
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>{product.nombre}</Text>
            
            <View style={styles.benefitsContainer}>
              {product.beneficios.split(',').map((benefit, index) => (
                <View key={index} style={styles.benefitTag}>
                  <Text style={styles.benefitText}>{benefit.trim()}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Descripción</Text>
            <Text style={styles.description}>{product.descripcion}</Text>

            <Text style={styles.sectionTitle}>Tamaño</Text>
            <View style={styles.variantsContainer}>
              {variants.map((variant) => (
                <TouchableOpacity
                  key={variant}
                  style={[
                    styles.variantButton,
                    selectedVariant === variant && styles.variantButtonActive
                  ]}
                  onPress={() => setSelectedVariant(variant)}
                >
                  <Text style={[
                    styles.variantText,
                    selectedVariant === variant && styles.variantTextActive
                  ]}>
                    {variant}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Extra spacing for bottom bar */}
            <View style={{ height: 100 }} />
          </View>
        </ScrollView>

        {/* Bottom Action Bar */}
        <View style={styles.bottomBar}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.actionButtonText}>Quiero este producto</Text>
          </TouchableOpacity>
        </View>

        {/* Purchase Options Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Opciones de compra</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.modalSubtitle}>¿Cómo deseas adquirir {product.nombre}?</Text>

              <TouchableOpacity style={styles.modalOption} onPress={handleWhatsApp}>
                <View style={[styles.iconCircle, { backgroundColor: '#E0F2F1' }]}>
                  <MessageCircle color="#25D366" size={24} />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>Pedir por WhatsApp</Text>
                  <Text style={styles.optionDesc}>Atención personalizada</Text>
                </View>
                <ArrowLeft size={20} color={Colors.textLight} style={{ transform: [{ rotate: '180deg' }] }} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalOption} onPress={handleMercadoLibre}>
                <View style={[styles.iconCircle, { backgroundColor: '#FFF8E1' }]}>
                  <ShoppingBag color="#FFD700" size={24} />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>Ver en Mercado Libre</Text>
                  <Text style={styles.optionDesc}>Compra segura y envíos</Text>
                </View>
                <ArrowLeft size={20} color={Colors.textLight} style={{ transform: [{ rotate: '180deg' }] }} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalOption} onPress={handleSave}>
                 <View style={[styles.iconCircle, { backgroundColor: '#FCE4EC' }]}>
                  <Bookmark color={Colors.primary} size={24} />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>{isSaved ? "Quitar de mi lista" : "Guardar en mi lista"}</Text>
                  <Text style={styles.optionDesc}>Para decidir después</Text>
                </View>
                <ArrowLeft size={20} color={Colors.textLight} style={{ transform: [{ rotate: '180deg' }] }} />
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
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
    height: 350,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  headerBackButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 8,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryTag: {
    backgroundColor: 'rgba(46, 93, 79, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  categoryText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 32,
    color: Colors.primary,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
    fontWeight: 'bold',
    marginBottom: 16,
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  benefitTag: {
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  benefitText: {
    color: Colors.textLight,
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 26,
    marginBottom: 24,
  },
  variantsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  variantButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  variantButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  variantText: {
    color: Colors.text,
    fontWeight: '500',
  },
  variantTextActive: {
    color: Colors.white,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  actionButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  closeText: {
    color: Colors.textLight,
    fontSize: 14,
  },
  modalSubtitle: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 24,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  optionDesc: {
    fontSize: 13,
    color: Colors.textLight,
  },
});
