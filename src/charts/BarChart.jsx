import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales } from "../app/salesReducer";
import { fetchProducts } from "../app/productsSlice";

export default function Barchart() {
  const dispatch = useDispatch();

  const sales = useSelector((state) => state.sales.data) || [];
  const products = useSelector((state) => state.products.items) || [];

  const loadingSales = useSelector((state) => state.sales.isLoading);
  const loadingProducts = useSelector((state) => state.products.isLoading);

  useEffect(() => {
    if (products.length === 0) dispatch(fetchProducts());
    if (sales.length === 0) dispatch(fetchSales());
  }, [dispatch, products.length, sales.length]);

  // Show loading state if data not ready
  if (loadingSales || loadingProducts) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-bold mb-4">📈 Évolution des Ventes</h3>
        <div className="h-[300px] flex items-center justify-center text-gray-500">
          <p>Chargement des données...</p>
        </div>
      </div>
    );
  }

  // Calculate totals by date dynamically
  const salesByDate = {};

  sales.forEach((sale) => {
    if (sale?.date && sale?.productId) {
      const product = products.find((p) => Number(p.id) === Number(sale.productId));
      if (!product) return;

      const total = Number(product.price) * Number(sale.quantite || 0);
      salesByDate[sale.date] = (salesByDate[sale.date] || 0) + total;
    }
  });

  const chartData = Object.entries(salesByDate)
    .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
    .map(([date, total]) => {
      const [year, month, day] = date.split("-");
      return [`${day}/${month}/${year}`, total];
    });

  if (chartData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-bold mb-4">📈 Évolution des Ventes</h3>
        <div className="h-[300px] flex items-center justify-center text-gray-500">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <p>Pas de données de vente disponibles</p>
          </div>
        </div>
      </div>
    );
  }

  const finalChartData = [["Date", "Chiffre d'affaires (DH)"], ...chartData];

  const options = {
    title: "Évolution des Ventes",
    hAxis: { title: "Date", slantedText: true, slantedTextAngle: 45 },
    vAxis: { title: "Montant (DH)", format: "#,### DH" },
    colors: ["#3b82f6"],
    chartArea: { width: "80%", height: "70%" },
    legend: { position: "none" },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-lg font-bold mb-4">📈 Évolution des Ventes</h3>
      <div className="h-[300px]">
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="100%"
          data={finalChartData}
          options={options}
        />
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>
          Période: {chartData[0][0]} - {chartData[chartData.length - 1][0]}
        </p>
        <p>Nombre de jours avec ventes: {chartData.length}</p>
      </div>
    </div>
  );
}
