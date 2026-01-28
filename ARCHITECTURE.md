# 📋 Documentación de Arquitectura - Dosis de Marketing

**Versión:** 1.0  
**Última actualización:** Enero 2026  
**Stack:** Next.js 16 + React 19 + TypeScript + Supabase

---

## 📑 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Arquitectura y Estructura](#arquitectura-y-estructura)
4. [Autenticación y Seguridad](#autenticación-y-seguridad)
5. [Base de Datos](#base-de-datos)
6. [Funcionalidades Principales](#funcionalidades-principales)
7. [Componentes](#componentes)
8. [Server Actions](#server-actions)
9. [Validaciones](#validaciones)
10. [Variables de Entorno](#variables-de-entorno)
11. [Instalación y Ejecución](#instalación-y-ejecución)
12. [Flujos Principales](#flujos-principales)
13. [Mejores Prácticas](#mejores-prácticas)

---

## 📱 Descripción General

**Dosis de Marketing** es una aplicación web profesional full-stack diseñada como:

- **Sitio corporativo/Portafolio** para una agencia de marketing digital
- **CMS integrado** para gestión de contenido (blog, servicios, categorías)
- **Sistema de contacto** para captura de clientes potenciales
- **Panel administrativo** protegido con autenticación
- **Gestor de archivos multimedia** integrado

### Características Clave

✅ Interfaz responsiva y moderna  
✅ Sistema CMS para blogs y servicios  
✅ Panel administrativo protegido  
✅ Autenticación y sesiones seguras  
✅ Editor WYSIWYG para contenido enriquecido  
✅ Gestión de archivos con compresión automática  
✅ Búsqueda y paginación de contenido  
✅ Validaciones robustas en cliente y servidor  
✅ Formulario de contacto con persistencia  
✅ Notificaciones en tiempo real

---

## 🛠️ Stack Tecnológico

### Frontend

| Tecnología       | Versión | Propósito                   |
| ---------------- | ------- | --------------------------- |
| **Next.js**      | 16.1.1  | Framework React con SSR/SSG |
| **React**        | 19.2.3  | Librería UI principal       |
| **TypeScript**   | 5.x     | Tipado estático             |
| **Tailwind CSS** | 4.x     | Utilidades de estilos       |
| **Radix UI**     | Latest  | Componentes accesibles      |
| **Lucide React** | 0.544   | Iconografía                 |

### Edición de Contenido

| Librería               | Versión   | Uso                   |
| ---------------------- | --------- | --------------------- |
| **TipTap**             | 3.15-3.16 | Editor WYSIWYG        |
| \*_@tiptap/extension-_ | 3.x       | Extensiones de TipTap |
| **sanitize-html**      | 2.17      | Sanitización de HTML  |

### Backend & Base de Datos

| Servicio                  | Versión | Función                     |
| ------------------------- | ------- | --------------------------- |
| **Supabase**              | Latest  | PostgreSQL + Auth + Storage |
| **@supabase/ssr**         | Latest  | Server-side auth            |
| **@supabase/supabase-js** | 2.80.0  | Cliente JS                  |

### Validación & Utilidades

| Librería         | Uso                               |
| ---------------- | --------------------------------- |
| **Zod**          | Validación de esquemas TypeScript |
| **React Table**  | Gestión avanzada de tablas        |
| **Sonner**       | Notificaciones/Toasts             |
| **uuid**         | Generación de IDs únicos          |
| **use-debounce** | Debouncing en búsquedas           |

### Procesamiento de Archivos

- **browser-image-compression** - Compresión de imágenes en cliente
- **Supabase Storage** - Almacenamiento en la nube

---

## 🏗️ Arquitectura y Estructura

### Estructura de Directorios

```
project_customer_info/
├── app/                              # Rutas de Next.js 13+ (App Router)
│   ├── (home)/                       # Grupo de rutas públicas
│   │   ├── page.tsx                  # Home/Landing page
│   │   ├── about/page.tsx            # Página acerca de
│   │   ├── blog/page.tsx             # Listado de blogs
│   │   ├── blog/[blogid]/            # Detalle de blog
│   │   ├── services/page.tsx         # Listado de servicios
│   │   └── contacts/page.tsx         # Página de contacto
│   │
│   ├── (protected)/                  # Grupo de rutas protegidas
│   │   ├── layout.tsx                # Layout para admin
│   │   └── admin/                    # Panel administrativo
│   │       ├── page.tsx              # Dashboard
│   │       ├── blog/                 # Gestión de blogs
│   │       ├── category/             # Gestión de categorías
│   │       ├── contact/              # Listado de contactos
│   │       └── files/                # Gestor de archivos
│   │
│   ├── auth/                         # Autenticación
│   │   ├── login/page.tsx            # Página de login
│   │   └── callback/route.ts         # OAuth callback
│   │
│   ├── layout.tsx                    # Layout raíz
│   └── globals.css                   # Estilos globales
│
├── components/                       # Componentes React reutilizables
│   ├── admin/                        # Componentes del panel admin
│   │   ├── admin-header.tsx
│   │   ├── admin-sidebar.tsx
│   │   ├── admin-blog/
│   │   ├── category/
│   │   └── contact/
│   │
│   ├── blog/                         # Componentes de blog
│   │   ├── blog-details.tsx
│   │   ├── blog-pagination.tsx
│   │   └── blog-*.tsx
│   │
│   ├── common/                       # Componentes reutilizables
│   │   ├── form-error.tsx            # Mostrar errores
│   │   ├── upload-file.tsx           # Upload de archivos
│   │   ├── pagination.tsx            # Paginación
│   │   ├── search.tsx                # Búsqueda
│   │   └── ...
│   │
│   ├── services/                     # Componentes de servicios
│   ├── contact/                      # Componentes de contacto
│   ├── about/                        # Componentes de about
│   ├── home/                         # Componentes del home
│   ├── layout/                       # Header, Footer
│   └── ui/                           # Componentes base (button, input, etc)
│
├── actions/                          # Server Actions
│   ├── blog-action.ts                # CRUD de blogs
│   ├── category-action.ts            # CRUD de categorías
│   ├── contact-action.ts             # Manejo de contactos
│   ├── service-action.ts             # CRUD de servicios
│   ├── proccess-file-action.ts       # Subida de archivos
│   └── service-auth.ts               # Autenticación
│
├── lib/                              # Utilidades compartidas
│   ├── utils.ts                      # Funciones utilitarias
│   ├── sanitize.ts                   # Sanitización de HTML
│   └── supabase/
│       ├── client.ts                 # Cliente Supabase (browser)
│       ├── server.ts                 # Cliente Supabase (server)
│       └── middleware.ts             # Middleware de autenticación
│
├── types/                            # Tipos TypeScript
│   ├── blog.ts
│   ├── category.ts
│   ├── contact.ts
│   ├── service.ts
│   ├── image-files.ts
│   └── ...
│
├── validations/                      # Esquemas de validación (Zod)
│   ├── blog-validation.ts
│   ├── contact-validation.ts
│   └── form-state.ts
│
├── hooks/                            # Hooks personalizados
├── styles/                           # Estilos adicionales
├── public/                           # Archivos estáticos
│   └── images/                       # Imágenes del proyecto
│
├── next.config.ts                    # Configuración Next.js
├── tsconfig.json                     # Configuración TypeScript
├── tailwind.config.ts                # Configuración Tailwind
├── postcss.config.mjs                # Configuración PostCSS
├── package.json                      # Dependencias
└── README.md                         # Documentación principal
```

### Patrón de Arquitectura

La aplicación sigue el **patrón de arquitectura moderno de Next.js 13+**:

```
┌─────────────────────────────────────────────────┐
│         Interfaz de Usuario (Components)        │
│  - Server Components (por defecto)              │
│  - Client Components (interactividad)           │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│       Server Actions (Operaciones)              │
│  - Validación con Zod                           │
│  - Comunicación con Supabase                    │
│  - Gestión de errores                           │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│    Supabase (Backend as a Service)              │
│  - PostgreSQL Database                          │
│  - Autenticación                                │
│  - File Storage                                 │
└─────────────────────────────────────────────────┘
```

---

## 🔐 Autenticación y Seguridad

### Flujo de Autenticación

```
┌─────────────────────────────────────────────────┐
│  Usuario accede a /admin (ruta protegida)       │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
      ┌────────────────────────────┐
      │ Middleware (proxy.ts)       │
      │ Valida JWT en cookies       │
      └────────┬───────────────────┘
               │
      ┌────────┴───────────┐
      │                    │
   Token Válido        Token Inválido
      │                    │
      ▼                    ▼
   Acceso          Redirige a
   Permitido        /auth/login
```

### Componentes de Seguridad

#### 1. **Middleware de Protección** (`proxy.ts`)

```typescript
// Protege rutas: /admin, /profile, /settings
// Valida JWT token en header Authorization
// Redirige a /auth/login si no está autenticado
// Utiliza getClaims() para validar sesión
```

#### 2. **Gestión de Sesiones**

- **Cookies seguras** con JWT tokens
- **HTTP-only cookies** para prevenir XSS
- **Validación en cada solicitud** a rutas protegidas
- **Token refresh automático** con Supabase

#### 3. **Server Actions Seguros**

- Todas las operaciones sensibles ocurren en servidor
- Validación de usuario en cada action
- Prevención de CSRF integrada en Next.js
- No exponen credenciales en cliente

#### 4. **Sanitización de Contenido**

```typescript
// sanitize-html se usa en artículos del blog
// Previene inyección de scripts (XSS)
// Permite solo etiquetas HTML seguras
```

### Variables de Autenticación

| Variable                        | Descripción                   |
| ------------------------------- | ----------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | URL de Supabase               |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública de Supabase     |
| `SUPABASE_SERVICE_ROLE_KEY`     | Clave privada (solo servidor) |

---

## 💾 Base de Datos

### Tablas Principales

#### 1. **Tabla `blogs`**

```sql
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  article_body TEXT NOT NULL,
  main_topic VARCHAR(255),
  category_id INT REFERENCES categories(id),
  published_in TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Campos:**

- `id` - Identificador único
- `title` - Título del artículo (5-200 caracteres)
- `article_body` - Contenido HTML del artículo
- `main_topic` - Tema principal (2-100 caracteres)
- `category_id` - FK a categorías
- `published_in` - Fecha de publicación
- `created_at` - Fecha de creación
- `updated_at` - Última modificación

#### 2. **Tabla `categories`**

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Campos:**

- `id` - Identificador único
- `name` - Nombre de la categoría
- `created_at` - Fecha de creación

#### 3. **Tabla `services`**

```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  color VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Campos:**

- `id` - UUID único
- `icon` - Nombre del icono (Lucide)
- `name` - Nombre del servicio
- `description` - Descripción
- `color` - Color para la UI
- `created_at` - Fecha de creación

#### 4. **Tabla `contacts`**

```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Campos:**

- `id` - UUID único
- `name` - Nombre del contacto
- `email` - Email de contacto
- `message` - Mensaje enviado
- `created_at` - Fecha de creación

#### 5. **Tabla `image_files`**

```sql
CREATE TABLE image_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  image_path VARCHAR(500) NOT NULL,
  mime_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Campos:**

- `id` - UUID único
- `name` - Nombre del archivo
- `image_path` - Ruta en Supabase Storage
- `mime_type` - Tipo MIME
- `created_at` - Fecha de creación

#### 6. **Tabla `featured_blogs`** (opcional)

```sql
CREATE TABLE featured_blogs (
  id SERIAL PRIMARY KEY,
  blog_id INT REFERENCES blogs(id),
  featured_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Relaciones

```
categories
  ├── 1 ─────── M : blogs

services
  └── (no relaciones)

contacts
  └── (no relaciones)

image_files
  └── (no relaciones)
```

### Storage (Archivos)

**Bucket: `images`**

- Almacena imágenes y PDFs
- Acceso público (URLs públicas)
- Soporta: jpg, jpeg, png, webp, pdf
- Límite: 5MB por archivo (comprimido a 1MB en cliente)

---

## 🎯 Funcionalidades Principales

### 1. 🏠 Home Page

**Ubicación:** `/` (root)

**Componentes:**

- `home-title.tsx` - Título y CTA principal
- `home-carousel.tsx` - Carrusel de imágenes
- `home-featured-services.tsx` - Los 3 últimos servicios

**Características:**

- Landing page moderna
- Hero section con gradient
- Servicios destacados
- Responsive design

### 2. 📚 Blog

**Ubicación pública:** `/blog`  
**Admin:** `/admin/blog`

**Funcionalidades públicas:**

- ✅ Listado de artículos paginado
- ✅ Búsqueda por título
- ✅ Filtrado por categoría
- ✅ Vista detallada de artículo

**Funcionalidades admin:**

- ✅ Crear artículo con editor WYSIWYG
- ✅ Editar artículo existente
- ✅ Eliminar artículo
- ✅ Tabla con búsqueda y paginación
- ✅ Asignar categoría
- ✅ Programar publicación

**Validaciones:**

```typescript
BlogFormSchema = {
  title: "string | 5-200 caracteres",
  article_body: "string | mín. 20 caracteres",
  main_topic: "string | 2-100 caracteres",
  category_id: "number | opcional",
  published_in: "date | opcional",
};
```

**Componentes clave:**

- `AdminBlogForm` - Formulario crear/editar
- `AdminBlogTable` - Tabla de blogs
- `BlogDetails` - Vista de artículo
- `BlogPagination` - Control de paginación

### 3. 🛠️ Servicios

**Ubicación pública:** `/services`  
**Admin:** `/admin/service`

**Funcionalidades:**

- ✅ Listado de servicios
- ✅ CRUD completo (admin)
- ✅ Selección de iconos (Lucide)
- ✅ Asignación de color personalizado

**Datos del servicio:**

```typescript
interface Service {
  id: string (UUID);
  icon: string (nombre Lucide);
  name: string;
  description: string;
  color: string (hex o nombre Tailwind);
}
```

**Componentes:**

- `ServiceCard` - Tarjeta de servicio
- `ServiceView` - Vista detallada
- `home-featured-services` - 3 últimos servicios

### 4. 📮 Contacto

**Ubicación:** `/contacts`

**Funcionalidades:**

- ✅ Formulario de contacto
- ✅ Validación de campos
- ✅ Persistencia en BD
- ✅ Notificación de éxito
- ✅ Admin: Listado de contactos

**Validaciones:**

```typescript
ContactFormSchema = {
  name: "string | 2-100 caracteres",
  email: "string | formato email válido",
  message: "string | 10-1000 caracteres",
};
```

**Componentes:**

- `ContactForm` - Formulario principal
- Admin: Tabla de contactos recibidos

### 5. 👤 About/Acerca de

**Ubicación:** `/about`

**Componentes:**

- `about-title.tsx` - Título y descripción
- `about-biography.tsx` - Biografía
- `about-content.tsx` - Contenido adicional
- `about-skill.tsx` - Habilidades

### 6. 🔧 Panel Administrativo

**Ubicación:** `/admin` (protegida)

**Estructura:**

```
/admin
├── / (dashboard)
├── /blog
│   ├── Listado
│   └── Crear/Editar
├── /category
│   ├── Listado
│   └── Crear/Editar
├── /contact
│   └── Listado
└── /files
    ├── Listado
    ├── Subir archivo
    └── Descargar/Eliminar
```

**Componentes:**

- `AdminLayout` - Layout principal
- `AdminSidebar` - Navegación lateral
- `AdminHeader` - Encabezado
- Tablas con búsqueda, paginación, acciones

### 7. 📁 Gestor de Archivos

**Ubicación:** `/admin/files`

**Funcionalidades:**

- ✅ Subida de imágenes y PDFs
- ✅ Compresión automática (máx 1MB)
- ✅ Generación de URLs públicas
- ✅ Eliminación de archivos
- ✅ Listado de archivos subidos

**Proceso de subida:**

```
Usuario selecciona archivo
        │
        ▼
Validar tipo MIME (jpg, png, webp, pdf)
        │
        ▼
Comprimir (si es imagen)
        │
        ▼
Subir a Supabase Storage (/images bucket)
        │
        ▼
Guardar metadatos en tabla image_files
        │
        ▼
Retornar URL pública
```

**Límites:**

- Tamaño: 5MB entrada, 1MB comprimido
- Formatos: jpg, jpeg, png, webp, pdf
- Almacenamiento: Supabase Storage

---

## 🧩 Componentes

### Componentes Comunes Reutilizables

#### `FormError`

Mostrar errores de validación de formularios.

```tsx
<FormError error={errors?.fieldName?.[0]} />
```

#### `UploadFile`

Componente de subida con drag-and-drop.

```tsx
<UploadFile onFileSelect={handleFileSelect} />
```

#### `Pagination`

Control de paginación.

```tsx
<Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
```

#### `Search`

Campo de búsqueda con debounce.

```tsx
<Search placeholder="Buscar..." onSearch={handleSearch} />
```

#### `IconMap` (icon-map-lucide.tsx)

Renderizador de iconos Lucide con validación.

```tsx
<IconMap iconName="Heart" size={24} color="red" />
```

### Componentes de Administración

- `AdminLayout` - Layout general del admin
- `AdminSidebar` - Navegación lateral
- `AdminHeader` - Encabezado con info del usuario
- `AdminBlogForm` - CRUD de blogs
- `AdminBlogTable` - Tabla de blogs
- Similares para categorías, contactos, etc.

### Componentes del Blog

- `BlogDetails` - Vista detallada de artículo
- `BlogPagination` - Control de paginación
- `BlogPrincipalPublication` - Artículo destacado
- `BlogSecundaryArticles` - Listado secundario

---

## ⚙️ Server Actions

### Ubicación: `actions/`

Las Server Actions son funciones que se ejecutan en servidor y se pueden invocar desde componentes cliente.

### 1. **blog-action.ts**

#### `GetBlogs()`

Obtiene listado de blogs con búsqueda y paginación.

```typescript
GetBlogs(
  search?: string,
  page?: number,
  pageSize?: number
): Promise<{ blogs: Blog[], total: number }>
```

#### `GetBlogById()`

Obtiene un blog específico por ID.

```typescript
GetBlogById(id: number): Promise<Blog>
```

#### `createBlog()`

Crea un nuevo artículo.

```typescript
createBlog(data: BlogFormData): Promise<{ success: boolean, errors?: FieldErrors }>
```

#### `updateBlog()`

Actualiza un artículo existente.

```typescript
updateBlog(id: number, data: BlogFormData): Promise<{ success: boolean }>
```

#### `deleteBlog()`

Elimina un artículo.

```typescript
deleteBlog(id: number): Promise<{ success: boolean }>
```

### 2. **service-action.ts**

#### `GetServices()`

Obtiene todos los servicios.

```typescript
GetServices(): Promise<Service[]>
```

#### `GetLatestServices()`

Obtiene los últimos 3 servicios.

```typescript
GetLatestServices(): Promise<Service[]>
```

#### `CreateService()` / `UpdateService()` / `DeleteService()`

Operaciones CRUD de servicios.

### 3. **category-action.ts**

#### `getCategories()`

Listado de categorías con paginación.

#### `getCategoryById()`

Obtiene una categoría específica.

#### `createCategory()` / `updateCategory()`

Crear y actualizar categorías.

### 4. **contact-action.ts**

#### `getContacts()`

Obtiene todos los contactos.

#### `contactRegister()`

Registra un nuevo contacto desde formulario.

```typescript
contactRegister(
  data: ContactFormData
): Promise<{ success: boolean, message?: string }>
```

### 5. **proccess-file-action.ts**

#### `ProcessUploadedFile()`

Procesa y sube archivo a Supabase Storage.

```typescript
ProcessUploadedFile(
  file: File
): Promise<{ success: boolean, url?: string, error?: string }>
```

#### `GetPublicFileUrl()`

Obtiene URL pública de un archivo.

#### `DeleteFile()`

Elimina un archivo de Storage.

### 6. **service-auth.ts**

#### `signNewUser()`

Registra nuevo usuario.

#### `signInUser()`

Inicia sesión.

```typescript
signInUser(
  email: string,
  password: string
): Promise<{ success: boolean, error?: string }>
```

#### `signOutUser()`

Cierra sesión y limpia cookies.

#### `getUserSession()`

Obtiene sesión actual del usuario.

---

## ✅ Validaciones

### Sistema de Validación

La aplicación usa **Zod** para validación de esquemas con TypeScript.

### Ubicación: `validations/`

#### **blog-validation.ts**

```typescript
const BlogFormSchema = z.object({
  title: z.string().min(5, "Mínimo 5 caracteres").max(200, "Máximo 200 caracteres"),

  article_body: z.string().min(20, "Mínimo 20 caracteres"),

  main_topic: z.string().min(2, "Mínimo 2 caracteres").max(100, "Máximo 100 caracteres").optional(),

  category_id: z.number().optional(),

  published_in: z.coerce.date().optional(),
});
```

#### **contact-validation.ts**

```typescript
const ContactFormSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres").max(100, "Máximo 100 caracteres"),

  email: z.string().email("Email inválido"),

  message: z.string().min(10, "Mínimo 10 caracteres").max(1000, "Máximo 1000 caracteres"),
});
```

#### **form-state.ts**

```typescript
export interface FieldErrors {
  [key: string]: string[] | undefined;
}

export interface FormState {
  success: boolean;
  message?: string;
  errors?: FieldErrors;
  data?: any;
}
```

### Patrón de Validación en Actions

```typescript
export async function createBlog(data: BlogFormData): Promise<FormState> {
  // 1. Validar datos
  const validationFields = BlogFormSchema.safeParse(data);

  if (!validationFields.success) {
    // 2. Retornar errores
    const flattenedErrors = z.flattenErrors(validationFields.error);
    return {
      success: false,
      errors: flattenedErrors.fieldErrors,
    };
  }

  // 3. Procesar datos
  const result = await supabase.from("blogs").insert([validationFields.data]);

  // 4. Retornar resultado
  return { success: !result.error, message: result.error?.message };
}
```

---

## 🔑 Variables de Entorno

### Archivo: `.env.local`

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Autenticación
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_AUTH_REDIRECT_URL=http://localhost:3000/auth/callback
```

### Variables Requeridas

| Variable                        | Ambiente | Descripción                         |
| ------------------------------- | -------- | ----------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Público  | URL del proyecto Supabase           |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Público  | Clave anónima de Supabase           |
| `SUPABASE_SERVICE_ROLE_KEY`     | Privado  | Clave de rol de servicio (servidor) |
| `NEXT_PUBLIC_SITE_URL`          | Público  | URL del sitio (para OAuth)          |
| `NEXT_PUBLIC_AUTH_REDIRECT_URL` | Público  | URL de callback de autenticación    |

### Cómo Obtener las Claves

1. Ir a [Supabase Console](https://app.supabase.com)
2. Seleccionar tu proyecto
3. Ir a **Settings → API**
4. Copiar:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

---

## 🚀 Instalación y Ejecución

### Requisitos Previos

- **Node.js** 18+ (recomendado 20 LTS)
- **pnpm** 8+ (o npm/yarn)
- Cuenta en **Supabase**
- Base de datos PostgreSQL configurada

### Instalación

#### 1. Clonar repositorio

```bash
git clone https://github.com/wgfs40/project_customer_info.git
cd project_customer_info
```

#### 2. Instalar dependencias

```bash
pnpm install
# o
npm install
```

#### 3. Configurar variables de entorno

```bash
# Copiar template
cp .env.example .env.local

# Editar .env.local con tus credenciales de Supabase
nano .env.local
```

#### 4. Crear tablas en Supabase

Ejecutar el script SQL en Supabase Console (SQL Editor):

```sql
-- Tablas de negocio
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  article_body TEXT NOT NULL,
  main_topic VARCHAR(255),
  category_id INT REFERENCES categories(id),
  published_in TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  color VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE image_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  image_path VARCHAR(500) NOT NULL,
  mime_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Storage bucket
-- Crear bucket 'images' en Supabase Storage
-- Hacer público y permitir acceso GET anónimo
```

#### 5. Ejecutar en desarrollo

```bash
pnpm dev
# o
npm run dev
```

Acceder a: `http://localhost:3000`

#### 6. Build para producción

```bash
pnpm build
pnpm start
# o
npm run build
npm start
```

### Scripts Disponibles

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

---

## 🔄 Flujos Principales

### Flujo 1: Crear Artículo de Blog

```
1. Admin accede a /admin/blog
   │
2. Click en "Crear artículo"
   │
3. Se abre AdminBlogForm
   │
4. Admin completa:
   - Título
   - Contenido (editor TipTap)
   - Tema principal
   - Categoría
   │
5. Admin hace click en "Guardar"
   │
6. Validación con Zod
   ├─ Error → Mostrar errores en FormError
   └─ OK → Continuar
   │
7. Server Action: createBlog()
   │
8. Sanitizar HTML del contenido
   │
9. Insertar en tabla 'blogs'
   │
10. Retornar éxito
    │
11. Mostrar toast "Artículo creado"
    │
12. Redirigir a listado de blogs
```

### Flujo 2: Enviar Formulario de Contacto

```
1. Usuario accede a /contacts
   │
2. Completa formulario:
   - Nombre
   - Email
   - Mensaje
   │
3. Click en "Enviar"
   │
4. Validación con Zod
   ├─ Error → Mostrar errores
   └─ OK → Continuar
   │
5. Server Action: contactRegister()
   │
6. Insertar en tabla 'contacts'
   │
7. Retornar éxito
   │
8. Mostrar toast "Mensaje enviado"
   │
9. Limpiar formulario
```

### Flujo 3: Subir Archivo

```
1. Admin accede a /admin/files
   │
2. Selecciona archivo (drag-drop o click)
   │
3. Validar:
   - Tipo MIME (jpg, png, webp, pdf)
   - Tamaño (máx 5MB)
   ├─ Error → Mostrar error
   └─ OK → Continuar
   │
4. Si es imagen:
   └─ Comprimir con browser-image-compression
      (máx 1920px, máx 1MB)
   │
5. Server Action: ProcessUploadedFile()
   │
6. Subir a Supabase Storage (/images bucket)
   │
7. Guardar metadatos en tabla 'image_files'
   │
8. Generar URL pública
   │
9. Retornar URL
   │
10. Mostrar en listado
```

### Flujo 4: Login y Autenticación

```
1. Usuario accede a /admin (protegida)
   │
2. Middleware intercepta
   ├─ Verifica JWT en cookie 'access-token'
   ├─ Token válido → Permitir acceso
   └─ Token inválido → Redirige a /auth/login
   │
3. En /auth/login:
   └─ Componente de login muestra formulario
   │
4. Usuario ingresa:
   - Email
   - Contraseña
   │
5. Click en "Ingresar"
   │
6. Server Action: signInUser()
   │
7. Autenticar con Supabase Auth
   ├─ Error → Mostrar error
   └─ OK → Guardar token
   │
8. Guardar JWT en cookie segura
   │
9. Redirigir a /admin
   │
10. Middleware valida token
    └─ Permitir acceso
```

### Flujo 5: Búsqueda de Artículos

```
1. Usuario en /blog
   │
2. Escribe en campo de búsqueda
   │
3. onChange dispara debounce (500ms)
   │
4. Server Action: GetBlogs(searchTerm, page)
   │
5. BD: Búsqueda LIKE en título
   │
6. Retornar resultados paginados
   │
7. Actualizar UI con resultados
   │
8. Mostrar paginación actualizada
```

---

## 📚 Mejores Prácticas

### 1. **Uso de Server Components**

```tsx
// ✅ Correcto - Server Component por defecto
export default async function BlogPage() {
  const blogs = await GetBlogs();
  return <div>{blogs.map(...)}</div>;
}

// ❌ Evitar - Client Component innecesario
"use client";
export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  // ...
}
```

### 2. **Validación en Servidor**

```tsx
// ✅ Correcto - Validar en servidor
export async function createBlog(data) {
  const validated = BlogFormSchema.safeParse(data);
  if (!validated.success) return { success: false, errors: ... };
  // Procesar
}

// ❌ Evitar - Solo validar en cliente
function BlogForm() {
  // Validar aquí no es suficiente
}
```

### 3. **Sanitización de HTML**

```tsx
// ✅ Correcto - Sanitizar contenido user-generated
import { sanitizeHtml } from '@/lib/sanitize';

const cleanHTML = sanitizeHtml(userContent);

// ❌ Evitar - Confiar en contenido sin sanitizar
dangerouslySetInnerHTML={{ __html: userContent }}
```

### 4. **Manejo de Errores**

```tsx
// ✅ Correcto
try {
  const result = await action(data);
  if (!result.success) {
    throw new Error(result.message);
  }
} catch (error) {
  console.error("Error:", error);
  return { success: false, error: error.message };
}

// ❌ Evitar - Ignorar errores
const result = await action(data);
```

### 5. **Gestión de Estado en Formularios**

```tsx
// ✅ Correcto - useActionState para formularios
const [state, formAction] = useActionState(serverAction, initialState);

return (
  <form action={formAction}>
    {state?.errors?.field && <FormError error={state.errors.field[0]} />}
  </form>
);
```

### 6. **Tipos y TypeScript**

```tsx
// ✅ Correcto - Tipos explícitos
interface BlogCreateRequest {
  title: string;
  article_body: string;
}

export async function createBlog(data: BlogCreateRequest): Promise<FormState> {
  // ...
}

// ❌ Evitar - Tipos implícitos
export async function createBlog(data: any) {
  // ...
}
```

### 7. **URLs Públicas de Archivos**

```tsx
// ✅ Correcto - Usar URLs públicas de Supabase
const publicURL = supabase.storage.from("images").getPublicUrl(filePath).data.publicUrl;

// ❌ Evitar - Exponer rutas internas
return supabase.storage.from("images").download(filePath);
```

### 8. **Nombres de Variables**

```tsx
// ✅ Correcto - Nombres descriptivos en español
const obtenerBlog = async (id: number) => { ... }

// ❌ Evitar - Nombres confusos
const gb = async (i) => { ... }
```

---

## 📊 Diagrama de Flujo General

```
┌─────────────────┐
│  Navegador      │
│  (Usuario)      │
└────────┬────────┘
         │
         ├──────────────────────────────┐
         │                              │
    ┌────▼────┐               ┌────────▼────────┐
    │ Rutas   │               │ Rutas           │
    │ públicas│               │ protegidas      │
    │ /       │               │ /admin          │
    │ /blog   │               │ /admin/blog     │
    │ /contact│               │ /admin/files    │
    └────┬────┘               └────────┬────────┘
         │                            │
         └───────────────┬────────────┘
                         │
                ┌────────▼────────┐
                │  Componentes    │
                │  React (UI)     │
                └────────┬────────┘
                         │
                ┌────────▼────────┐
                │ Server Actions  │
                │ (Validación)    │
                └────────┬────────┘
                         │
                ┌────────▼────────┐
                │  Supabase       │
                │  (Backend)      │
                └────────┬────────┘
                         │
          ┌──────────────┼──────────────┐
          │              │              │
    ┌─────▼──┐      ┌────▼────┐   ┌───▼─────┐
    │Database│      │  Auth   │   │ Storage │
    │Postgre │      │ (JWT)   │   │(Images) │
    │SQL     │      │         │   │         │
    └────────┘      └─────────┘   └─────────┘
```

---

## 📞 Soporte y Contacto

- **Documentación Supabase:** https://supabase.com/docs
- **Documentación Next.js:** https://nextjs.org/docs
- **Documentación Tailwind:** https://tailwindcss.com/docs

---

## 📝 Historial de Cambios

| Versión | Fecha      | Cambios               |
| ------- | ---------- | --------------------- |
| 1.0     | Enero 2026 | Documentación inicial |

---

**Última actualización:** 27 de Enero de 2026  
**Autor:** Equipo de Desarrollo  
**Proyecto:** Dosis de Marketing
