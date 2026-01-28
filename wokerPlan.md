# 📋 Plan de Trabajo - Mejora de la Aplicación

**Proyecto:** Dosis de Marketing  
**Versión:** 1.0  
**Fecha:** Enero 2026  
**Stack:** Next.js 16 + React 19 + TypeScript + Supabase

---

## 📊 Análisis Actual del Proyecto

### ✅ Fortalezas Identificadas

- ✓ Arquitectura moderna con Next.js 13+ (App Router)
- ✓ TypeScript completo para tipado estático
- ✓ Autenticación segura con Supabase
- ✓ Stack UI moderno (Radix UI + Tailwind CSS)
- ✓ Editor WYSIWYG integrado (TipTap)
- ✓ Componentes bien organizados y modulares
- ✓ Server Actions para manejo seguro del backend
- ✓ Validaciones con Zod

### ⚠️ Áreas de Mejora Identificadas

- ✅ ~~Sin Testing automatizado~~ **COMPLETADO** - 55.84% cobertura
- ✅ ~~Sin Prettier/ESLint~~ **COMPLETADO** - Configurado
- ✅ ~~Sin pre-commit hooks~~ **COMPLETADO** - Husky configurado
- ⚠ Falta de métricas de rendimiento y monitoreo
- ⚠ Documentación de API incompleta
- ⚠ No hay manejo de errores centralizado
- ⚠ Falta de caching estratégico
- ⚠ Sin rate limiting en acciones sensitivas
- ⚠ Validación de permiso incompleta en algunas áreas
- ⚠ Falta de logging y debugging tools
- ⚠ No hay estrategia de backup/disaster recovery
- ⚠ Rendimiento de imágenes sin optimización
- ⚠ Falta de PWA features (offline, push)
- ⚠ No hay CI/CD configurado
- ⚠ Falta de análisis de seguridad

---

## 🎯 Plan de Trabajo Detallado

### FASE 1: Fundamentos y Calidad (Semanas 1-2)

#### 1.1 Testing Automatizado

**Prioridad:** 🔴 ALTA  
**Estimación:** 8 horas  
**Estado:** ✅ 100% COMPLETADO

- [x] Instalar Jest + React Testing Library
- [x] Configurar jest.config.ts
- [x] Crear estructura de tests (**tests**)
- [x] Tests unitarios para componentes comunes (button: 3 tests)
- [x] Tests para validaciones (Zod schemas: 7 tests)
- [x] Tests para utilidades (sanitize: 7 tests)
- [x] Cobertura alcanzada: 55.84%
- [x] Script de test en package.json
- [x] Instalar @jest/types, ts-jest, ts-node
- [x] Crear jest.setup.ts
- [x] 17 tests implementados y pasando

**Dependencias:**

**Dependencias Instaladas:** ✅

```json
{
  "devDependencies": {
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "jest": "^30.2.0",
    "jest-environment-jsdom": "^30.2.0"
  }
}
```

**Dependencias Adicionales Instaladas:** ✅

- ✅ framer-motion (^12.29.2) - Para animaciones UI
- ✅ date-fns (^4.1.0) - Manipulación de fechas
- ✅ react-hook-form (^7.71.1) - Gestión de formularios
- ✅ @vercel/analytics (^1.6.1) - Analytics
- ✅ next-pwa (^5.6.0) - Progressive Web App

**Archivos Creados:**

- ✅ `jest.config.ts` - Configurado
- ✅ `__tests__/components/common/button.test.tsx` - Creado (vacío, pendiente)
- ✅ `__tests__/lib/anitize.test.ts` - Creado (vacío, pendiente)
- ✅ `__tests__/validations/blog-validation.test.ts` - Creado (vacío, pendiente)

**Próximas Tareas:**

- Implementar tests en los archivos creados
- Agregar script "test" en package.json
- Agregar coverage reports

---

#### 1.2 Configuración de Linting y Formateo

**Prioridad:** 🔴 ALTA  
**Estimación:** 4 horas  
**Estado:** ✅ 100% COMPLETADO

- [x] Mejorar configuración ESLint (adicionar más reglas)
- [x] Instalar Prettier (^3.8.1)
- [x] Configurar pre-commit hooks (husky ^9.1.7)
- [x] Añadir scripts de lint/format
- [x] Instalar lint-staged (^16.2.7)
- [x] Crear .prettierrc y .prettierignore
- [x] Crear .husky/pre-commit hook
- [x] Configurar lint-staged en package.json
- [x] Agregar scripts: lint:fix, format, format:check

**Archivos Creados/Modificados:**

- ✅ `eslint.config.mjs` - Expandido con nuevas reglas
- ✅ `.prettierrc` - Creado
- ✅ `.prettierignore` - Creado
- ✅ `.husky/pre-commit` - Creado
- ✅ `package.json` - Actualizado con scripts y lint-staged

---

#### 1.3 Documentación de API y Funciones

**Prioridad:** 🟡 MEDIA  
**Estimación:** 6 horas

- [ ] Documentar Server Actions con JSDoc
- [ ] Documentar hooks personalizados
- [ ] Crear guía de tipos TypeScript
- [ ] Documentar patrones de error handling

**Ejemplo de formato:**

```typescript
/**
 * Crea un nuevo artículo de blog
 * @param data - Datos del blog validados
 * @returns {Promise<BlogData>} Artículo creado
 * @throws {ValidationError} Si los datos no son válidos
 * @throws {DatabaseError} Si hay error al guardar
 */
export async function createBlog(data: ValidatedBlogData): Promise<BlogData>;
```

---

## ✅ FASE 2: Linting y Formateo - 100% COMPLETADO

#### 2.1 Instalación de Dependencias ✅ 100%

- [x] Prettier (^3.8.1)
- [x] Husky (^9.1.7)
- [x] lint-staged (^16.2.7)

#### 2.2 Configuración de Prettier ✅ 100%

- [x] Crear .prettierrc
- [x] Crear .prettierignore
- [x] Configurar printWidth, tabWidth, semicolons
- [x] Añadir script `format` a package.json
- [x] Añadir script `format:check` a package.json

#### 2.3 Mejora de ESLint ✅ 100%

- [x] Mejorar reglas en eslint.config.mjs
- [x] Agregar validación de react-hooks
- [x] Agregar reglas de no-console
- [x] Ignorar coverage y jest.setup.ts
- [x] Añadir script `lint:fix` a package.json

#### 2.4 Configuración de Husky ✅ 100%

- [x] Crear directorio .husky
- [x] Crear pre-commit hook
- [x] Configurar lint-staged en package.json
- [x] Conectar pre-commit a lint-staged

#### 2.5 Scripts de Linting ✅ 100%

```json
"lint": "eslint .",
"lint:fix": "eslint . --fix",
"format": "prettier --write .",
"format:check": "prettier --check .",
"prepare": "husky install"
```

---

## ✅ FASE 3: Error Handling - 100% COMPLETADO

#### 3.1 Manejo Centralizado de Errores ✅ 100%

- [x] Crear lib/errors.ts con clases de error
- [x] Implementar AppErrorClass base
- [x] Crear error específicos (ValidationError, UnauthorizedError, etc.)
- [x] Crear función toAppError() para normalizar errores
- [x] Crear función isAppError() para validar tipos

#### 3.2 Server Actions Error Handling ✅ 100%

- [x] Crear lib/server-error-handler.ts
- [x] Implementar withErrorHandling() wrapper
- [x] Crear throwIfError() para lanzar errores
- [x] Implementar getErrorMessage() y getErrorCode()
- [x] Crear ejemplos de uso en Server Actions

#### 3.3 React Error Handling ✅ 100%

- [x] Crear components/common/error-boundary.tsx
- [x] Implementar ErrorBoundary component
- [x] Crear DefaultErrorFallback UI
- [x] Añadir soporte para fallback personalizado

#### 3.4 Custom Hooks ✅ 100%

- [x] Crear hooks/useErrorHandler.ts
- [x] Implementar manejo de estado de error
- [x] Crear executeAsync para operaciones async
- [x] Integrar con AppError

#### 3.5 Tests para Error Handling ✅ 100%

- [x] Crear **tests**/lib/errors.test.ts
- [x] Tests para clases de error
- [x] Tests para toAppError()
- [x] Tests para isAppError()
- [x] 11 tests implementados y pasando

#### 3.6 Documentación JSDoc ✅ 100%

- [x] Crear docs/JSDOC_GUIDE.md
- [x] Documentar todas las funciones críticas
- [x] Incluir ejemplos de uso
- [x] Crear patrones de uso comunes
- [x] Documentar hooks y componentes

**Archivos Creados/Modificados:**

- ✅ `lib/errors.ts` - 160+ líneas de código de error handling
- ✅ `lib/server-error-handler.ts` - Middleware para Server Actions
- ✅ `components/common/error-boundary.tsx` - Error Boundary component
- ✅ `hooks/useErrorHandler.ts` - Custom hook para manejo de errores
- ✅ `__tests__/lib/errors.test.ts` - 11 tests implementados
- ✅ `lib/examples-error-handling.ts` - Ejemplos de uso
- ✅ `docs/JSDOC_GUIDE.md` - Documentación completa

**Métrica de Cobertura:**

- Tests anteriores: 55.84%
- Tests nuevos: 11 tests + 28 total
- Cobertura alcanzada: **64.91%** 📈

---

### FASE 4: Rate Limiting y Seguridad Avanzada (Semanas 3-4)

#### 4.1 Rate Limiting

**Prioridad:** 🔴 ALTA  
**Estimación:** 6 horas

- [ ] Crear middleware de error handling
- [ ] Implementar error boundaries
- [ ] Crear logger centralizado
- [ ] Definir tipos de errores personalizados

**Estructura:**

```
lib/
  ├── errors/
  │   ├── AppError.ts
  │   ├── ValidationError.ts
  │   ├── DatabaseError.ts
  │   └── AuthError.ts
  ├── logging/
  │   ├── logger.ts
  │   └── errorHandler.ts
```

---

#### 2.2 Rate Limiting y Validación de Permisos

**Prioridad:** 🔴 ALTA  
**Estimación:** 8 horas

- [ ] Implementar rate limiting en acciones sensitivas
- [ ] Crear middleware de permisos mejorado
- [ ] Validar permisos en todas las acciones críticas
- [ ] Log de acciones administrativas

**Acciones a proteger:**

- `createBlog`, `updateBlog`, `deleteBlog`
- `createCategory`, `updateCategory`, `deleteCategory`
- `deleteContact`, `updateContactStatus`
- `uploadFile`, `deleteFile`

---

#### 2.3 Optimización de Imágenes

**Prioridad:** 🟡 MEDIA  
**Estimación:** 5 horas

- [ ] Implementar Next.js Image component
- [ ] Configurar Supabase Storage para servir imágenes optimizadas
- [ ] Implementar lazy loading
- [ ] Agregar placeholder blur images

**Componentes a actualizar:**

- `about-biography.tsx`
- `blog-principal-publication-item.tsx`
- `service-card.tsx`
- `home-featured-services.tsx`

---

#### 2.4 Caching Estratégico

**Prioridad:** 🟡 MEDIA  
**Estimación:** 6 horas

- [ ] Implementar revalidate tags en Server Actions
- [ ] Cache de datos estáticos (servicios, categorías)
- [ ] Cache de búsquedas
- [ ] Cache en cliente (React Query o similar)

```typescript
// Ejemplo
revalidateTag("blogs");
revalidateTag("categories");
revalidatePath("/admin/blog");
```

---

### FASE 3: Monitoreo y DevOps (Semanas 5-6)

#### 3.1 Logging y Debugging

**Prioridad:** 🟡 MEDIA  
**Estimación:** 5 horas

- [ ] Instalar Winston o Pino para logging estructurado
- [ ] Integrar Sentry para error tracking
- [ ] Crear dashboard de logs
- [ ] Monitorear performance metrics

---

#### 3.2 CI/CD Pipeline

**Prioridad:** 🟡 MEDIA  
**Estimación:** 6 horas

- [ ] Configurar GitHub Actions
- [ ] Workflow de build automático
- [ ] Tests en cada PR
- [ ] Deploy automático a staging
- [ ] Pre-deployment checks

**Archivo:** `.github/workflows/ci-cd.yml`

---

#### 3.3 Configuración de Backup y Disaster Recovery

**Prioridad:** 🟡 MEDIA  
**Estimación:** 4 horas

- [ ] Backup automático de Supabase (verificar opciones)
- [ ] Documentar plan de recuperación
- [ ] Crear scripts de backup manual
- [ ] Verificar integridad de backups

---

### FASE 4: Features y UX (Semanas 7-8)

#### 4.1 Progressive Web App (PWA)

**Prioridad:** 🟢 BAJA  
**Estimación:** 8 horas

- [ ] Instalar `next-pwa`
- [ ] Crear manifest.json
- [ ] Implementar service worker
- [ ] Agregar offline support
- [ ] Push notifications

---

#### 4.2 SEO Improvements

**Prioridad:** 🟡 MEDIA  
**Estimación:** 6 horas

- [ ] Implementar Open Graph metadata
- [ ] Sitemap dinámico
- [ ] Schema.org structured data
- [ ] Meta tags dinámicos para blogs

---

#### 4.3 Mejoras de UX/UI

**Prioridad:** 🟡 MEDIA  
**Estimación:** 10 horas

- [ ] Dark mode mejorado (persistencia de tema)
- [ ] Animaciones suaves (Framer Motion)
- [ ] Loading states mejorados
- [ ] Skeletons para placeholders
- [ ] Toast notifications mejoradas
- [ ] Drawer/Sheet para mobile

---

#### 4.4 Funcionalidades Avanzadas

**Prioridad:** 🟢 BAJA  
**Estimación:** 12 horas

- [ ] Búsqueda avanzada con filtros
- [ ] Exportar datos (CSV, PDF)
- [ ] Comments/Reviews en blogs
- [ ] Newsletter subscription
- [ ] Analytics integrado
- [ ] Scheduled posts

---

### FASE 5: Documentación y Mantenimiento (Semana 9)

#### 5.1 Documentación Completa

**Prioridad:** 🟡 MEDIA  
**Estimación:** 8 horas

- [ ] README mejorado con pasos de setup
- [ ] Documentación de deployment
- [ ] Guía de desarrollo (CONTRIBUTING.md)
- [ ] Troubleshooting guide
- [ ] API documentation con examples
- [ ] Video tutorial (opcional)

---

#### 5.2 Performance Audit

**Prioridad:** 🟡 MEDIA  
**Estimación:** 5 horas

- [ ] Lighthouse audit
- [ ] Bundle analysis (next/bundle-analyzer)
- [ ] Core Web Vitals optimization
- [ ] Database query optimization

---

## 📈 Roadmap Visual

```
FASE 1 (Semanas 1-2)     FASE 2 (Semanas 3-4)     FASE 3 (Semanas 5-6)
├─ Testing              ├─ Error Handling         ├─ Logging/Debugging
├─ Linting              ├─ Rate Limiting          ├─ CI/CD
├─ Documentación        ├─ Optimización Imágenes  └─ Backup
└─ Validación           └─ Caching

FASE 4 (Semanas 7-8)     FASE 5 (Semana 9)
├─ PWA                  ├─ Documentación Final
├─ SEO                  └─ Performance Audit
├─ UX/UI
└─ Features Avanzadas
```

---

## 🔄 Priorización por Impacto

### 🔴 CRÍTICO (Completar primero)

1. Testing automatizado
2. Error handling centralizado
3. Rate limiting y validación de permisos
4. CI/CD pipeline

### 🟡 IMPORTANTE (Completar segundo)

1. Logging y debugging
2. Documentación completa
3. Optimización de imágenes
4. Caching estratégico
5. SEO improvements

### 🟢 NICE-TO-HAVE (Completar según tiempo)

� Estado General del Proyecto

| Componente                 | Estado             | Progreso |
| -------------------------- | ------------------ | -------- |
| **FASE 1: Testing**        | **✅ COMPLETADO**  | **100%** |
| Jest Setup                 | ✅ Completado      | 100%     |
| RTL Setup                  | ✅ Completado      | 100%     |
| Tests Implementados (28)   | ✅ Completado      | 100%     |
| Test Coverage              | ✅ 64.91%          | 100%     |
| **FASE 2: Linting**        | **✅ COMPLETADO**  | **100%** |
| Prettier Setup             | ✅ Completado      | 100%     |
| ESLint Mejorado            | ✅ Completado      | 100%     |
| Husky Setup                | ✅ Completado      | 100%     |
| lint-staged                | ✅ Completado      | 100%     |
| **FASE 3: Error Handling** | **✅ COMPLETADO**  | **100%** |
| Error Classes              | ✅ Completado      | 100%     |
| Error Boundary             | ✅ Completado      | 100%     |
| useErrorHandler Hook       | ✅ Completado      | 100%     |
| Server Action Wrapper      | ✅ Completado      | 100%     |
| Error Tests (11)           | ✅ Completado      | 100%     |
| **FASE 4: Rate Limiting**  | **⏳ PENDIENTE**   | **0%**   |
| **FASE 5: Documentación**  | **⏳ PENDIENTE**   | **0%**   |
| **FASE 6: Performance**    | **⏳ PENDIENTE**   | **0%**   |
| **GENERAL**                | **🟢 EN PROGRESO** | **~40%** |

---

## �

1. PWA features
2. Funcionalidades avanzadas
3. Analytics
   x] Instalar Jest y configurar

- [x] Crear estructura de tests
- [ ] Implementar tests en los archivos creados
- [ ] Agregar script "test" en package.json

## 📋 Checklist de Tareas

### Sprint 1: Setup y Testing

- [ ] Instalar Jest y configurar
- [ ] Crear primeros tests
- [ ] Configurar Prettier y Husky
- [ ] Documentar Server Actions

### Sprint 2: Seguridad

- [ ] Implementar error handling
- [ ] Rate limiting en acciones
- [ ] Validación de permisos mejorada
- [ ] Logging centralizado

### Sprint 3: Performance

- [ ] Optimización de imágenes
- [ ] Implementar caching
- [ ] Bundle analysis
- [ ] Lighthouse audit

### Sprint 4: DevOps

- [ ] CI/CD pipeline
- [ ] Backup strategy
- [ ] Monitoring setup

### Sprint 5: Features

- [ ] PWA setup
- [ ] SEO improvements
- [ ] UX/UI enhancements

### Sprint 6: Documentación

- [ ] README actualizado
- [ ] Deployment guide
- [ ] API documentation
- [ ] Contributing guide

---

## 🛠️ Herramientas Recomendadas

### Testing

- Jest
- React Testing Library
- Playwright (e2e)

### Logging & Monitoring

- Sentry
- Winston/Pino
- LogRocket (optional)

### Performance

- Bundle Analyzer
- Lighthouse CI
- WebPageTest

### DevOps

- GitHub Actions
- Vercel (deployment)
- Supabase CLI

### Documentation

- Storybook
- API docs (OpenAPI/Swagger)
- Docusaurus

---

## 📞 Notas Adicionales

### Dependencias Recomendadas a Instalar

```bash
# Testing
pnpm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom

# Logging
pnpm install winston sentry-nextjs

# PWA
pnpm install next-pwa

# Analytics
pnpm install @vercel/analytics

# Date handling (si no está)
pnpm install date-fns

# Form management (si no está)
pnpm install react-hook-form

# Animations
pnpm install framer-motion
```

### Configuraciones a Verificar

- [ ] Environment variables documentation
- [ ] Supabase RLS policies
- [ ] Database constraints
- [ ] Rate limiting strategy
- [ ] CORS configuration

### Security Checklist

- [ ] CORS headers correctos
- [ ] CSP headers
- [ ] HTTPS enforced
- [ ] Secrets management
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF tokens
- [ ] Input validation

---

## 📊 Métricas de Éxito

| Métrica          | Meta    | Actual |
| ---------------- | ------- | ------ |
| Test Coverage    | 80%     | %      |
| Lighthouse Score | 90+     | -      |
| Performance: LCP | < 2.5s  | -      |
| Uptime           | 99.9%   | -      |
| Error Rate       | < 0.1%  | -      |
| Response Time    | < 200ms | -      |

---

## 🔗 Referencias y Recursos

### Documentación Oficial

- [Next.js 16 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Supabase Docs](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Testing

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright](https://playwright.dev/)

### Performance

- [Web Vitals](https://web.dev/vitals)
- [Next.js Performance](https://nextjs.org/learn/seo/rendering)

---

**Próximos Pasos:** Comenzar con FASE 3 (Error Handling). Estimar 2-3 semanas para completar todas las fases.

**Última actualización:** Enero 28, 2026 - 10:50 PM

---

## 📋 Resumen de Sesión Actual

### ✅ Completado en esta sesión

1. **Testing Setup (FASE 1)** - 100%
   - Instalación de Jest, RTL, ts-jest, ts-node
   - Configuración de jest.config.ts y jest.setup.ts
   - Implementación de 17 tests (button, sanitize, blog-validation)
   - Cobertura alcanzada: 55.84%

2. **Linting y Formateo (FASE 2)** - 100%
   - Instalación de Prettier (^3.8.1)
   - Instalación de Husky (^9.1.7)
   - Instalación de lint-staged (^16.2.7)
   - Creación de .prettierrc y .prettierignore
   - Configuración de pre-commit hooks
   - Mejora de ESLint rules
   - Nuevos scripts: format, format:check, lint:fix

### 📊 Cambios en package.json

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "jest",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch",
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,yml,yaml}": ["prettier --write"]
  }
}
```

### 🎯 Archivos Creados/Modificados

- ✅ `.prettierrc` - Configuración de Prettier
- ✅ `.prettierignore` - Archivos ignorados por Prettier
- ✅ `.husky/pre-commit` - Hook de pre-commit
- ✅ `eslint.config.mjs` - Mejorado con nuevas reglas
- ✅ `package.json` - Actualizado con scripts y lint-staged
- ✅ `wokerPlan.md` - Actualizado con progreso

### 📈 Progreso General

```
FASE 1: Testing ......................... 100% ✅ COMPLETADO
├─ Jest Setup .......................... 100% ✅
├─ RTL Setup ........................... 100% ✅
├─ Tests Implementados (17) ............ 100% ✅
└─ Coverage (55.84%) ................... 100% ✅

FASE 2: Linting ........................ 100% ✅ COMPLETADO
├─ Prettier Setup ...................... 100% ✅
├─ ESLint Mejorado ..................... 100% ✅
├─ Husky Setup ......................... 100% ✅
└─ lint-staged ......................... 100% ✅

FASE 3: Error Handling ................ 0% ⏳ PENDIENTE
FASE 4: Documentación ................. 0% ⏳ PENDIENTE
FASE 5: Performance ................... 0% ⏳ PENDIENTE

PROGRESO TOTAL: ~30% 🟢
```

### 🚀 Próximas Acciones Recomendadas

1. **Verificar pre-commit hooks:**

   ```bash
   git add .
   git commit -m "feat: add testing and linting setup"
   ```

2. **Ejecutar verificaciones de código:**

   ```bash
   pnpm lint:fix
   pnpm format
   pnpm test -- --coverage
   ```

3. **Comenzar FASE 3 (Error Handling):**
   - Crear error middleware
   - Implementar error boundaries en React
   - Centralizar manejo de errores en Server Actions

4. **Aumentar cobertura a 60%+:**
   - Agregar más tests para componentes críticos
   - Tests para Server Actions
   - Tests de integración

---

**Próximos Pasos:** Comenzar con FASE 3 (Error Handling). Estimar 2-3 semanas para completar todas las fases.

**Última actualización:** Enero 28, 2026 - 10:50 PM
