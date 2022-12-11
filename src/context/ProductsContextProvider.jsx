import { createContext, useContext } from 'react'
import { useProducts } from './useProducts'

const ProductsContext = createContext()

export function ProductsContextProvider({ children }) {
  const productsData = useProducts()

  return (
    <ProductsContext.Provider value={productsData}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => useContext(ProductsContext)
