import StoreIcon from '@mui/icons-material/Store';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';




const Home = () => {

    


    const developpers = [
        {id:1, name:"Abdessamad Najib", about:"Full Stack",title:"🔴 LEAD DEVELOPER - ANALYTICS & DATA VISUALIZATION",role:["State Management (Redux)","Graphs & Statistics","Dashboard UI"]},
        {id:2, name:"Mahboub Anas", about:"Full Stack",title:"🔵 LEAD DEVELOPER - FRONTEND & USER EXPERIENCE",role:["Sales Management (CRUD)","Forms & Validation","User Interface Design"]}
    ]
    
    
    
    
    
    return ( 
        <div className='container h-screen'>
        

        {/* Navbar */}

        <div>
            <nav className='nav flex items-center justify-around p-4 bg-white lg:justify-between'>
                <div className='flex gap-0.5 items-center lg:ms-10'>
                    <StoreIcon className='mt-1' sx={{color:"#111827"}}/>
                    <h2 style={{color:"#111827"}} className='font-bold  text-2xl'>ElectroShop</h2>
                </div>
                <div>
                    <Link to={"/dashboard"}><motion.button 
                    whileHover={{scale:1.05,y:-2}}
                    whileTap={{scale:1,y:1}}
                    transition={{type:"spring", stiffness:300}}
                    style={{backgroundColor:"#111827"}} className='btn btn-ghost bg-black text-white'>Dashboard</motion.button></Link>
                </div>
            </nav>
        </div>
        
        {/* Header Section */}

        <div className='flex justify-center items-center flex-col mt-10 p-4 space-y-4 lg:mt-20'>
            <motion.h3 
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:1.5}}
            
            className='text-center font-bold text-primary text-2xl'>ElectroShop Marrakech</motion.h3>
            <p className='text-center font-semibold'>Solution de Gestion Commerciale Développée avec Passion Par :</p>
            <div className='flex flex-col space-y-4 items-center justify-center md:flex-row md:space-y-0 md:space-x-4 lg:flex-row lg:space-y-0 lg:space-x-4'>
                {developpers.map(dev=>{
                    return(
                        <motion.div
                        initial={{opacity:0, y:50}}
                        animate={{opacity:1, y: 0}}
                        transition={{duration:0.8}}
                        
                        key={dev.id} className="card bg-neutral-300 shadow-2xl shadow-neutral-400  w-80 lg:w-100">
                
                        <div className="card-body">
                            <div className='flex justify-center items-center'>
                                <h2 className="text-center font-bold mt-0.5 text-[19px]">
                                {dev.name}
                                <div className="badge badge-primary ms-2 mb-1">{dev.about}</div>
                                </h2>
                            </div>
                            <p className='font-semibold text-center lg:me-6'>{dev.title}</p>
                            <div className="">
                            <ul className='space-y-2 ms-7 lg:ms-16'>
                                <li><CheckCircleIcon  className='text-primary'/> {dev.role[0]}</li>
                                <li><CheckCircleIcon className='text-primary'/> {dev.role[1]}</li>
                                <li><CheckCircleIcon className='text-primary'/> {dev.role[2]}</li>
                            </ul>
                            </div>
                        </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
        
        </div>

        
     );
}
 
export default Home;