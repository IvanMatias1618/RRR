import  Menu_cabecera  from "./menu";
import './styles.css';

interface Prop {
  onSeleccionar: (seleccion: string) => void;
}

export default function Cabecera({onSeleccionar}:Prop) {
  return (
    <>
      <h1 id ="titulo"> Sistema de inventario</h1>
      <Menu_cabecera
        onSeleccionar={onSeleccionar}/>
    </>
  )
}
