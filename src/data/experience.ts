export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  stack: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
}

export const experiences: Experience[] = [
  {
    company: "Recíbelo SPA",
    role: "Full Stack Developer",
    period: "Sep. 2023 — Presente",
    description: [
      "Mantenimiento y desarrollo de mejoras en el sistema web interno, con foco en implementación y documentación de nuevas APIs.",
      "Desarrollo de proyecto tipo juego con Laravel, JavaScript y MySQL.",
    ],
    stack: ["Laravel", "ReactJS", "Docker", "PostgreSQL", "MySQL"],
  },
  {
    company: "Freelance",
    role: "Full Stack Developer",
    period: "Sep. 2023 — Presente",
    description: [
      "Proyecto de investigación de E-commerce: despliegue de servidor web con NestJS, Laravel y MySQL.",
      "Desarrollo e implementación de API de comunicaciones entre servicios de E-commerce: Multivende, Bsale, entre otros.",
    ],
    stack: ["NestJS", "Laravel", "MySQL"],
  },
  {
    company: "CLM Digital Solutions",
    role: "Full Stack Developer",
    period: "Ene. 2021 — Abr. 2023",
    description: [
      "Refactorización de PosWeb y desarrollo del proyecto WMOS para Tottus, sobre arquitectura orientada a mensajes con PubSub y Kafka para procesos contables y logísticos.",
      "Automatización de sistema de comunicación interno con notificaciones vía correo, WhatsApp y Slack usando NodeJS.",
    ],
    stack: ["NodeJS", "Oracle", "GCP PubSub", "Kafka"],
  },
  {
    company: "Gladiator Control",
    role: "Full Stack Developer",
    period: "Sep. 2020 — Ene. 2023",
    description: [
      "Desarrollo de aplicación móvil en Flutter para control de ingreso de personal con reconocimiento de texto por cámara.",
      "Desarrollo de aplicación móvil en Ionic para gestión de alarmas con tecnología MQTT.",
    ],
    stack: ["Flutter", "Ionic", "MQTT"],
  },
];

export const education: Education[] = [
  {
    institution: "Instituto Profesional DUOC UC",
    degree: "Ingeniería en Informática",
    period: "Mar. 2017 — Feb. 2021",
    location: "Santiago, Chile",
  },
];
