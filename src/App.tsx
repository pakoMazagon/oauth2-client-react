
import './App.css'
import { BrowserRouter, } from 'react-router-dom';
import AppWrap from './AppWrap';
import { ProductosContextProvider } from './contextos/contextoProductos';
import { MesasContextProvider } from './contextos/contextoMesas';
import { CamareroProvider } from './contextos/contextoCamarero';
import { PedidosProvider } from './cocina/contextos/contextoPedidos';



function App() {

  return (
    <>
    <BrowserRouter>
      <CamareroProvider>
        <ProductosContextProvider>          
            <MesasContextProvider>
              <PedidosProvider>
                <AppWrap></AppWrap>
              </PedidosProvider> 
            </MesasContextProvider>                           
        </ProductosContextProvider>      
      </CamareroProvider>      
    </BrowserRouter>          
    </>
  )
}

export default App
