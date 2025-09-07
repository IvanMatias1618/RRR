
import { useRef } from 'react';
import type { UsuarioCrear } from '../../contratos/tipos';


interface Props {
  onCrear: (datos: UsuarioCrear) => void;
  onCerrar?: () => void;
}



export default function FormularioCrear({onCrear, onCerrar}: Props) {
  const refForm = useRef<HTMLFormElement>(null);

  function CrearUsuario(e: React.FormEvent){
    e.preventDefault();
    const form = refForm.current;
    if (!form) return;

    const formInfo = new FormData(form);

    const nombre = formInfo.get("nombre") as string;
    const rol = formInfo.get("rol") as string;
    const contra = formInfo.get("contra") as string;
    {/* VERIFICACION  DE  REGLAS: DE CONTRA: */}
    if (!nombre) return;
    if (!rol) return;
    if (!contra) return;
    const datos:UsuarioCrear =  {
    nombre,
    rol,
    contra,
  };
  console.log(datos);
  onCrear(datos);
  }
  
  return (
    <form onSubmit={CrearUsuario} ref={refForm} className="formulario__crear" id="crear__usuario">
      <fieldset>
        <legend>Agregar un insumo al inventario</legend>

        <div className="campo_formulario">
          <label htmlFor="nombre">Nombre de insumo:</label>
          <input
            type="text"
            className="usuario__nombre"
            id="agregar__usuario_nombre"
            name="nombre"
            required
          />
        </div>

        <div className="campo_formulario">
          <label htmlFor="rol">Cantidad total del insumo:</label>
          <input
            type="text"
            className="usuario__rol"
            id="agregar__usuario_rol"
            name="rol"
            required
            min={0}
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
