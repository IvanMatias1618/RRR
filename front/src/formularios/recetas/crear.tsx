import { useState } from 'react';
import type { RecetaCrear, RecetaEditada, RecetaValor } from '../../contratos/tipos';
import type { Ingrediente } from '../../contratos/tipos';

interface Props {
  ingredientesDisponibles: string[];
  onCrear?: (datos: RecetaCrear) => void;
  onEditar?: (datos:  RecetaEditada) => void;
  recetaInicial?: RecetaValor;
  onCerrar?: () => void;
}

const RecetaForm: React.FC<Props> = ({ ingredientesDisponibles, onCrear, onCerrar, onEditar, recetaInicial }) => {
  const [nombre, setNombre ] = useState<string>(recetaInicial?.nombre ?? '');
  const [ ingredientes, setIngredientes ] = useState<Ingrediente[]>(recetaInicial?.ingredientes ?? []);
  const [nuevoNombre, setNuevoNombre] = useState<string>('');
  const [nuevaCantidad, setNuevaCantidad] = useState<number>(0);

  const manejarAgregarIngrediente = () => {
  if (!nuevoNombre || nuevaCantidad <= 0) return;

  const nuevoIngrediente: Ingrediente = {
    nombre: nuevoNombre,
    cantidad: nuevaCantidad,
  };

  setIngredientes([...ingredientes, nuevoIngrediente]);
  setNuevoNombre('');
  setNuevaCantidad(0);
};

  const eliminarIngrediente = (nombre: string) => {
    setIngredientes(ingredientes.filter(i => i.nombre !== nombre));
  };


  const ingredientesUsados = ingredientes.map(i => i.nombre);
  const ingredientesRestantes = ingredientesDisponibles.filter(i => !ingredientesUsados.includes(i));
  const manejarSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (recetaInicial && onEditar) {
    const recetaEditada: RecetaEditada = {
      nombre: nombre !== recetaInicial.nombre ? nombre : undefined,
      ingredientes,
    };
    onEditar(recetaEditada);
  } else {
    const recetaNueva: RecetaCrear = {
      nombre,
      ingredientes,
    };
    onCrear?.(recetaNueva);
  }
};

  return (
    <form onSubmit={manejarSubmit} className="recetas crear">
      <h2>Receta</h2>
      <input
        type="text"
        placeholder="Nombre de la receta."
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <h3>Ingredientes </h3>
      <ul>
        {ingredientes.map((i, idx) => (
          <li key={i.nombre}>
            {idx + 1}) {i.nombre}: {i.cantidad} grs
            <button type="button" onClick={() => eliminarIngrediente(i.nombre)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <h4>Agregar nuevo ingrediente</h4>
<input
  type="text"
  placeholder="Nombre del ingrediente"
  value={nuevoNombre}
  onChange={(e) => setNuevoNombre(e.target.value)}
  list="ingredientes-sugeridos"
/>
<datalist id="ingredientes-sugeridos">
  {ingredientesRestantes.map((op) => (
    <option key={op} value={op} />
  ))}
</datalist>

<input
  type="number"
  placeholder="Cantidad en gramos"
  value={nuevaCantidad}
  onChange={(e) => setNuevaCantidad(Number(e.target.value))}
/>

<button
  type="button"
  onClick={manejarAgregarIngrediente}
  disabled={!nuevoNombre || nuevaCantidad <= 0}
>
  Añadir a la receta
</button>


      <br/>
      <button type="submit" className="submit recetas">Crear receta </button>
      <button type="button" onClick={onCerrar} className="recetas cancelar"> Cancelar</button>
    </form>
  );
};

export default RecetaForm;
