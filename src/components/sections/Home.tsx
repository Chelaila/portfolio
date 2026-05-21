export default function Home() {
  return (
    <section id="home" className="min-h-screen flex items-center px-12 py-20">
      <div className="max-w-2xl">
        <p className="text-slate-blue-light text-sm font-mono mb-4 tracking-widest uppercase">
          Bienvenido a mi portfolio
        </p>
        <h1 className="text-5xl font-bold text-text-primary leading-tight mb-4">
          Marcelo Alonso
          <br />
          <span className="text-slate-blue">Molina Muñoz</span>
        </h1>
        <h2 className="text-xl text-text-muted font-light mb-8">
          Ingeniero Informático Senior
        </h2>
        <p className="text-text-muted leading-relaxed text-base max-w-lg">
          Experiencia en diseño, desarrollo e implementación de soluciones informáticas.
          Especializado en desarrollo de APIs con Node.js y experiencia en frontend con Angular y ReactJS.
          Habilidades en microservicios, administración de bases de datos y DevOps.
          Comprometido con el aprendizaje continuo y los desafíos del mundo tecnológico.
        </p>
        <div className="flex gap-4 mt-10">
          <a
            href="#contact"
            className="px-6 py-3 bg-slate-blue hover:bg-slate-blue-light text-white rounded-md text-sm font-medium transition-colors duration-200"
          >
            Contactar
          </a>
          <a
            href="#projects"
            className="px-6 py-3 border border-indigo-velvet text-text-muted hover:border-slate-blue hover:text-text-primary rounded-md text-sm font-medium transition-colors duration-200"
          >
            Ver proyectos
          </a>
        </div>
      </div>
    </section>
  );
}
