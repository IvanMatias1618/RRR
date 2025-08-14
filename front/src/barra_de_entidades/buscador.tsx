import React from "react";
import "./estilos.css";

export function Buscador({onBuscar}: {onBuscar: (valor: string) => void}) {
  return (
    <form className="buscador" onSubmit={e => {
      e.preventDefault();
    }}>
      <label htmlFor="nombreEntidad"> Buscar: </label>
      <input type="text"
        name="nombreEntidad"
        className="buscadorEntidad"
        onChange={e => onBuscar(e.target.value)}
        placeholder="Nombre a buscar. .. ..." required/>
      </form>
  );
}
