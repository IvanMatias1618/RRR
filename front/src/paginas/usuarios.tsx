import { useState } from "react";
import type { Usuario, UsuarioIniSesion } from "../contratos/tipos";
import BarraDeEntidades from "../barra_de_entidades/barra";
import EntidadVisual from "../barra_de_entidades/entidad";
import "../styles.css";
import { ServicioSupremo } from "../servicios/servicio";
import { USUARIOS_URL } from "../urls";
import FormularioCrear from "../formularios/usuarios/crear";
import { IniciarSesion } from "../servicios/usuarios";
import FormIniSesion from "../formularios/usuarios/iniciar_sesion";

interface GuardarUsuario {
  guardarUsuario: (nombre: string, token: string) => void;
  token: string;
}

export default function PaginaUsuarios({
  guardarUsuario,
  token,
}: GuardarUsuario) {
  const servicioDeUsuarios = new ServicioSupremo(USUARIOS_URL, token);
  //const [entidadParaEditar, setEntidadParaEditar] = useState<string | null>(null);
  const [crear, setCrear] = useState<boolean>(false);
  const [iniciarSesion, setIniciarSesion] = useState<boolean>(false);
  async function IniciarSesi(datos: UsuarioIniSesion) {
    const res = await IniciarSesion(datos);
    guardarUsuario(datos.nombre, res.mensaje);
    console.log(res.mensaje);
  }
  return (
    <>
      <BarraDeEntidades<Usuario>
        servicio={servicioDeUsuarios}
        obtenerKey={(i) => i.nombre}
        render={(i) => (
          <EntidadVisual
            entidad={i}
            obtenerNombre={(x) => x.nombre}
            obtenerDescripcion={(x) => `rol: ${x.rol}`}
            Imagen={`usuarios.jpg`} // La imagen deberia venir la db o ser mas generica en el front.
            onEliminar={() => servicioDeUsuarios.eliminar(i.nombre)}
            //onEditar={()  => setEntidadParaEditar(i.nombre)}
            key={i.nombre}
            clase="usuarios"
          />
        )}
      />

      {/* entidadParaEditar && (
   <FormularioEditar
   insumoNombre={entidadParaEditar}
 onSubmit={(datos) => {
   servicioDeInsumos.editar(entidadParaEditar, datos);
   setEntidadParaEditar(null);
 }}
onCerrar={() => setEntidadParaEditar(null)} />
  ) */}
      <div id="crear_seccion">
        <button
          type="button"
          onClick={() => setCrear(true)}
          className="crear_boton"
        >
          Crear
        </button>
        <button
          type="button"
          onClick={() => setIniciarSesion(true)}
          className="inciar_sesion__boton"
        >
          Iniciar Sesion
        </button>

        {iniciarSesion && (
          <FormIniSesion
            onSubmit={(datos) => IniciarSesi(datos)}
            onCerrar={() => setIniciarSesion(false)}
          />
        )}
        {crear && (
          <FormularioCrear
            onCrear={(datos) => {
              console.log(datos);
              servicioDeUsuarios.crear(datos);
              setCrear(false);
            }}
            onCerrar={() => setCrear(false)}
          />
        )}
      </div>
    </>
  );
}
