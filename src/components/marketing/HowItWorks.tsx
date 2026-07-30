import { HOW_IT_WORKS } from "@/config/site";

export function HowItWorks() {
  return (
    <section id="how" className="border-b border-slate-200 bg-white py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Three steps from project information to a data-driven conversation.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {HOW_IT_WORKS.map((item, index) => (
            <div key={item.step} className="relative">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-500 text-lg font-extrabold text-white">
                  {item.step}
                </span>
                {index < HOW_IT_WORKS.length - 1 ? (
                  <span className="hidden h-0.5 flex-1 bg-slate-200 md:block" />
                ) : null}
              </div>
              <h3 className="mt-5 text-lg font-bold text-brand-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
