import type { UsuarioIniSesion } from '../contratos/tipos';
import { USUARIOS_URL } from  '../urls';


export async function  IniciarSesion( usuario: UsuarioIniSesion) {

 try {
      const res = await fetch(`${USUARIOS_URL}/iniciar_sesion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      });
      const json = await res.json().catch(() => ({
        ok: false,
        mensaje: ["No se pudo completar la operacion."]
      }));
console.log(json);
console.log("json");
      
      return {
        ok: res.ok,
        mensaje: json //?? (!res.ok ? ['Error Desconocido'] : undefined)
      };
    } catch (error) {
      return {
        ok: false,
        mensaje: [error instanceof Error ? error.message : String(error)]
      };
    }


}
