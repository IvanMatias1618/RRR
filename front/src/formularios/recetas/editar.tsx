import type {  RecetaEditada } from '../../contratos/tipos';
import { useRef } from 'react';
import IngredienteFormulario from './ingrediente';
import type { Ingrediente } from '../../contratos/tipos';

interface Props {
  ingredientesDisponibles: string[];
  onSubmit: (datos: RecetaEditada) => void;
  onCerrar: () => void;
}

export default function FormularioEditar({recetaNombre, onSubmit, onCerrar}: Props) {
  const refForm = useRef<HTMLFormElement>(null);

  function enviarDatos(e:React.FormEvent) {
    e.preventDefault();
    const form = refForm.current;
    if(!form) return;

    const formInfo = new FormData(form);

    const datos: RecetaEditada = {};
}
const FormEditar: React.FC<Props> = ({ingredientesDisponibles, onSubmit, onCerrar}) => {
  const [nombre, setNombre ] = useState<string>('');
  const [ ingredientes, setIngredientes ]
}
