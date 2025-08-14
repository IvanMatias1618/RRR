import type { Insumo, InsumoEditado, InsumoValor, Respuesta } from './tipos.ts';

export interface InsumosConsulta {
  crear: (insumo: Insumo) => Promise<Response>;
  buscarPorNombre: (nombre: string) => Promise<string[]>;
  listar: () => Promise<string[]>;
  valorInsumo: (nombre: string) => Promise<InsumoValor>;
  editarInsumo: (nombre: string, datos: InsumoEditado) => Promise<void>;
  eliminarInsumo: (nombre: string) => Promise<void>
}
//servicio de una entidad tipo T siendo U con un id, y V para editar.
export interface Servicio<Crear, Editar, Valor> {
  crear: (datos: Crear) => Promise<Respuesta>;
  buscarPorNombre: (nombre: string) => Promise<Respuesta>;
  listar: () => Promise<Respuesta>;
  valor: (nombre: string) => Promise<Valor>;
  editar: (nombre: string, datos: Editar) => Promise<Respuesta>
  eliminar: (nombre: string) => Promise<Respuesta>
}
