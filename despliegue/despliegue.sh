#!/bin/bash

#Imprimimos un lindo banner
echo "Iniciando el servidor :) "

# Nos movemos a la carpeta y corremos el server en segundo plano.
(cd ../sis-inventario-rust && cargo run server) &
BACKEND_PID=$!


echo "Servidores levantados, desplegando el front-end"

(cd ../inventario-front && npm start) &
FRONTEND_PID=$!

trap "echo 'Deteniendo los  servicios.'; kill $BACKEND_PID $FRONTEND_PID; exit"  SIGINT

#IMPRIMIMOSd La INFO y UN BANNER ESTETICO

printf "\n🎉 Todo está andando \n"
printf "🦀 Backend PID: %d\n" "$BACKEND_PID"
printf "⚛️ Frontend PID: %d\n" "$FRONTEND_PID"
printf "\n🧘 Presiona Ctrl+C para cerrar ambos servicios con gratitud.\n"
printf "🪄 Usa este comando si necesitas cerrar manualmente:\n"
printf "   kill %d %d\n" "$BACKEND_PID" "$FRONTEND_PID"
# BANNER:
printf "\n✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨\n"
printf "✨   GRACIAS, TEN UNA BONITA TARDE   ✨\n"
printf "✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨\n"


# NOS QUEDAMOS ESPERANDO LOS PROCESOS.
wait $BACKEND_PID
wait $FRONTEND_PID
