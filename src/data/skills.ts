export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Cloud",
    skills: ["Google Cloud Platform", "AWS"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "NestJS", "TypeScript", "PHP", "Laravel", "CodeIgniter"],
  },
  {
    category: "Frontend",
    skills: ["ReactJS", "Angular", "Sass"],
  },
  {
    category: "Mobile",
    skills: ["Flutter", "Ionic"],
  },
  {
    category: "Bases de datos",
    skills: ["MySQL", "SQLite", "MongoDB", "Firestore", "PostgreSQL", "Oracle"],
  },
  {
    category: "Mensajería",
    skills: ["Kafka", "PubSub", "MQTT"],
  },
  {
    category: "DevOps & VCS",
    skills: ["Git", "GitLab", "Docker"],
  },
  {
    category: "APIs",
    skills: ["RESTful API"],
  },
  {
    category: "Idiomas",
    skills: ["Español (Nativo)", "Inglés (Avanzado)"],
  },
  {
    category: "Habilidades personales",
    skills: [
      "Trabajo en equipo",
      "Pensamiento crítico",
      "Proactivo",
      "Resolución de problemas",
      "Adaptabilidad",
      "Aprendizaje continuo",
    ],
  },
];
