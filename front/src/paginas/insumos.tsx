import { useState } from 'react';
import type { Insumo } from '../contratos/tipos';
import BarraDeEntidades from '../barra_de_entidades/barra';
import EntidadVisual from '../barra_de_entidades/entidad';
import FormularioEditar from '../formularios/editar_insumos';
import FormularioCrear from '../formularios/crear_insumo';
import '../styles.css';
import {ServicioSupremo}  from '../servicios/servicio';
import { INSUMOS_URL } from '../urls'; 


export default function PaginaInsumos() {
  const servicioDeInsumos = new ServicioSupremo(INSUMOS_URL);
  const [entidadParaEditar, setEntidadParaEditar] = useState<string | null>(null);
  const [crear, setCrear] = useState<boolean>(false);
  return (
    <>
    <BarraDeEntidades<Insumo>
    servicio={servicioDeInsumos}
  obtenerKey={(i) => i.nombre}
  render={(i) => (
    <EntidadVisual
    entidad={i}
    obtenerNombre={(x) => x.nombre}
    obtenerDescripcion={(x) => `Cantidad: ${x.cantidad} \nCantidad minima: ${x.cantidad_minima}\nPrecio por gramo: ${x.precio}`}
    obtenerImagen={(x) => `/img/insumos/${x.nombre}.png`}
    onEliminar={()=> servicioDeInsumos.eliminar(i.nombre)}
    onEditar={()  => setEntidadParaEditar(i.nombre)}
    key={i.nombre}
    clase='insumos'
  />)}
  />

  {entidadParaEditar && (
   <FormularioEditar
   insumoNombre={entidadParaEditar}
 onSubmit={(datos) => {
   servicioDeInsumos.editar(entidadParaEditar, datos);
   setEntidadParaEditar(null);
 }}
onCerrar={() => setEntidadParaEditar(null)} />
  )}
  <div id="crear_seccion">
<button type="button" onClick={() => setCrear(true)} className="crear_boton">Crear</button>
  
  {crear && (
    <FormularioCrear
    onCrear={(datos) => {
      console.log(datos);
      servicioDeInsumos.crear(datos);
      setCrear(false);
    }}
  onCerrar={() => setCrear(false)}/>
  )}
  </div> 
  </>
  )
}
