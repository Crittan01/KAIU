// Remove unused imports
import { MOCK_PRODUCTS, MOCK_RITUALS, Product, Ritual } from '@/mocks/data';

// Replace with your actual SheetDB ID
// const SHEETDB_ID = 'YOUR_SHEETDB_ID'; 
// const BASE_URL = `https://sheetdb.io/api/v1/${SHEETDB_ID}`;

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    // In a real scenario, we would fetch from the API
    // const response = await fetch(`${BASE_URL}/catalogo`);
    // if (!response.ok) throw new Error('Failed to fetch products');
    // return await response.json();
    
    // For now, return mock data to ensure the app works immediately
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_PRODUCTS;
  } catch (error) {
    console.warn('Error fetching products, using mock data:', error);
    return MOCK_PRODUCTS;
  }
};

export const fetchRituals = async (): Promise<Ritual[]> => {
  try {
    // const response = await fetch(`${BASE_URL}/rituales`);
    // if (!response.ok) throw new Error('Failed to fetch rituals');
    // return await response.json();

    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_RITUALS;
  } catch (error) {
    console.warn('Error fetching rituals, using mock data:', error);
    return MOCK_RITUALS;
  }
};
