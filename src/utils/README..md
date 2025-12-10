# Logger Centralizado – Portal ERM

## Descripción

El Portal ERM solía usar `console.log` y `console.error` de manera dispersa, lo que dificultaba:

- Mantenimiento del código.
- Control de logs en producción.
- Integración con servicios externos de monitoreo y trazabilidad.

Este Logger centralizado:

- Gestiona todos los logs de manera consistente.
- Permite activar/desactivar logs según el entorno (desarrollo o producción).
- Incluye metadata útil: timestamp, contexto y nivel de severidad.
- Facilita la futura integración con servicios externos (Sentry, LogRocket, etc.).

---
