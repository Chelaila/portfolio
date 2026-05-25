import { experiences, education } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen px-6 md:px-12 py-20 border-t border-indigo-velvet">
      <h2 className="text-3xl font-bold text-text-primary mb-2">Experiencia</h2>
      <p className="text-text-muted text-sm mb-12">Historial profesional</p>

      <div className="relative space-y-8">
        <div className="absolute left-2 top-0 bottom-0 w-px bg-indigo-velvet" />
        {experiences.map((exp) => (
          <div key={`${exp.company}-${exp.period}`} className="relative pl-10">
            <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-slate-blue border-2 border-midnight-blue" />
            <div className="bg-electric-royal border border-indigo-velvet rounded-lg p-6 hover:border-slate-blue transition-colors duration-200">
              <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                <div>
                  <h3 className="text-text-primary font-semibold text-base">{exp.role}</h3>
                  <p className="text-slate-blue-light text-sm">{exp.company}</p>
                </div>
                <span className="text-text-muted text-xs font-mono bg-indigo-velvet px-3 py-1 rounded-full">
                  {exp.period}
                </span>
              </div>
              <ul className="mt-4 space-y-2">
                {exp.description.map((item) => (
                  <li key={item} className="text-text-muted text-sm flex gap-2">
                    <span className="text-slate-blue mt-0.5 shrink-0">›</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                {exp.stack.map((tech) => (
                  <span key={tech} className="text-xs px-2 py-0.5 bg-indigo-ink text-slate-blue-light rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Educación */}
      <h2 className="text-3xl font-bold text-text-primary mt-20 mb-2">Educación</h2>
      <p className="text-text-muted text-sm mb-12">Formación académica</p>

      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.institution} className="bg-electric-royal border border-indigo-velvet rounded-lg p-6 hover:border-slate-blue transition-colors duration-200 max-w-xl">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-text-primary font-semibold text-base">{edu.degree}</h3>
                <p className="text-slate-blue-light text-sm mt-1">{edu.institution}</p>
                <p className="text-text-muted text-xs mt-1">{edu.location}</p>
              </div>
              <span className="text-text-muted text-xs font-mono bg-indigo-velvet px-3 py-1 rounded-full">
                {edu.period}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
