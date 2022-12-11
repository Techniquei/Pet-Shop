import { useState } from 'react'

export function useProducts() {
  const [products, setProducts] = useState([])

  const loadAllProducts = async (token) => {
    const responce = await fetch('https://api.react-learning.ru/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const json = await responce.json()
    setProducts(await json.products)
  }

  const getAllProducts = () => products

  return {
    products,
    loadAllProducts,
    getAllProducts,
  }
}
