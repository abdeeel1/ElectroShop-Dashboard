import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Sidebar from './components/Layout/Sidebar'
import SalesList from './pages/SalesList'
import AddSales from './pages/AddSales'
import UpdateSales from './pages/UpdateSales'
import About from './pages/About'










function App() {
  

  return (
    <BrowserRouter>
      


      <Routes>
        <Route path='/' element={<Home/>}/>
        
        <Route element={<Sidebar/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/ventes' element={<SalesList/>}/>
          <Route path='/ventes/ajouter' element={<AddSales/>}/>
          <Route path='/ventes/modifier/:id' element={<UpdateSales/>}/>
          <Route path='/apropos' element={<About/>}/>
        </Route>

      </Routes>



    </BrowserRouter>
  )
}

export default App
