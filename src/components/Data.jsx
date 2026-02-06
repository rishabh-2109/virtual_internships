import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import ProductTable from './ProductTable'

const LIMIT = 20

const Data = () => {
  const [products, setProducts] = useState([])
  const [skip, setSkip] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loaderRef = useRef(null)

  const fetchData = async () => {
    if (loading || !hasMore) return

    try {
      setLoading(true)

      const res = await axios.get(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`
      )

      setProducts(prev => [...prev, ...res.data.products])
      setSkip(prev => prev + LIMIT)

      if (res.data.products.length < LIMIT) {
        setHasMore(false)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleTitleChange = (id, value) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, title: value } : p
      )
    )
  }

  useEffect(() => {
    fetchData()
  }, [])


  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchData()
        }
      },
      { threshold: 1 }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [loading, hasMore])

  return (
    <div style={{ margin: '10px' }}>
      <ProductTable
        products={products}
        onTitleChange={handleTitleChange}
      />

      <div ref={loaderRef} style={{ height: '20px' }} />

      {loading && <p>Loading more products...</p>}
      {!hasMore && <p>No more products</p>}
    </div>
  )
}

export default Data
