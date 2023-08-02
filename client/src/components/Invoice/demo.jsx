<table>
<thead>
    <tr>
        <th>Product Name</th>
        <th>HSN</th>
        <th>Price</th>
        <th>Unit</th>
        <th>Quantity</th>
        <th>Total Price</th>
        <th>Actions</th>
    </tr>
</thead>
<tbody>
    {selectedProducts.map((product) => (
        <tr key={product._id}>
            <td>{product.PName}</td>
            <td>{product.HSN}</td>
            <td>{product.price}</td>
            <td>{product.unit}</td>
            <td>
                <input
                    type="number"
                    value={product.quantity}
                    onChange={(event) => handleUpdateQuantity(product._id, event.target.value)}
                />
            </td>
            <td>{calculateProductTotal(product)}</td>
            <td>
                <button type="button" onClick={() => handleDeleteProduct(product._id)}>
                    Delete
                </button>
            </td>
        </tr>
    ))}
</tbody>
</table>