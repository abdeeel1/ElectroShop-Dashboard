// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";


const About = () => {
    return ( 
        <div className="">
            <motion.div 
            initial={{opacity:0, y:-100}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.8, ease:"easeInOut"}}
            className="flex flex-col justify-center items-center space-y-2">
                <p className="font-bold font-sans text-2xl">A PROPOS</p>
                <p className="text-center ">Depuis 2015, ElectroShop Marrakech s'engage à vous offrir les dernières innovations technologiques <br />
                avec un service personnalisé et des prix compétitifs.</p>
                <p className="font-bold font-sans text-2xl">NOTRE HISTOIRE</p>
                <p className="text-center">Fondée en 2015 au cœur de la ville ocre, <br />
                ElectroShop Marrakech a commencé comme une petite boutique familiale spécialisée en téléphonie mobile. <br />
                Aujourd'hui, nous sommes devenus une référence régionale dans la vente de produits électroniques, électroménagers et informatiques.</p>
                <p className="font-bold text-center font-sans text-2xl">CONTACT & INFORMATIONS</p>
                <div className="flex justify-center md:justify-between  items-center font-semibold mt-2">
                    <p>📍 Avenue Mohammed V, N°123, Guéliz, Marrakech</p>
                    <p>📞 0524 44 12 34</p>
                </div>
                <p className="font-sans text-center mt-5 font-bold text-blue-950">By Najib Abdessamad & Mahboub Anas</p>
            </motion.div>
        </div>
     );
}
 
export default About;