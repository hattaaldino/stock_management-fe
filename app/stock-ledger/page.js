'use client';
import { useEffect, useState } from 'react';
import { fetchData } from '../api/api';
import Table from '../components/Table';

export default function StockLedgerPage() {
  const [ledger, setLedger] = useState([]);

  useEffect(() => {
    fetchData('/stock-ledger/list').then((data) => setLedger(data.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Stock Ledger</h1>
      <Table
        headers={['Item Code', 'Batch ID', 'Tanggal', 'Last Stock', 'Quantity IN', 'Quantity OUT', 'Current Stock']}
        columns={['item_code', 'batch_id', 'tanggal', 'last_stock', 'qty_in', 'qty_out', 'current_stock']}
        data={ledger}
      />
    </div>
  );
}
