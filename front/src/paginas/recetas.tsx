
import { useState } from 'react';
import type { Receta } from '../contratos/tipos';
import BarraDeEntidades from '../barra_de_entidades/barra';
import EntidadVisual from '../barra_de_entidades/entidad';
import RecetaForm from '../formularios/recetas/crear.tsx'
import '../styles.css';
import {ServicioSupremo}  from '../servicios/servicio';
import { RECETAS_URL } from '../urls'; 
import { INSUMOS_URL } from '../urls'; 


export default function PaginaInsumos() {
  const servicioDeInsumos = new ServicioSupremo(INSUMOS_URL);
  const ingredientes: string[] =  [];
  (async () => {
  const ingredientes: string[] = (await servicioDeInsumos.listar()).mensaje;
  console.log(ingredientes);
  console.log(1);
})();


  const servicioDeRecetas = new ServicioSupremo(RECETAS_URL);
  const [entidadParaEditar, setEntidadParaEditar] = useState<string | null>(null);
  const [crear, setCrear] = useState<boolean>(false);
  
  return (
    <>
    <BarraDeEntidades<Receta>
    servicio={servicioDeRecetas}
  obtenerKey={(i) => i.nombre}
  render={(i) => (
    <EntidadVisual
    entidad={i}
    obtenerNombre={(x) => x.nombre}
    obtenerDescripcion={(x) => `Ingredientes: ${x.ingredientes}\nCosto:$ ${x.costo}`}
    obtenerImagen={(x) => `/img/insumos/${x.nombre}.png`}
    onEliminar={()=> servicioDeRecetas.eliminar(i.nombre)}
    onEditar={()  => setEntidadParaEditar(i.nombre)}
    key={i.nombre}
    clase='recetas'
  />)}
  />

  {entidadParaEditar && (


    <RecetaForm
    ingredientesDisponibles={ingredientes}
    onEditar={(datos) => {
      servicioDeRecetas.editar(entidadParaEditar,datos);
      setEntidadParaEditar(null);
    }}
    onCerrar={() => setEntidadParaEditar(null)}/>
  )}
  <div id="crear_seccion">
<button type="button" onClick={() => setCrear(true)} className="crear_boton">Crear</button>
  {crear && (
    <RecetaForm
    ingredientesDisponibles={ingredientes}
    onCrear={(datos) => {
      console.log(datos);
      servicioDeRecetas.crear(datos);
      setCrear(false);
    }}
    onCerrar={() => setCrear(false)}/>
  )}
  </div> 
  </>
  )
}
