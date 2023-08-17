import React, { useCallback, useState } from "react"
import SearchResults from "./components/SearchResults";

type Product = { 
  id: number
  price: number 
  title: string
  priceFormatted: string
}

type ResultsProps = {
  products: Array<Product>
  totalPrice: string
}

function App() {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  })

  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<ResultsProps>({
    products: [],
    totalPrice: formatter.format(0)
  });

  
  const handleSearch:React.FormEventHandler = async (event) => {
    event.preventDefault()

    
    if(!search.trim()) {
      return;
    }
    const res = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await res.json()

    const products = data.map((product: Product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price)
      }
    })

    const totalPrice = formatter.format(data.reduce((total: number, product: Product) => total + product.price, 0))
    
    setResults({ products, totalPrice })
  }
  
  const addToWishList = useCallback(async (id: number) => {
    console.log(id)
  }, [])

  return (
    <>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input 
        type="text" 
        value={search} 
        onChange={e => setSearch(e.target.value)}/>

        <button type="submit">Buscar</button>
      </form>

      <SearchResults results={results.products} totalPrice={results.totalPrice} onAddToWishList={addToWishList}/>
    </>
  )
}

export default App
