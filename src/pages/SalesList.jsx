import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion as m } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteSaleAsync, fetchSales } from '../app/salesReducer';
import { fetchProducts } from '../app/productsSlice';



const SalesList = () => {
    
    const dispatch = useDispatch()
    const sales = useSelector(data=>data.sales.data)
    const products = useSelector(data=>data.products.items)

    
    useEffect(()=>{
        dispatch(fetchSales())
        dispatch(fetchProducts())
    },[dispatch])
    
    
    

    
    
    
    
    
    
    
    
    
    
    return ( 
        <>
            <div className='flex flex-col justify-start space-y-2 my-4'>
                <h2 className="font-bold md:text-2xl">List Ventes</h2>
                
                    <Link to={"/ventes/ajouter"}><m.button
                whileHover={{scale:1.05, y:-2}}
                whileTap={{scale:1, y:0}}
                transition={{type:"spring", stiffness:900, damping:15}}
                className='w-50 btn btn-sm btn-primary font-bold'>
                Ajouter</m.button></Link>

            </div>
            <div className="w-full overflow-x-auto">
                <table className="table table-xs md:table-sm border border-neutral-400 min-w-max text-xs">
                    <thead className="font-bold text-center border border-neutral-400 text-xs md:text-sm">
                    <tr>
                        <th></th>
                        <th>Date</th>
                        <th>Quantite</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody className="text-center border border-neutral-400 text-xs md:text-sm">
                    {sales.map(sale=>{
                        
                        const product = products.find(
                        p => Number(p.id) === Number(sale.productId)
                        )

                        const total = product ? product.price * sale.quantite : 0


                        
                        
                        
                        return(
                            <tr className='font-bold'>
                                <td>{sale.id}</td>
                                <td>{sale.date}</td>
                                <td>{sale.quantite}</td>
                                <td>{total}</td>
                                <td>{sale.paymentMethod}</td>
                                <td style={{ color: sale.status === "Livré" ? "green" :
                                    sale.status === "En cours" ? "orange" : "red"}}>{sale.status}</td>
                                <td>
                                    <div className="flex justify-center items-center gap-2">
                            <m.button
                            whileHover={{ scale: 1.4 }}
                            whileTap={{ scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 900, damping: 15 }}
                            onClick={()=>{dispatch(deleteSaleAsync(sale.id))}}
                            >
                            <DeleteIcon sx={{ color: "red", width: "20px" }} />
                            </m.button>

                            <m.button
                            whileHover={{ scale: 1.4 }}
                            whileTap={{ scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 900, damping: 15 }}
                            >
                            <Link to={`/ventes/modifier/${sale.id}`}>
                                <EditIcon sx={{ color: "blue", width: "20px" }} />
                            </Link>
                            </m.button>
                        </div>
                                </td>
                            
                            </tr>
                        )
                    })}
    
                    </tbody>
                </table>
                </div>

        </>
     );
}
 
export default SalesList;