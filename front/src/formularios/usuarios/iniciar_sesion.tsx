
import { useRef } from 'react';
import type { UsuarioIniSesion } from '../../contratos/tipos';


interface Props {
  onSubmit: (datos: UsuarioIniSesion) => void;
  onCerrar?: () => void;
}



export default function FormIniSesion({onSubmit, onCerrar}: Props) {
  const refForm = useRef<HTMLFormElement>(null);

  function IniciarSesion(e: React.FormEvent){
    e.preventDefault();
    const form = refForm.current;
    if (!form) return;

    const formInfo = new FormData(form);

    const nombre = formInfo.get("nombre") as string;
    const contra = formInfo.get("contra") as string;

    if (!nombre) return;
    if (!contra) return;
    const datos:UsuarioIniSesion =  {
    nombre,
    contra,
  };
  console.log(datos);
  onSubmit(datos);
  }
  
  return (
    <form onSubmit={IniciarSesion} ref={refForm} className="formulario__iniciar_sesion" id="iniciar__sesion">
      <fieldset>
        <legend>Agregar un insumo al inventario</legend>

        <div className="campo_formulario">
          <label htmlFor="nombre">Nombre de insumo:</label>
          <input
            type="text"
            className="usuario__nombre"
            id="agregar__usuarioa_nombre"
            name="nombre"
            required
          />
        </div>

        <div className="campo_formulario">
          <label htmlFor="contra">Cantidad mínima del insumo:</label>
          <input
            type="text"
            className="usuario__contra"
            id="agregar__usuario_contra"
            name="contra"
            required
            min={0}
          />
        </div>

        <button type="submit"  id="btn_agregar__usuario" className="btn_submit">
          Agregar
        </button>
      {onCerrar && (
        <button type="button" onClick={onCerrar} className="btn_cancelar"> Cancelar </button>
      )}

        <div className="mensaje_respuesta oculto" aria-live="polite"></div>
      </fieldset>
    </form>
  );
}
