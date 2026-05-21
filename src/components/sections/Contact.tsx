const contactItems = [
  {
    label: "Email",
    value: "m.moli2ka@gmail.com",
    href: "mailto:m.moli2ka@gmail.com",
  },
  {
    label: "Teléfono",
    value: "+56 9 9789 2068",
    href: "tel:+56997892068",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/mcelomoli",
    href: "https://www.linkedin.com/in/mcelomoli/",
  },
  {
    label: "GitHub",
    value: "github.com/Chelaila",
    href: "https://github.com/Chelaila",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen px-12 py-20 border-t border-indigo-velvet">
      <h2 className="text-3xl font-bold text-text-primary mb-2">Contacto</h2>
      <p className="text-text-muted text-sm mb-12">¿Tienes un proyecto o propuesta? Escríbeme.</p>

      <div className="max-w-lg space-y-4">
        {contactItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex items-center justify-between p-5 bg-electric-royal border border-indigo-velvet rounded-lg hover:border-slate-blue group transition-colors duration-200"
          >
            <span className="text-text-muted text-sm">{item.label}</span>
            <span className="text-text-primary text-sm group-hover:text-slate-blue-light transition-colors">
              {item.value} ↗
            </span>
          </a>
        ))}
      </div>

      <p className="text-text-muted text-xs mt-16">
        © {new Date().getFullYear()} Marcelo Alonso Molina Muñoz
      </p>
    </section>
  );
}
