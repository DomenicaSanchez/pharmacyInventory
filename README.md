# 💊 Pharmy

Aplicación sencilla de inventario para farmacia, desarrollada con:

- **Frontend:** [Astro](https://astro.build) + TailwindCSS
- **Backend:** Node.js + Express + TypeScript
- **Base de datos:** PostgreSQL (local)

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
npm run dev
```
 Añadir el archivo .env 
```bash
DB_HOST=$$$$
DB_PORT=$$$$
DB_USER=$$$$
DB_PASS=$$$$
DB_NAME=$$$$
```
### 3. Configurar frontend
```bash
cd ../frontend
npm install
npm run dev
```