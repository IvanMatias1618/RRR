import { ServicioSupremo } from "../servicios/servicio";

export interface Entidad<T> {
  entidad: T;
  clase: string;
  obtenerNombre: (ent: T) => string;
  obtenerDescripcion: (ent: T) => string;
  Imagen: string;
}

export interface EntidadReactiva<T extends Entidad_suprema<any, any, any>> {
  servicio: ServicioSupremo<T>;
  render: (item: T["valor"]) => React.ReactNode;
  obtenerKey: (item: T["valor"]) => string;
}

export interface Ingrediente {
  nombre: string;
  cantidad: number;
}
export interface RecetaCrear {
  nombre: string;
  ingredientes: Ingrediente[];
}

export interface RecetaEditada {
  nombre?: string;
  ingredientes: Ingrediente[];
}

export interface RecetaValor {
  nombre: string;
  ingredientes: Ingrediente[];
  costo: number;
}

export interface InsumoCrear {
  nombre: string;
  cantidad: number;
  cantidad_minima: number;
  precio: number;
}

export interface InsumoEditado {
  nombre?: string;
  cantidad?: number;
  cantidad_minima?: number;
  precio?: number;
}

export interface InsumoValor {
  id: string;
  nombre: string;
  cantidad: number;
  cantidad_minima: number;
  precio: number;
}
export interface Respuesta {
  ok: boolean;
  mensaje: string[];
}
export interface Lista {
  respuesta: string[];
}
export type Entidad_suprema<
  Crear extends object,
  Editar extends object,
  Valor extends object,
> = {
  crear: Crear;
  editar: Editar;
  valor: Valor;
};
export type Receta = Entidad_suprema<RecetaCrear, RecetaEditada, RecetaValor>;
export type Insumo = Entidad_suprema<InsumoCrear, InsumoEditado, InsumoValor>;
export interface UsuarioCrear {
  nombre: string;
  rol: string;
  contra: String;
}
export interface UsuarioEditar {
  nombre?: string;
  rol?: string;
  contra?: string;
}
export interface UsuarioValor {
  nombre: string;
  rol: string;
}
export interface UsuarioIniSesion {
  nombre: string;
  contra: string;
}
export type Usuario = Entidad_suprema<
  UsuarioCrear,
  UsuarioEditar,
  UsuarioValor
>;
