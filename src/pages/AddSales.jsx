// eslint-disable-next-line no-unused-vars
import { motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSale, fetchSales } from "../app/salesReducer";
import { fetchProducts } from "../app/productsSlice";
import { useNavigate } from "react-router-dom";
import AlertErorr from "../components/Layout/AlertErorr";


const AddSales = () => {
    
    const products = useSelector(data=>data.products.items)
    const sales = useSelector(data=>data.sales.data)

    const [alertErorr , setAlertErorr] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(fetchSales())
        dispatch(fetchProducts())
    },[dispatch])

    const [formData, setFormData] = useState({
        produitId : "",
        date : "",
        quantite : "",
        payment : "",
        status : "",
    })

    function HandleChange(e){
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
        setAlertErorr(false)

    }
    
    function HandleSubmit(e){
        e.preventDefault()

        if(
            !formData.produitId ||
            !formData.date ||
            !formData.quantite ||
            !formData.payment ||
            !formData.status
        ) {
            setAlertErorr(true)
            return
        }

        dispatch(addSale({
            id : String(sales.length + 1),
            date : formData.date,
            productId : Number(formData.produitId),
            quantite : formData.quantite,
            paymentMethod : formData.payment,
            status : formData.status
        }))


        setFormData({
            produitId : "",
            date : "",
            quantite : "",
            payment : "",
            status : "",
        })

        navigate("/ventes")

    }
    
    
    
    
    
    return ( 
        <>
         
        <div className="max-w-3xl mx-auto mt-6 bg-white p-6 rounded-2xl shadow-2xl">
        <h3 className="text-xl font-bold mb-4">Ajouter Vente</h3>
        {alertErorr && <AlertErorr/>}
        <form onSubmit={HandleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
            <label className="font-semibold">Produit</label>
            <select
                name="produitId"
                value={formData.produitId}
                onChange={HandleChange}
                className="select w-full"
            >
                <option value="-1">-- Select Product --</option>
                {products.map(p => (
                    
                        <option value={p.id}>{p.name}</option>
                    

                ))}
            </select>
            </div>

            <div>
            <label className="font-semibold">Date</label>
            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={HandleChange}
                className="input w-full"
            />
            </div>

            <div>
            <label className="font-semibold">Quantité</label>
            <input
                type="number"
                name="quantite"
                value={formData.quantite}
                onChange={HandleChange}
                className="input w-full"
            />
            </div>

            <div>
            <label className="font-semibold">Paiement</label>
            <select
                name="payment"
                value={formData.payment}
                onChange={HandleChange}
                className="select w-full"
            >
                <option value="">-- Select Payment --</option>
                <option value="Carte">Carte</option>
                <option value="Espèces">Espèces</option>
                <option value="PayPal">PayPal</option>
            </select>
            </div>

            <div>
            <label className="font-semibold">Statut</label>
            <select
                name="status"
                value={formData.status}
                onChange={HandleChange}
                className="select w-full"
            >
                <option value="">-- Select Status --</option>
                <option value="Livré">Livré</option>
                <option value="En cours">En cours</option>
                <option value="Annulé">Annulé</option>
            </select>
            </div>

            <div className="md:col-span-2">
            <m.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary w-full"
            >
                Ajouter
            </m.button>
            </div>

        </form>
        </div>
        </>
    );
}
 
export default AddSales;