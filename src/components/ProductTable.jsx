const ProductTable = ({ products, onTitleChange }) => {
  return (
    <table
      border="1"
      cellPadding="8"
      cellSpacing="0"
      style={{ width: '100%', borderCollapse: 'collapse' }}
    >
      <thead style={{ backgroundColor: '#f0f0f0' }}>
        <tr>
          <th>Title</th>
          <th>Brand</th>
          <th>Category</th>
          <th>Price</th>
          <th>Rating</th>
        </tr>
      </thead>

      <tbody>
        {products.map(item => (
          <tr key={item.id}>
            <td>
              <input
                type="text"
                value={item.title}
                onChange={(e) =>
                  onTitleChange(item.id, e.target.value)
                }
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  padding: '4px'
                }}
              />
            </td>
            <td>{item.brand}</td>
            <td>{item.category}</td>
            <td>{item.price}</td>
            <td>{item.rating}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProductTable
