import React, { useState, useMemo } from "react";

function formatIDR(n) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Math.round(n || 0));
}

export default function App() {
  const [modal, setModal] = useState(50000);
  const [naikkan, setNaikkan] = useState(80000);
  const [diskon, setDiskon] = useState(10);

  const result = useMemo(() => {
    const m = Number(modal) || 0;
    const n = Number(naikkan) || 0;
    const d = Number(diskon) || 0;

    // harga jual sebelum diskon
    const hargaNaik = n;
    const hargaDiskon = hargaNaik - hargaNaik * (d / 100);

    // Marketplace formulas
    const shopee = m + m * 0.08 + m * 0.06 + 1250;
    const tiktok = m + m * 0.01 + 1000;
    const blibli = m + m * 0.105;
    const lazada = m + m * 0.062 + m * 0.018;

    return {
      hargaDiskon,
      shopee,
      tiktok,
      blibli,
      lazada,
      profitShopee: hargaDiskon - shopee,
      profitTiktok: hargaDiskon - tiktok,
      profitBlibli: hargaDiskon - blibli,
      profitLazada: hargaDiskon - lazada,
    };
  }, [modal, naikkan, diskon]);

  const CardMarketplace = ({ name, color, textColor, harga, profit }) => (
    <div
      className="rounded-xl p-4"
      style={{ backgroundColor: color, color: textColor }}
    >
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-sm">Harga Minimal Aman</p>
      <p className="font-semibold">{formatIDR(harga)}</p>
      <p className="text-sm mt-2">Keuntungan</p>
      <p
        className="font-bold"
        style={{ color: profit >= 0 ? "lime" : "red" }}
      >
        {profit >= 0
          ? formatIDR(profit)
          : `- ${formatIDR(Math.abs(profit))}`}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Header */}
      <header className="text-center py-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide drop-shadow">
          💡 Kalkulator Seller Marketplace
        </h1>
        <p className="text-indigo-100 mt-2">
          Hitung Harga Aman & Keuntungan di Berbagai Marketplace
        </p>
      </header>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Input */}
        <div className="card space-y-4 bg-white shadow-lg rounded-2xl p-6">
          <div>
            <label className="label">Modal</label>
            <input
              className="input"
              inputMode="numeric"
              value={modal}
              onChange={(e) => setModal(e.target.value)}
              placeholder="e.g. 50000"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Naikkan Harga</label>
              <input
                className="input"
                inputMode="numeric"
                value={naikkan}
                onChange={(e) => setNaikkan(e.target.value)}
                placeholder="isi harga jual/ harga coret"
              />
            </div>
            <div>
              <label className="label">Diskon %</label>
              <input
                className="input"
                inputMode="numeric"
                value={diskon}
                onChange={(e) => setDiskon(e.target.value)}
                placeholder="e.g. 10"
              />
            </div>        
          </div>

{/* 📌 Tabel Biaya Marketplace */}
          <div className="mt-6 bg-white rounded-2xl shadow-lg overflow-hidden">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3">Marketplace</th>
                  <th className="px-4 py-3">Biaya Admin</th>
                  <th className="px-4 py-3">Biaya Layanan</th>
                  <th className="px-4 py-3">Biaya Proses</th>
                  <th className="px-4 py-3">Rumus Harga Minimal Aman</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-orange-50">
                  <td className="px-4 py-3 font-semibold text-orange-600">Shopee</td>
                  <td className="px-4 py-3">8%</td>
                  <td className="px-4 py-3">6%</td>
                  <td className="px-4 py-3">Rp 1.250</td>
                  <td className="px-4 py-3">Modal + 8% + 6% + 1.250</td>
                </tr>
                <tr className="hover:bg-purple-50">
                  <td className="px-4 py-3 font-semibold text-purple-600">TikTok</td>
                  <td className="px-4 py-3">1%</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">Rp 1.000</td>
                  <td className="px-4 py-3">Modal + 1% + 1.000</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="px-4 py-3 font-semibold text-blue-600">Blibli</td>
                  <td className="px-4 py-3">10.5%</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">Modal + 10.5%</td>
                </tr>
                <tr className="hover:bg-red-50">
                  <td className="px-4 py-3 font-semibold text-red-600">Lazada</td>
                  <td className="px-4 py-3">6.2%</td>
                  <td className="px-4 py-3">1.8%</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">Modal + 6.2% + 1.8%</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        {/* Output */}
        <div className="space-y-4">
          <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-6 shadow-md">
            <div className="text-sm text-gray-600">Harga setelah Diskon</div>
            <div className="text-4xl font-extrabold text-indigo-800">
              {formatIDR(result.hargaDiskon)}
            </div>
            <span className="line-through text-gray-400 text-lg">
              {formatIDR(naikkan)}
            </span>
            <div className="text-xs text-gray-500">
              Pastikan lebih tinggi dari Harga Minimal Aman
            </div>
          </div>

          {/* Marketplace cards */}
          <div className="grid md:grid-cols-2 gap-4">
            <CardMarketplace
              name="Shopee"
              color="#FF6600"
              textColor="white"
              harga={result.shopee}
              profit={result.profitShopee}
            />
            <CardMarketplace
              name="TikTok"
              color="#000000"
              textColor="white"
              harga={result.tiktok}
              profit={result.profitTiktok}
            />
            <CardMarketplace
              name="Blibli"
              color="#2196F3"
              textColor="white"
              harga={result.blibli}
              profit={result.profitBlibli}
            />
            <CardMarketplace
              name="Lazada"
              color="#0D47A1"
              textColor="white"
              harga={result.lazada}
              profit={result.profitLazada}
            />
          </div>

          
        </div>
      </div>

      <footer className="text-xs text-gray-500 text-center mt-6">
        Built with React + Tailwind. Formula menyesuaikan kebijakan tiap marketplace.
      </footer>
    </div>
  );
}
