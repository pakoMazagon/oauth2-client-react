
import './App.css'
import { BrowserRouter, } from 'react-router-dom';
import AppWrap from './AppWrap';
import { ProductosContextProvider } from './contextos/contextoProductos';
import { MesasContextProvider } from './contextos/contextoMesas';



function App() {

  return (
    <>
    <BrowserRouter>
      <ProductosContextProvider>
        <MesasContextProvider>
          <AppWrap></AppWrap>
        </MesasContextProvider>        
      </ProductosContextProvider>      
    </BrowserRouter>          
    </>
  )
}

export default App
