import React, { useState } from 'react';
import { Terminal, Play, Plus, RefreshCw, Box, AlertTriangle, FileText } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
}

const INITIAL_ITEMS: Item[] = [
  { id: 'ITM-001', name: 'Dell Monitor 24"', category: 'Hardware', quantity: 12, price: 8500.00 },
  { id: 'ITM-002', name: 'Mechanical Keyboard', category: 'Peripherals', quantity: 4, price: 2450.00 },
  { id: 'ITM-003', name: 'USB-C Hub Multiport', category: 'Accessories', quantity: 25, price: 1200.00 },
  { id: 'ITM-004', name: 'Network Crimping Tool', category: 'Tools', quantity: 2, price: 750.00 },
];

export const InteractivePythonConsole: React.FC = () => {
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [activeTab, setActiveTab] = useState<'terminal' | 'code'>('terminal');
  const [newItemName, setNewItemName] = useState('');
  const [newItemCat, setNewItemCat] = useState('Hardware');
  const [newItemQty, setNewItemQty] = useState(10);
  const [newItemPrice, setNewItemPrice] = useState(1500);
  const [consoleLog, setConsoleLog] = useState<string[]>([
    'Python 3.11.4 (BU Polangui CS Lab Environment)',
    'Loaded inventory_tracker.py module.',
    'Reading stored records from inventory.json... Done (4 items loaded).',
    'Type option 1-5 or click action buttons below.'
  ]);

  const addLog = (msg: string) => {
    setConsoleLog(prev => [...prev.slice(-8), msg]);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName) return;
    const newId = `ITM-00${items.length + 1}`;
    const newItem: Item = {
      id: newId,
      name: newItemName,
      category: newItemCat,
      quantity: Number(newItemQty),
      price: Number(newItemPrice)
    };
    setItems(prev => [...prev, newItem]);
    addLog(`>>> [SUCCESS] Added Item #${newId}: '${newItemName}' | Qty: ${newItemQty} | Price: ₱${Number(newItemPrice).toFixed(2)}`);
    setNewItemName('');
  };

  const totalValue = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  const lowStockCount = items.filter(i => i.quantity <= 5).length;

  return (
    <div className="bg-[#1C0B0E] text-[#FAF6F0] rounded-lg p-5 border border-[#800020] shadow-xl my-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#800020]/60 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-[#D4AF37]" />
          <span className="font-serif-display text-lg font-bold text-[#FAF6F0]">Interactive Python Console Terminal</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`text-xs px-3 py-1 rounded font-mono-code transition-colors cursor-pointer ${
              activeTab === 'terminal' ? 'bg-[#800020] text-[#D4AF37]' : 'bg-[#2B080D] text-[#E2D7C7]'
            }`}
          >
            Terminal Simulator
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`text-xs px-3 py-1 rounded font-mono-code transition-colors cursor-pointer ${
              activeTab === 'code' ? 'bg-[#800020] text-[#D4AF37]' : 'bg-[#2B080D] text-[#E2D7C7]'
            }`}
          >
            OOP Class Logic
          </button>
        </div>
      </div>

      {activeTab === 'terminal' ? (
        <div>
          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 font-mono-code text-xs">
            <div className="bg-[#2B080D] p-3 rounded border border-[#800020]/60 flex items-center gap-2">
              <Box className="w-4 h-4 text-[#D4AF37]" />
              <div>
                <p className="text-[#E2D7C7]/70">Total Catalog Items</p>
                <p className="text-base font-bold text-[#FAF6F0]">{items.length} records</p>
              </div>
            </div>
            <div className="bg-[#2B080D] p-3 rounded border border-[#800020]/60 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <div>
                <p className="text-[#E2D7C7]/70">Low Stock Alert (&lt;=5)</p>
                <p className="text-base font-bold text-amber-300">{lowStockCount} items need reorder</p>
              </div>
            </div>
            <div className="bg-[#2B080D] p-3 rounded border border-[#800020]/60 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="text-[#E2D7C7]/70">Total Asset Valuation</p>
                <p className="text-base font-bold text-emerald-300">₱{totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>

          {/* Terminal Console Output */}
          <div className="bg-black/90 p-3.5 rounded border border-[#800020]/60 font-mono-code text-xs text-emerald-400 mb-4 h-36 overflow-y-auto">
            {consoleLog.map((log, idx) => (
              <p key={idx} className={log.includes('[SUCCESS]') ? 'text-emerald-300 font-bold' : 'text-[#E2D7C7]/80'}>
                {log}
              </p>
            ))}
          </div>

          {/* Interactive Action - Add Item Form */}
          <form onSubmit={handleAddItem} className="bg-[#2B080D] p-3.5 rounded border border-[#800020]/60 mb-4 font-sans-ui">
            <p className="text-xs font-semibold text-[#D4AF37] mb-2 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Simulate Python Menu Option #1: Add New Asset Record
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-2">
              <input
                type="text"
                placeholder="Item Name"
                value={newItemName}
                onChange={e => setNewItemName(e.target.value)}
                className="bg-[#1C0B0E] border border-[#800020] text-xs p-2 rounded text-[#FAF6F0] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                required
              />
              <select
                value={newItemCat}
                onChange={e => setNewItemCat(e.target.value)}
                className="bg-[#1C0B0E] border border-[#800020] text-xs p-2 rounded text-[#FAF6F0] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              >
                <option value="Hardware">Hardware</option>
                <option value="Peripherals">Peripherals</option>
                <option value="Accessories">Accessories</option>
                <option value="Tools">Tools</option>
              </select>
              <input
                type="number"
                placeholder="Qty"
                value={newItemQty}
                onChange={e => setNewItemQty(Number(e.target.value))}
                className="bg-[#1C0B0E] border border-[#800020] text-xs p-2 rounded text-[#FAF6F0] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              />
              <input
                type="number"
                placeholder="Price (₱)"
                value={newItemPrice}
                onChange={e => setNewItemPrice(Number(e.target.value))}
                className="bg-[#1C0B0E] border border-[#800020] text-xs p-2 rounded text-[#FAF6F0] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#800020] hover:bg-[#A3283B] text-[#FAF6F0] text-xs font-semibold px-3 py-1.5 rounded transition-colors cursor-pointer"
            >
              Execute Python Add Record
            </button>
          </form>

          {/* Current Inventory Table */}
          <div className="overflow-x-auto rounded border border-[#800020]/60">
            <table className="w-full text-left text-xs font-mono-code">
              <thead className="bg-[#4A0E17] text-[#D4AF37]">
                <tr>
                  <th className="p-2 border-b border-[#800020]">ID</th>
                  <th className="p-2 border-b border-[#800020]">Name</th>
                  <th className="p-2 border-b border-[#800020]">Category</th>
                  <th className="p-2 border-b border-[#800020] text-right">Quantity</th>
                  <th className="p-2 border-b border-[#800020] text-right">Unit Price</th>
                  <th className="p-2 border-b border-[#800020] text-right">Total Val</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#800020]/40 bg-[#1C0B0E]">
                {items.map(item => (
                  <tr key={item.id} className="hover:bg-[#2B080D]">
                    <td className="p-2 text-[#D4AF37]">{item.id}</td>
                    <td className="p-2 text-[#FAF6F0]">{item.name}</td>
                    <td className="p-2 text-[#E2D7C7]/80">{item.category}</td>
                    <td className={`p-2 text-right font-bold ${item.quantity <= 5 ? 'text-amber-400' : 'text-[#FAF6F0]'}`}>
                      {item.quantity} {item.quantity <= 5 && '⚠️'}
                    </td>
                    <td className="p-2 text-right text-[#FAF6F0]">₱{item.price.toFixed(2)}</td>
                    <td className="p-2 text-right text-emerald-300 font-bold">₱{(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-[#1C0B0E] p-4 rounded border border-[#800020]/60 font-mono-code text-xs text-[#E2D7C7] overflow-x-auto">
          <pre className="text-[#D4AF37]">
{`class InventoryTracker:
    """
    Python OOP Inventory Manager developed by Karl David Z. Ocfemia
    Demonstrates file I/O, OOP encapsulation, and CLI menu.
    """
    def __init__(self, filename="inventory.json"):
        self.filename = filename
        self.items = self.load_from_file()

    def add_item(self, item_id, name, category, quantity, price):
        new_item = {
            "id": item_id,
            "name": name,
            "category": category,
            "quantity": int(quantity),
            "price": float(price)
        }
        self.items.append(new_item)
        self.save_to_file()
        print(f"Successfully added {name} to inventory.")

    def save_to_file(self):
        import json
        with open(self.filename, "w") as f:
            json.dump(self.items, f, indent=4)`}
          </pre>
        </div>
      )}
    </div>
  );
};
