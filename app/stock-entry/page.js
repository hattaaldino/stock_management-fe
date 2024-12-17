'use client';

import { useState, useEffect } from 'react';
import { fetchData, postData } from '../api/api';

export default function StockEntryPage() {
  const [stockType, setStockType] = useState('IN');
  const [items, setItems] = useState([]);
  const [details, setDetails] = useState([{ item_code: '', expiry_date: '', qty: 0 }]);
  const [stockEntries, setStockEntries] = useState([]);

  useEffect(() => {
    fetchData('/item/list')
      .then((data) => {
        setItems(data.data || []);
      })
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  // Fetch stock entries list from the backend
  const fetchStockEntries = () => {
    fetchData('/stock-entry/list')
      .then((data) => {
        setStockEntries(data.data || []);
      })
      .catch((error) => console.error('Error fetching stock entries:', error));
  };

  useEffect(() => {
    fetchStockEntries();
  }, []);

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...details];
    newDetails[index][field] = value;
    setDetails(newDetails);
  };

  const addDetailRow = () => {
    setDetails([...details, { item_code: '', expiry_date: '', qty: 0 }]);
  };

  const removeDetailRow = (index) => {
    const newDetails = details.filter((_, i) => i !== index);
    setDetails(newDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      type: stockType,
      details: details.map((detail) => ({
        item_code: detail.item_code,
        expiry_date: detail.expiry_date,
        qty: parseInt(detail.qty, 10), // Ensure qty is an integer
      })),
    };

    try {
      // Send POST request to add stock entry
      const response = await postData('/stock-entry/add', requestBody);
      alert('Stock entry added successfully!');
      
      // Reset form
      setDetails([{ item_code: '', expiry_date: '', qty: 0 }]);

      // Fetch updated stock entries
      fetchStockEntries();
    } catch (error) {
      console.error('Error submitting stock entry:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Stock Entry</h1>
      
      {/* Stock Entry Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Type Select */}
        <div>
          <label className="block mb-2">Type</label>
          <select
            value={stockType}
            onChange={(e) => setStockType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="IN">IN</option>
            <option value="OUT">OUT</option>
          </select>
        </div>

        {/* Details Section */}
        {details.map((detail, index) => (
          <div key={index} className="border p-4 rounded">
            <div className="flex space-x-4">
              {/* Item Select */}
              <div>
                <label className="block mb-2">Item</label>
                <select
                  value={detail.item_code}
                  onChange={(e) => handleDetailChange(index, 'item_code', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Item</option>
                  {items.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.name} ({item.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block mb-2">Expiry Date</label>
                <input
                  type="date"
                  value={detail.expiry_date}
                  onChange={(e) => handleDetailChange(index, 'expiry_date', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block mb-2">Quantity</label>
                <input
                  type="number"
                  value={detail.qty}
                  onChange={(e) => handleDetailChange(index, 'qty', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Remove Button */}
              <div>
                <button
                  type="button"
                  onClick={() => removeDetailRow(index)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Detail Row Button */}
        <button
          type="button"
          onClick={addDetailRow}
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          Add Detail
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded mt-4"
        >
          Submit Stock Entry
        </button>
      </form>

      {/* Stock Entries Table */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Stock Entries</h2>
        <table className="table w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Tanggal</th>
              <th className="border p-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {stockEntries.map((entry) => (
              <tr key={entry.id}>
                <td className="border p-2">{entry.id}</td>
                <td className="border p-2">{new Date(entry.tanggal).toLocaleDateString()}</td>
                <td className="border p-2">{entry.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



