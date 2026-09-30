import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      {/* HERO */}
      <section
        id="home"
        className="flex min-h-screen items-center justify-center px-6 pt-20"
      >
        <div className="mx-auto max-w-5xl text-center">

          <div className="mb-6 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
            Collaborative workspace for modern teams
          </div>

          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            Build together.
            <br />

            <span className="text-blue-500">
              Create without limits.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            Collaboratory gives teams a shared space to create,
            edit, manage and collaborate on projects in real time.
          </p>

          {/* HERO BUTTONS */}
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            {/* START COLLABORATING */}
            <Link
              href="/login"
              className="rounded-xl bg-blue-600 px-8 py-4 font-medium transition hover:bg-blue-700"
            >
              Start Collaborating
            </Link>

            {/* EXPLORE PLATFORM */}
            <Link
              href="#features"
              className="rounded-xl border border-white/10 px-8 py-4 font-medium text-slate-300 transition hover:bg-white/5"
            >
              Explore Platform
            </Link>

          </div>

        </div>
      </section>


      {/* FEATURES */}
      <section
        id="features"
        className="border-t border-white/10 px-6 py-24"
      >

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-sm font-medium uppercase tracking-widest text-blue-500">
              Features
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Everything your team needs
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              A single platform for managing projects,
              collaborating with teammates and building together.
            </p>

          </div>


          <div className="mt-14 grid gap-6 md:grid-cols-3">

            <FeatureCard
              title="Real-time Collaboration"
              description="Work together with your teammates and see changes as they happen."
              icon="⚡"
            />

            <FeatureCard
              title="Project Management"
              description="Create projects, organize workspaces and keep everything in one place."
              icon="📁"
            />

            <FeatureCard
              title="Secure Workspace"
              description="Keep your projects and data securely connected through Supabase."
              icon="🔐"
            />

          </div>

        </div>

      </section>


      {/* ABOUT */}
      <section
        id="about"
        className="border-t border-white/10 px-6 py-24"
      >

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-sm font-medium uppercase tracking-widest text-blue-500">
            About Collaboratory
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            One place to build together.
          </h2>

          <p className="mt-6 leading-8 text-slate-400">
            Collaboratory is designed to make teamwork simpler by
            bringing projects, workspaces, editing and communication
            together in one collaborative environment.
          </p>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">

          <p className="text-sm text-slate-500">
            © 2026 Collaboratory. All rights reserved.
          </p>

          <p className="text-sm text-slate-500">
            Built for collaboration.
          </p>

        </div>

      </footer>

    </main>
  );
}


function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.05]">

      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
        {icon}
      </div>

      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-slate-400">
        {description}
      </p>

    </div>
  );
}