import { useState } from 'react';
import Cabecera from './cabecera/titulo';
import './App.css';
import PaginaInsumos from './paginas/insumos';
import PaginaRecetas from './paginas/recetas';


function App() {
  const [paginaActual, setPaginaActual] = useState('insumos');

  const renderizarPagina = () =>  {
    switch (paginaActual) {
      case 'insumos':
        return <PaginaInsumos/>;
      case 'recetas':
        return <PaginaRecetas />;
    }
  }
  
  return (
    <>
      <Cabecera onSeleccionar={setPaginaActual}/>
      {renderizarPagina()}
      
    </>
  )
}

export default App;
