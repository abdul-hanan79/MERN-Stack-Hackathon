import React, { useState } from 'react';
import SimpleButton from './ui/SimpleButton';

const ProductFilter = ({ products, onFilter }: any) => {
    const [category, setCategory] = useState('');
    const [minStock, setMinStock] = useState('');
    const [minPrice, setMinPrice] = useState('');

    const handleFilter = () => {
        // Convert minStock and minPrice to numbers
        const minStockValue = parseInt(minStock);
        const minPriceValue = parseFloat(minPrice);
        // Filter products based on the selected criteria
        const filteredProducts = products?.filter((product: any) => {
            let passCategory = true;
            let passStock = true;
            let passPrice = true;
            // Check category filter
            if (category !== '' && product.category !== category) {
                passCategory = false;
            }
            // Check stock filter
            if (!isNaN(minStockValue) && product.stock < minStockValue) {
                passStock = false;
            }
            // Check price filter
            if (!isNaN(minPriceValue) && product.price < minPriceValue) {
                passPrice = false;
            }
            return passCategory && passStock && passPrice;
        });
        // Call the callback function with the filtered products
        onFilter(filteredProducts);
    };

    return (
        <div className="p-4 bg-gray-200 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Filter Products</h2>
            <div className='flex'>
                <div className="mb-4">
                    <select
                        id="category"
                        className="w-full py-2 px-3 border rounded-md"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All Category</option>
                        <option value="clothes">Clothes</option>
                        <option value="shoes">Shoes</option>
                        <option value="accessories">Accessories</option>
                    </select>
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        id="minStock"
                        className="w-full py-2 px-3 border rounded-md"
                        placeholder="Enter min stock"
                        value={minStock}
                        onChange={(e) => setMinStock(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        id="minPrice"
                        className="w-full py-2 px-3 border rounded-md"
                        placeholder="Enter min price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </div>
                <SimpleButton
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                    onClick={handleFilter} title="filter"
                />

            </div>
        </div>
    );
};

export default ProductFilter;
