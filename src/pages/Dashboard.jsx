/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../app/productsSlice";
import { fetchSales } from "../app/salesReducer";
import { motion } from "framer-motion";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PaymentsIcon from '@mui/icons-material/Payments';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Barchart from "../charts/BarChart";

const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const sales = useSelector((state) => state.sales.data);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchSales());
  }, [dispatch]);

  const calculateRevenue = (filterFn) =>
    sales
      .filter(filterFn)
      .reduce((sum, sale) => {
        const product = products.find((p) => Number(p.id) === Number(sale.productId));
        if (!product) return sum;
        return sum + product.price * (sale.quantite || 0);
      }, 0);

  const CAjour = () =>
    calculateRevenue((sale) => sale.date === new Date().toISOString().split("T")[0]);

  const calculateCAMois = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    return calculateRevenue((sale) => {
      const d = new Date(sale.date);
      return d.getMonth() + 1 === month && d.getFullYear() === year;
    });
  };

  const calculateCATotal = () => calculateRevenue(() => true);

  const calculatePanierMoyen = () =>
    (sales.length === 0 ? 0 : calculateCATotal() / sales.length).toFixed(2);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeIn" }}
        className="grid grid-cols-1 space-y-4 md:grid-cols-2 md:gap-4"
      >
        <div className="bg-linear-to-r h-35 from-blue-500 to-blue-600 p-4 flex flex-col space-y-2 rounded-2xl">
          <LocalAtmIcon sx={{ color: "white" }} />
          <p className="font-bold text-white">{CAjour()} DH</p>
          <p className="font-semibold text-white">CA du Jour</p>
        </div>

        <div className="bg-linear-to-r h-35 from-green-500 to-emerald-500 p-4 flex flex-col space-y-2 rounded-2xl">
          <PaymentsIcon sx={{ color: "green" }} />
          <p className="font-bold text-white">{calculateCAMois()} DH</p>
          <p className="font-semibold text-white">CA du Mois</p>
        </div>

        <div className="bg-linear-to-r h-35 from-red-800 to-red-400 p-4 flex flex-col space-y-2 rounded-2xl">
          <AttachMoneyIcon sx={{ color: "black" }} />
          <p className="font-bold text-white">{calculateCATotal()} DH</p>
          <p className="font-semibold text-white">CA du Total</p>
        </div>

        <div className="bg-linear-to-r h-35 from-neutral-700 to-black p-4 flex flex-col space-y-2 rounded-2xl">
          <CurrencyExchangeIcon sx={{ color: "white" }} />
          <p className="font-bold text-white">{calculatePanierMoyen()} DH</p>
          <p className="font-semibold text-white">Panier Moyen</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="lg:col-span-3">
          <Barchart />
        </div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeIn" }}
        >
          <h5 className="font-bold text-center font-sans w-full mb-5 mt-2 md:mt-0">
            Top Produits
          </h5>
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Quantite</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 5).map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.stock}</td>
                    <td>{"⭐".repeat(product.rating)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
