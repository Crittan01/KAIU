import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import { fetchProducts, fetchRituals } from '@/services/api';

export const [AppProvider, useApp] = createContextHook(() => {
  const [savedProducts, setSavedProducts] = useState<string[]>([]); // Store product names or IDs

  // Load saved products from storage
  useEffect(() => {
    AsyncStorage.getItem('saved_products').then((stored) => {
      if (stored) {
        try {
          setSavedProducts(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to parse saved products', e);
        }
      }
    });
  }, []);

  // Save to storage whenever savedProducts changes
  const toggleSavedProduct = async (productName: string) => {
    const isSaved = savedProducts.includes(productName);
    let newSaved;
    if (isSaved) {
      newSaved = savedProducts.filter((p) => p !== productName);
    } else {
      newSaved = [...savedProducts, productName];
    }
    setSavedProducts(newSaved);
    await AsyncStorage.setItem('saved_products', JSON.stringify(newSaved));
    return !isSaved; // Return new state
  };

  const isProductSaved = (productName: string) => savedProducts.includes(productName);

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const ritualsQuery = useQuery({
    queryKey: ['rituals'],
    queryFn: fetchRituals,
  });

  return {
    products: productsQuery.data ?? [],
    rituals: ritualsQuery.data ?? [],
    isLoading: productsQuery.isLoading || ritualsQuery.isLoading,
    refetch: () => {
      productsQuery.refetch();
      ritualsQuery.refetch();
    },
    savedProducts,
    toggleSavedProduct,
    isProductSaved,
  };
});
