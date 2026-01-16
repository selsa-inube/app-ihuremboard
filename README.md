# Single Page App - Starter

## Usage

This project is just a template for starting new SPA applications. It includes just the basic dependencies necessary to start a new project.

## Dependencies

1. Vite with the react+typescript template
2. Prettier as default formatter
3. ESLint as its default linter.
4. Commitlint for checking the structure of commit messages.
5. Husky for running git hooks (configured initially for commit-msg and pre-commit git hooks).
6. lint-staged for automatically running ESLint and after it Prettier in the pre-commit hook.

Esto **cumple con los estándares de documentación técnica** para APIs y hooks internos.

1. **Descripción del hook/servicio:**  
   Ej: `usePortalData` obtiene los datos del portal de staff por código de portal.

2. **Parámetros y tipos:**

   - `codeParame: string`
   - `preAuth?: boolean` (para indicar si se llama antes del login)

3. **Retorno:**  
   Qué devuelve el hook: `{ portalData, hasError, isFetching }`.

4. **Headers usados:**

   - Con token: `Authorization: Bearer <token>`
   - PreAuth: `Authorization: ""`

5. **Errores y códigos:**

   - `ERROR_CODE_NO_PORTAL_DATA = 1001` → descripción y solución
   - `ERROR_CODE_FETCH_PORTAL_FAILED = 1016` → descripción y solución

6. **Flujo de ejecución:**

   - Se llama `getHeaders()` si hay usuario autenticado
   - Si falla, fallback a `getPreAuthHeaders()`
   - Se llama al servicio de backend con esos headers
   - Se maneja resultado y errores, mostrando modales cuando corresponde

7. **Integración con IAuth:**
   - Se debe usar dentro de `IAuthProvider`
   - PreAuth funciona sin `IAuthProvider`

---

**Descripción:**  
Obtiene los datos del portal de staff según un código de portal.

**Parámetros:**

- `codeParame: string` → Código público del portal de staff.

**Retorno:**

- `portalData: IStaffPortalByBusinessManager` → Datos del portal
- `hasError: number | null` → Código de error si ocurre
- `isFetching: boolean` → Estado de carga

**Headers HTTP:**

- Con autenticación: `Authorization: Bearer <token>`
- PreAuth: `Authorization: ""` (sin token)

**Errores manejados:**

- `ERROR_CODE_NO_PORTAL_DATA = 1001`
- `ERROR_CODE_FETCH_PORTAL_FAILED = 1016`

**Notas:**

- Se integra con `IAuthProvider`
- Muestra errores usando `modalErrorConfig` y `useErrorModal`
