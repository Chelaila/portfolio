export interface Project {
  title: string;
  description: string;
  stack: string[];
  highlights?: string[];
  diagram?: string;
  image?: string;
  repoUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    title: "NumaTrack",
    description:
      "App mobile para trackear precios de productos tecnológicos en tiempo real. El usuario busca un producto por categoría, lo agrega con un tap y recibe el precio actualizado automáticamente — sin pull-to-refresh.",
    stack: [
      "Flutter",
      "NestJS",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Socket.io",
      "Cheerio",
      "Playwright",
      "Firebase FCM",
      "GCP Cloud Run",
      "Docker",
    ],
    diagram: `flowchart LR
    CRON["Cron Job<br/>cada 6 horas"] --> QUEUE["BullMQ Queue<br/>Redis backed"]
    QUEUE --> WORKER["Scraper Worker<br/>Cheerio · Playwright"]
    WORKER --> TARGET["SolotoDo API<br/>+ sites HTML/SPA"]
    WORKER -- "parse + normalize" --> PARSER["DataParser<br/>schema validation"]
    PARSER --> DB[("PostgreSQL<br/>productos · precios")]
    PARSER -- "emitPriceUpdated<br/>userIds · productId · price" --> GW["PriceGateway<br/>Socket.io /ws"]
    GW -- "join al conectar<br/>JWT handshake" --> ROOM[/"room: user-ID"/]
    ROOM -- "evento: priceUpdated" --> APP["Flutter App"]
    APP -- "ref.invalidate<br/>productsProvider" --> UI(["UI actualizada<br/>sin refresh manual"])
    WORKER -- "error · retry" --> QUEUE`,
    highlights: [
      "Precios sincronizados desde SolotoDo Public API vía cron job cada 6 horas con concurrencia configurable",
      "Actualizaciones en tiempo real vía Socket.io: el precio se refleja en la app sin requerir refresh manual",
      "Alertas push (FCM) cuando el precio cae por debajo del threshold configurado — funciona con la app cerrada",
      "Autenticación JWT en el handshake WebSocket: cada cliente se une a un room user-ID en el gateway",
      "Workers multi-estrategia: Cheerio para sitios estáticos, Playwright para SPAs con JavaScript rendering",
      "Sistema de colas BullMQ con reintentos exponenciales y dead-letter queue para jobs fallidos",
      "Pipeline de normalización: los datos crudos pasan por validación de schema antes de persistir",
      "Throttling configurable por dominio para respetar rate limits y evitar bloqueos de IP",
      "Arquitectura preparada para escala horizontal en Cloud Run con Redis adapter para Socket.io broadcast",
      "Cron semanal de sincronización de catálogo de categorías desde navegación de SolotoDo",
    ],
  },
  {
    title: "Pomodoro Timer",
    description:
      "Aplicación full-stack basada en la técnica Pomodoro con gestión de tareas, presets configurables por usuario, integración de playlists de YouTube y personalización de tema.",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "NestJS",
      "TypeORM",
      "MySQL",
      "Docker",
      "Nginx",
    ],
    image: "/projects/pomodoro-timer.jpg",
    repoUrl: "https://github.com/Chelaila/pomodorotimer",
    diagram: `flowchart LR
    USER["Usuario<br/>React + Vite"] --> NGINX["Nginx<br/>static serving"]
    USER -- "REST · Axios" --> API["NestJS API<br/>:3001"]
    API --> TASKS["TasksModule<br/>CRUD tareas"]
    API --> TIMER["TimerModule<br/>presets work/break"]
    API --> SESSIONS["SessionsModule<br/>historial · stats"]
    API --> PLAYLIST["PlaylistModule<br/>YouTube refs"]
    TASKS & TIMER & SESSIONS & PLAYLIST --> ORM["TypeORM"]
    ORM --> DB[("MySQL 8<br/>pomodoro_timer")]
    API -- "@nestjs/event-emitter" --> EVENTS["Eventos in-app<br/>session completed"]`,
    highlights: [
      "Presets de timer por usuario: duración de trabajo, descanso corto y largo persistidos en MySQL vía TypeORM",
      "Sesiones completadas guardadas para historial y estadísticas, vinculadas a las tareas del usuario",
      "Integración con playlists de YouTube reproducidas en paralelo al ciclo de trabajo",
      "Eventos in-app con `@nestjs/event-emitter` para desacoplar finalización de sesión de side-effects",
      "Stack dockerizado con Docker Compose: frontend (Nginx), backend (NestJS) y MySQL 8 con volumen persistente",
      "Seeder dedicado que bootstrapea configs de timer por defecto y datos demo en el primer arranque",
    ],
  },
  {
    title: "Inventory Management API",
    description:
      "API REST para gestión de inventario empresarial. Manejo de productos, stock, movimientos y alertas de reposición con autenticación por roles y auditoría de cambios.",
    stack: [
      "NestJS",
      "PostgreSQL",
      "TypeORM",
      "Redis",
      "Docker",
      "Swagger",
      "JWT",
    ],
    diagram: `flowchart TD
    CLIENT["Client<br/>HTTP Request"] --> AUTH["AuthGuard<br/>JWT · Roles"]
    AUTH --> CTRL["Controller<br/>REST Endpoints"]
    CTRL --> SVC["InventoryService<br/>Business Logic"]
    SVC --> AUDIT["AuditService<br/>log de cambios"]
    SVC --> DB[("PostgreSQL<br/>Products · Stock")]
    SVC --> CACHE[("Redis<br/>listings cache")]
    SVC -- "stock bajo umbral" --> ALERT["AlertService<br/>webhook · email"]`,
    highlights: [
      "Control de stock con movimientos de entrada y salida trazables: cada cambio queda en el log de auditoría",
      "Alertas automáticas de reposición cuando el stock cae por debajo del umbral configurado por producto",
      "Caché Redis en listados de productos: TTL por categoría, invalidación selectiva en cada mutación",
      "Roles granulares (admin, operador, viewer) aplicados a nivel de guard en cada endpoint",
      "Swagger autogenerado con decoradores NestJS: documentación siempre sincronizada con el código",
    ],
  },
  {
    title: "Tejido Counter",
    description:
      "App mobile y desktop para llevar el conteo de vueltas y puntos en proyectos de tejido (crochet y palillo). Organiza cada proyecto en secciones, distingue derecho/revés (RS/WS) y soporta trabajo en plano o en redondo.",
    stack: [
      "Flutter",
      "Dart",
      "Provider",
      "shared_preferences",
      "flutter_svg",
    ],
    image: "/projects/tejido-counter.jpg",
    repoUrl: "https://github.com/Chelaila/tejido_counter",
    diagram: `flowchart LR
    USER["Tejedora<br/>UI Flutter"] --> SCREENS["Screens<br/>Home · Sections · Counter"]
    SCREENS -- "read · mutate" --> PROVIDER["ProjectsProvider<br/>ChangeNotifier"]
    PROVIDER --> MODEL["Project + Section<br/>RS/WS · plano/redondo"]
    PROVIDER -- "serialize JSON" --> STORAGE[("shared_preferences<br/>local storage")]
    SCREENS --> WIDGETS["Widgets<br/>CounterTile · ProgressCard"]
    WIDGETS --> BG["AnimatedYarnBackground<br/>YarnCatOverlay (SVG)"]`,
    highlights: [
      "Soporta dos modos de tejido (crochet y palillo) y dos estilos de trabajo (plano con RS/WS, o en redondo)",
      "Cada proyecto se divide en secciones con cantidad de filas y nombre: progreso por sección + progreso total",
      "Indicador automático de dirección de lectura del chart (← derecho / → revés) según paridad de fila y `row1IsRS`",
      "Persistencia 100% local con `shared_preferences` — sin backend, sin login, datos en el dispositivo",
      "Multi-plataforma desde un mismo codebase: Android, iOS y Windows desktop",
      "UI con fondo animado de hilo y overlay de gato jugando con la lana (assets SVG + frames)",
    ],
  },
];
