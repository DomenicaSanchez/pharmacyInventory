# 💊 Pharmy

Aplicación sencilla de inventario para farmacia, desarrollada con:

- **Frontend:** [Astro](https://astro.build) + TailwindCSS + React
- **Backend:** Node.js + Express + TypeScript
- **Base de datos:** PostgreSQL (Railway)

---

## 🚀 Estructura

    pharmy/
    ├── frontend/
    ├── backend/

---

## 🧑‍💻 Cómo ejecutar localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuUsuario/pharmy.git
cd pharmy
```

### 2. Configurar backend

```bash
cd backend
npm install
```

Añadir el archivo .env con la URL de Railway:

```bash
DATABASE_URL="postgresql://usuario:contraseña@host:puerto/nombre_db"
```

Ejecutar Prisma

```bash
npx prisma generate     # Genera el cliente Prisma
npx prisma db push      # Crea las tablas en la db
```

Iniciar el servidor

```bash
npm run dev
```

### 3. Configurar frontend

```bash
cd ../frontend
npm install
npm run dev
```

## 🧪 Tecnologías utilizadas

- **Astro:** Framework moderno para frontend.
- **TailwindCSS y React:** Utilidades CSS para estilos rápidos.
- **Express:** Framework minimalista para Node.js.
- **Prisma:** ORM moderno para TypeScript y PostgreSQL.
- **Railway:** Plataforma para desplegar bases de datos en la nube.

## 🐳 Uso con Docker
Se incluyen archivos Dockerfile para frontend y backend, además de un archivo docker-compose.yml para levantar ambos servicios juntos.
### Construir y levantar contenedores
```bash
docker-compose build
docker-compose up -d
```
- El backend estará disponible en http://localhost:3002
- El frontend en http://localhost:8082