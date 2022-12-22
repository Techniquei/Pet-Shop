// export const PRODUCTS_QUERY_KEY = 'PRODUCTS_QUERY_KEY'

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzkwZDg3YzU5Yjk4YjAzOGY3NzlkZTMiLCJncm91cCI6InNtOCIsImlhdCI6MTY3MTQ3NzU1MiwiZXhwIjoxNzAzMDEzNTUyfQ.kbdDBymac8dB-ydSwsBwvuBy-eeoQWK7BRK_u1J0vDI'

export function useProducts() {
  // const [products, setProducts] = useState([])

  // const { data: products } = useQuery({
  //   queryKey: PRODUCTS_QUERY_KEY,
  //   queryFn: () => fetch('https://api.react-learning.ru/products', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }).then((res) => res.json()),
  // })

  // const loadAllProducts = async (token) => {
  //   const responce = await fetch('https://api.react-learning.ru/products', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   const json = await responce.json()
  //   setProducts(await json.products)
  // }

  // const getAllProducts = () => products

  return {
    // products,
    // loadAllProducts,
    // getAllProducts,
  }
}
