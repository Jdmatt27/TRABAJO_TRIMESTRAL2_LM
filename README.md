# ⚽ FurboBet

**FurboBet** es una plataforma web interactiva dedicada al mundo del fútbol, que combina noticias de las grandes ligas europeas con un sistema simulado de apuestas deportivas.

## 🚀 Características Principales

- **Noticias en tiempo real:** Sección de noticias dinámicas para LaLiga, Premier League, Bundesliga, Serie A y Ligue 1.
- **Sistema de Apuestas:**
  - Generación automática de jornadas y enfrentamientos.
  - Cálculo de cuotas dinámicas basadas en el *rating* de los equipos.
  - Gestión de apuestas (pendientes, ganadas y perdidas).
- **Gestión de Usuario:**
  - Sistema de Login/Logout (simulado).
  - Gestión de saldo (añadir saldo y cobro de premios).
  - Perfil de usuario con historial de apuestas.
- **Experiencia Visual:**
  - Diseño responsive y moderno.
  - Soporte para **Modo Oscuro / Modo Claro**.
  - Integración de vídeos y contenido multimedia para anuncios y noticias.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3 (Variables CSS, Flexbox, Grid).
- **Lógica:** JavaScript (ES6+) con manipulación dinámica del DOM.
- **Persistencia:** `localStorage` y `sessionStorage` para mantener la sesión y los datos de apuestas sin necesidad de base de datos externa.
- **Datos:** Configuración centralizada en archivos JSON (`js/data.json`).

## 📁 Estructura del Proyecto

```text
├── index.html              # Página principal (Noticias)
├── css/                    # Estilos generales y específicos
├── js/                     # Lógica del sistema, cuotas y datos
│   ├── app.js              # Lógica de la dashboard principal
│   ├── core.js             # Funciones globales y gestión de sesión
│   └── data.json           # Base de datos de equipos y ligas
├── html/                   # Páginas secundarias (Login, Apuestas, Perfil)
├── Images/                 # Logos y recursos visuales
└── Videos/                 # Clips multimedia para noticias
```

## 📖 Cómo empezar

1. Clona este repositorio o descarga los archivos.
2. Abre el archivo `index.html` en cualquier navegador moderno.
3. ¡Explora las noticias o inicia sesión para empezar a apostar!

---
*Este proyecto ha sido desarrollado como parte del trabajo práctico para el Segundo Trimestre de DAM (Desarrollo de Aplicaciones Multiplataforma).*
