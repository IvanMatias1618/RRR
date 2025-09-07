import './styles.css'
interface Prop {
  onSeleccionar: (seleccion:string) => void;
}

export default function Menu_cabecera({ onSeleccionar}:Prop) {
  return (
    <ul id="ul_menu_cabecera">
    <li className="menu_cabecera_opcion" onClick={() => onSeleccionar('insumos')}>  Insumos </li>
    <li className="menu_cabecera_opcion" onClick={() => onSeleccionar('recetas')}> Recetas </li>
<li className="menu_cabecera_opcion" onClick={() => onSeleccionar('usuarios')}> Usuarios </li>
    
    </ul>
  )
}
