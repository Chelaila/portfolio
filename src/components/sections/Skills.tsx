import { skillCategories } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen px-12 py-20 border-t border-indigo-velvet">
      <h2 className="text-3xl font-bold text-text-primary mb-2">Habilidades</h2>
      <p className="text-text-muted text-sm mb-12">Tecnologías y herramientas con las que trabajo</p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {skillCategories.map((cat) => (
          <div
            key={cat.category}
            className="bg-electric-royal border border-indigo-velvet rounded-lg p-5 hover:border-slate-blue transition-colors duration-200"
          >
            <h3 className="text-slate-blue-light text-xs font-mono uppercase tracking-widest mb-4">
              {cat.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-indigo-velvet text-text-primary text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
