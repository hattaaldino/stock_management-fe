'use client';

import { useState, useEffect } from 'react';
import { fetchData, postData } from '../api/api';
import Table from '../components/Table';

export default function ItemsPage() {
  const [form, setForm] = useState({ name: '', uom: '' });
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData('/item/list').then((data) => setItems(data.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postData('/item/add', form);
    fetchData('/item/list').then((data) => setItems(data.data));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Item Management</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block font-semibold">UOM</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={form.uom}
            onChange={(e) => setForm({ ...form, uom: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Item</button>
      </form>

      <div className="mt-6">
        <Table 
            headers={['Item Code', 'Name', 'UOM']}
            columns={['code', 'name', 'uom']} 
            data={items} 
        />
      </div>
    </div>
  );
}
