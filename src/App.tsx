
import './App.css'
import { BrowserRouter, } from 'react-router-dom';
import AppWrap from './AppWrap';
import { ProductosContextProvider } from './contextos/contextoProductos';



function App() {

  return (
    <>
    <BrowserRouter>
      <ProductosContextProvider>
        <AppWrap></AppWrap>
      </ProductosContextProvider>      
    </BrowserRouter>          
    </>
  )
}

export default App
