import { projects } from "@/data/projects";
import MermaidDiagram from "@/components/ui/MermaidDiagram";

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen px-6 md:px-12 py-20 border-t border-indigo-velvet">
      <h2 className="text-3xl font-bold text-text-primary mb-2">Proyectos</h2>
      <p className="text-text-muted text-sm mb-12">Trabajos personales y open source</p>

      {projects.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-electric-royal border border-dashed border-indigo-velvet rounded-lg p-6 flex flex-col gap-4 opacity-50"
            >
              <div className="w-full h-36 bg-indigo-ink rounded-md flex items-center justify-center text-text-muted text-xs">
                Imagen del proyecto
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-indigo-velvet rounded w-3/4" />
                <div className="h-3 bg-indigo-velvet rounded w-full" />
                <div className="h-3 bg-indigo-velvet rounded w-5/6" />
              </div>
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-indigo-velvet rounded-full" />
                <div className="h-5 w-12 bg-indigo-velvet rounded-full" />
              </div>
            </div>
          ))}
          <div className="col-span-full text-center pt-4">
            <p className="text-text-muted text-sm">Proyectos en camino — vuelve pronto.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-electric-royal border border-indigo-velvet rounded-lg overflow-hidden hover:border-slate-blue transition-colors duration-200"
            >
              {project.image && (
                <div className="w-full bg-indigo-ink flex items-center justify-center p-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="max-h-64 md:max-h-80 lg:max-h-96 w-auto max-w-full object-contain"
                  />
                </div>
              )}

              <div className="p-6 flex flex-col gap-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-text-primary font-semibold text-xl mb-1">{project.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">{project.description}</p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-text-muted hover:text-slate-blue-light transition-colors whitespace-nowrap"
                      >
                        GitHub ↗
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-text-muted hover:text-slate-blue-light transition-colors whitespace-nowrap"
                      >
                        Demo ↗
                      </a>
                    )}
                  </div>
                </div>

                {/* Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 bg-indigo-ink text-slate-blue-light rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Architecture diagram */}
                {project.diagram && (
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-3">
                      Diagrama de arquitectura
                    </p>
                    <MermaidDiagram chart={project.diagram} />
                  </div>
                )}

                {/* Technical highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-3">
                      Decisiones técnicas
                    </p>
                    <ul className="flex flex-col gap-2">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex gap-2 text-sm text-text-muted">
                          <span className="text-slate-blue-light shrink-0 mt-0.5">▸</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
