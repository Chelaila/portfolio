import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen px-12 py-20 border-t border-indigo-velvet">
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="bg-electric-royal border border-indigo-velvet rounded-lg overflow-hidden hover:border-slate-blue transition-colors duration-200 flex flex-col"
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-text-primary font-semibold mb-2">{project.title}</h3>
                <p className="text-text-muted text-sm flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.stack.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-0.5 bg-indigo-ink text-slate-blue-light rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-text-muted hover:text-slate-blue-light transition-colors">
                      GitHub ↗
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-text-muted hover:text-slate-blue-light transition-colors">
                      Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
