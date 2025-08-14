import type { InsumoEditado } from "../contratos/tipos";
import { useRef } from "react";

interface Props {
  insumoNombre: string,
  onSubmit: (datos: InsumoEditado) => void;
  onCerrar?: () => void;
}

export default function FormularioEditar({insumoNombre, onSubmit, onCerrar }: Props) {
  const refForm = useRef<HTMLFormElement>(null);

  function enviarDatos(e:React.FormEvent) {
    e.preventDefault();
    const form = refForm.current;
    if(!form) return;

    const formInfo = new FormData(form);

    const datos: InsumoEditado = {};

const nombre = formInfo.get("nombre");
if (nombre && nombre !== "") datos.nombre = String(nombre);

const cantidad = formInfo.get("cantidad");
if (cantidad !== null && cantidad !== "") datos.cantidad = Number(cantidad);

const cantidad_minima = formInfo.get("cantidad_minima");
if (cantidad_minima !== null && cantidad_minima !== "") datos.cantidad_minima = Number(cantidad_minima);

const precio = formInfo.get("precio");
if (precio !== null && precio !== "") datos.precio = Number(precio);


    onSubmit(datos);
  }
  
  return (
    <form
      ref={refForm}
      onSubmit={enviarDatos}
      className="formulario insumos"
      id="form__editar_insumo"
    >
      <fieldset>
        <legend>Editar: "{insumoNombre}"</legend>

        <div className="campo_formulario">
          <label htmlFor="editar__insumo_nombre">Nombre del insumo:</label>
          <input
            type="text"
            id="editar__insumo_nombre"
            name="nombre"
            className="input_text"
          />
        </div>

        <div className="campo_formulario">
          <label htmlFor="editar__insumo_cantidad">Cantidad total del insumo:</label>
          <input
            type="number"
            id="editar__insumo_cantidad"
            name="cantidad"
            className="input_number"
            min={0}
          />
        </div>

        <div className="campo_formulario">
          <label htmlFor="editar__insumo_cantidad_minima">Cantidad mínima del insumo:</label>
          <input
            type="number"
            id="editar__insumo_cantidad_minima"
            name="cantidad_minima"
            className="input_number"
            min={0}
          />
        </div>

        <div className="campo_formulario">
          <label htmlFor="editar__insumo_precio">Precio por kilo del insumo:</label>
          <input
            type="number"
            id="editar__insumo_precio"
            name="precio"
            className="input_number"
            step={0.01}
            min={0}
          />
        </div>

        <button type="submit" id="btn_editar__insumo" className="btn_submit">
          Guardar cambios
        </button>
      {onCerrar && (
        <button type="button" className="btn_cancelar" onClick={onCerrar}> Cancelar </button>
      )}

        <div className="mensaje_respuesta oculto" aria-live="polite"></div>
      </fieldset>
    </form>
    
  );
}
