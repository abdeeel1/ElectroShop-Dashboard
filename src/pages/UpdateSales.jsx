// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../app/productsSlice"
import { fetchSales, updateSale } from "../app/salesReducer"
import { useParams, useNavigate } from "react-router-dom"

const UpdateSales = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const products = useSelector(state => state.products.items)
  const sales = useSelector(state => state.sales.data)

  const [form, setForm] = useState(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    dispatch(fetchSales())
    dispatch(fetchProducts())
  }, [dispatch])

  useEffect(() => {
    if (sales.length === 0) return

    const sale = sales.find(s => Number(s.id) === Number(id))

    console.log(sale)
    console.log(sales)

    if (!sale) {
        setChecked(true)
        return
    }

    setForm({
      productId: sale.productId,
      date: sale.date,
      quantite: sale.quantite,
      paymentMethod: sale.paymentMethod,
      status: sale.status
    })

    setChecked(true)
  }, [sales, id])

  if (!checked) {
    return <p className="text-center mt-10">Chargement...</p>
  }

  if (!form) {
    return <p className="text-center mt-10 text-red-500">Vente introuvable</p>
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    dispatch(
      updateSale({
        id: Number(id),
        updatedSale: {
          ...form,
          productId: Number(form.productId),
          quantite: Number(form.quantite)
        }
      })
    )

    navigate("/ventes")
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 bg-white p-6 rounded-2xl shadow-2xl">
      <h3 className="text-xl font-bold mb-4">Modifier Vente</h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="font-semibold">Produit</label>
          <select
            name="productId"
            value={form.productId}
            onChange={handleChange}
            className="select w-full"
          >
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="input w-full"
          />
        </div>

        <div>
          <label className="font-semibold">Quantité</label>
          <input
            type="number"
            name="quantite"
            value={form.quantite}
            onChange={handleChange}
            className="input w-full"
          />
        </div>

        <div>
          <label className="font-semibold">Paiement</label>
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="select w-full"
          >
            <option value="Carte">Carte</option>
            <option value="Espèces">Espèces</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Statut</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="select w-full"
          >
            <option value="Livré">Livré</option>
            <option value="En cours">En cours</option>
            <option value="Annulé">Annulé</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-primary w-full"
          >
            Modifier
          </motion.button>
        </div>

      </form>
    </div>
  )
}

export default UpdateSales;
