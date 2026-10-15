---
description: Levanta el servidor local y dice dónde mirar
---
Arranca el servidor de desarrollo de `calendario/` en segundo plano
(`npm run arranca`, o `python3 -m http.server 8080` desde la raíz del repo si npm falla).

Después:
1. Comprueba con `curl -sI http://localhost:8080/calendario/` que responde 200.
2. Dime la dirección exacta a abrir: `http://localhost:8080/calendario/`.
3. Si el puerto 8080 está ocupado, usa el 8081 y dímelo.
4. Deja el servidor corriendo. No lo mates al terminar.
