import { useState, useEffect } from "react";
import { Buscador } from "./buscador";
import "./estilos.css";
import type {Entidad_suprema, EntidadReactiva} from '../contratos/tipos';




export default function BarraDeEntidades<T extends Entidad_suprema<any, any, any>>(  
  {servicio, render, obtenerKey}:EntidadReactiva<T>) {
  const [entidades, setEntidades] = useState<T['valor'][]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect( () => {
    async function cargar() {
      try {
        const nombres =
        busqueda === ""
        ? await servicio.listar()
        : await servicio.buscarPorNombre(busqueda);
        console.log(nombres.mensaje);
        const valores = await Promise.all(nombres.mensaje.map(e => servicio.valor(e)));
        console.log(valores);
        /*const valores = await Promise.all(nombres.mensaje.map(servicio.valor));*/
        setEntidades(valores);
      } catch(error) {
        console.log("Error al cargar las entidades:", error);
      }
    }
    cargar();
  }, [busqueda]);
  return (
    <>
    <Buscador onBuscar={setBusqueda} />
    <div className="barra_de_entidades">
      <ul id="lista_de_entidades" >{entidades.length === 0? (<p> No se encontraron resultados</p>): (entidades.map(e =>
      <li className="entidad_item" key={obtenerKey(e)}>{render(e)}</li>)
    )}</ul>
      </div>
    </>
  )
}

