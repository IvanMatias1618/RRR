
import type { Entidad_suprema, Respuesta } from '../contratos/tipos';
import type { Servicio } from '../contratos/contratos';


export class ServicioSupremo<T extends Entidad_suprema<any, any, any>>
  implements Servicio<T['crear'], T['editar'], T['valor']> {
  private url: string
  private token: string
  constructor(url_base: string, token: string) { this.url = url_base; this.token = token; }
  async crear(datos: T['crear']): Promise<Respuesta> {
    try {
      console.log(this.token);
      const res = await fetch(`${this.url}/crear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 'Authorization': this.token
        },
        body: JSON.stringify(datos)
      });
      const json = await res.json().catch(() => ({
        ok: false,
        mensaje: ["No se pudo completar la operacion."]
      }));
      return {
        ok: res.ok,
        mensaje: json?.mensaje ?? (!res.ok ? ['Error Desconocido'] : undefined)
      };
    } catch (error) {
      return {
        ok: false,
        mensaje: [error instanceof Error ? error.message : String(error)]
      };
    }
  }

  async buscarPorNombre(nombre: string): Promise<Respuesta> {
    const respuesta = await fetch(`${this.url}/buscar?consulta=${encodeURIComponent(nombre)}`);
    if (!respuesta.ok) {
      return {
        ok: false,
        mensaje: [`Error al buscar el insumo ${nombre}`]
      };
    }
    const datos = await respuesta.json();
    return {
      ok: true,
      mensaje: [datos]
    }
  }

  async listar(): Promise<Respuesta> {
    const respuesta = await fetch(`${this.url}/todos`);
    if (!respuesta.ok) {
      return {
        ok: false,
        mensaje: ["Error al listar los insumos"]
      };
    }
    const json = await respuesta.json();
    return {
      ok: true,
      mensaje: json
    };
  }

  async valor(nombre: string): Promise<T['valor']> {
    const respuesta = await fetch(`${this.url}/valor?consulta=${nombre}`);
    if (!respuesta.ok) throw new Error(`Error al buscar el insumao ${nombre}`);
    const info: T['valor'] = await respuesta.json();
    return info;
  }

  async editar(nombre: string, datos: T['editar']): Promise<Respuesta> {
    const res = await fetch(`${this.url}/editar/${encodeURIComponent(nombre)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': this.token },
      body: JSON.stringify(datos),
    });
    const texto = await res.text();

    if (!res.ok) {

      return {
        ok: false,
        mensaje: [texto]
      };
    }
    return {
      ok: true,
      mensaje: [texto]
    };
  }

  async eliminar(nombre: string): Promise<Respuesta> {
    const res = await fetch(`${this.url}/${encodeURIComponent(nombre)}`, {
      method: 'DELETE',
      headers: { 'Authorization': this.token },
    });
    const texto = await res.text();
    if (!res.ok) {
      return {
        ok: false,
        mensaje: [texto]
      };
    }
    return {
      ok: true,
      mensaje: [texto]
    };
  }


} 
