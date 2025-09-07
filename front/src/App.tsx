import { useState } from "react";
import Cabecera from "./cabecera/titulo";
import "./App.css";
import PaginaInsumos from "./paginas/insumos";
import PaginaRecetas from "./paginas/recetas";
import PaginaUsuarios from "./paginas/usuarios";
import BarraDeUsuario from "./cabecera/usuario";

function App() {
  const [usuario, setUsuario] = useState<string>("");
  const [token, setToken] = useState<string>("");
  function manejarUsuario(nombre: string, token: string) {
    setUsuario(nombre);
    setToken(token);
    console.log(token);
  }

  const [paginaActual, setPaginaActual] = useState("usuarios");

  const renderizarPagina = () => {
    switch (paginaActual) {
      case "insumos":
        return <PaginaInsumos token={token} />;
      case "recetas":
        return <PaginaRecetas token={token} />;
      case "usuarios":
        return (
          <PaginaUsuarios
            guardarUsuario={(nombre, token) => manejarUsuario(nombre, token)}
            token={token}
          />
        );
    }
  };

  return (
    <>
      <BarraDeUsuario nombre={usuario} cerrarSesion={() => setUsuario("")} />
      <Cabecera onSeleccionar={setPaginaActual} />
      {renderizarPagina()}
    </>
  );
}

export default App;
