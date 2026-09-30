"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase/client";
import { LogOut, Plus, Folder, Users, Clock } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();

  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const name =
        user.user_metadata?.full_name ||
        user.email?.split("@")[0] ||
        "User";

      setUserName(name);
      setLoading(false);
    }

    getUser();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-slate-400">Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-white/10 bg-slate-950/80">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold">
              C
            </div>

            <span className="text-xl font-bold">
              Collaboratory
            </span>

          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <LogOut size={17} />
            Logout
          </button>

        </div>

      </nav>


      {/* Dashboard */}
      <section className="mx-auto max-w-7xl px-6 py-12">

        {/* Welcome */}
        <div>

          <p className="text-sm font-medium text-blue-400">
            DASHBOARD
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Welcome, {userName} 👋
          </h1>

          <p className="mt-3 text-slate-400">
            Manage your projects and collaborate with your team.
          </p>

        </div>


        {/* Stats */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">

          <StatCard
            icon={<Folder size={22} />}
            title="Projects"
            value="0"
          />

          <StatCard
            icon={<Users size={22} />}
            title="Collaborators"
            value="0"
          />

          <StatCard
            icon={<Clock size={22} />}
            title="Recent Activity"
            value="0"
          />

        </div>


        {/* Projects */}
        <div className="mt-12">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold">
                Your Projects
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Create and manage your collaborative projects.
              </p>

            </div>

            <button className="">
              <Plus size={18} />
              <Link
  href="/projects/new"
  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium transition hover:bg-blue-700"
>
  <Plus size={18} />
  New Project
</Link>
            </button>

          </div>


          {/* Empty state */}
          <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-20 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
              <Folder size={30} />
            </div>

            <h3 className="mt-6 text-xl font-semibold">
              No projects yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              <Link
  href="/projects/new"
  className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium transition hover:bg-blue-700"
>
  Create your first project
</Link>
            </p>

            <button className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium transition hover:bg-blue-700">
              Create your first project
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}


function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

      <div className="flex items-center justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
          {icon}
        </div>

        <span className="text-3xl font-bold">
          {value}
        </span>

      </div>

      <p className="mt-5 text-sm text-slate-400">
        {title}
      </p>

    </div>
  );
}