import type { Entidad } from "../contratos/tipos";
import "./estilos.css";

export default function EntidadVisual<T>({
  entidad,
  clase,
  obtenerNombre,
  obtenerDescripcion,
  Imagen,
  onEliminar,
  onEditar,
}: Entidad<T> & { onEliminar?: () => void } & { onEditar?: () => void }) {
  const nombre = obtenerNombre(entidad);
  const descripcion = obtenerDescripcion(entidad);
  return (
    <div className={`entidad ${clase}`}>
      <div
        className="datos"
        style={{ backgroundImage: `url(public/img/${Imagen})` }}
      >
        {" "}
        <h1 className={`nombre ${clase}`}>{nombre}</h1>
        <p className={`descripcion ${clase}`}> {descripcion} </p>
      </div>
      <div className="entidad_botones">
        {" "}
        <button onClick={onEliminar} className="btn-eliminar">
          {" "}
          Eliminar
        </button>
        <button onClick={onEditar} className="btn-editar">
          {" "}
          Editar
        </button>
      </div>
    </div>
  );
}
