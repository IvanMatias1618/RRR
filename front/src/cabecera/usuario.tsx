// Esta parte estaria mejor ponerla mediante un cookie, asi que lo implementaremos despues del https

interface Usuario {
  nombre: null | string;
  cerrarSesion: () => void;
}
export default function  BarraDeUsuario( {nombre, cerrarSesion}: Usuario ){
  return (
    <div>
      {nombre && ( 
      <div id="usuario_info">
        <h3 id="usuario_nombre">{nombre} </h3>  
 <button type="button" className="cerrar_sesion" onClick={() => cerrarSesion()}> cerrar sesion </button> </div>)}
</div>
  );
}
