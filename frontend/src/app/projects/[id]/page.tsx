"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Folder,
  Users,
  Settings,
  FileText,
  Plus,
  MoreHorizontal,
} from "lucide-react";

import { supabase } from "../../../lib/supabase/client";

type Project = {
  id: string;
  name: string;
  description: string | null;
  owner_id: string;
  created_at: string;
};

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();

  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProject() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      if (error) {
        console.error(error);
        setError(error.message);
        setLoading(false);
        return;
      }

      setProject(data);
      setLoading(false);
    }

    if (projectId) {
      loadProject();
    }
  }, [projectId, router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-slate-400">
          Loading project...
        </p>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">

          <h1 className="text-2xl font-bold">
            Project not found
          </h1>

          <p className="mt-3 text-slate-500">
            {error || "This project could not be loaded."}
          </p>

          <Link
            href="/dashboard"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Top Navigation */}
      <header className="border-b border-white/10">

        <div className="flex h-20 items-center justify-between px-6">

          <div className="flex items-center gap-5">

            <Link
              href="/dashboard"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft size={20} />
            </Link>

            <div className="h-7 w-px bg-white/10" />

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Folder size={20} />
              </div>

              <div>

                <h1 className="font-semibold">
                  {project.name}
                </h1>

                <p className="text-xs text-slate-500">
                  Project workspace
                </p>

              </div>

            </div>

          </div>


          <div className="flex items-center gap-2">

            <button
              className="rounded-lg p-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white"
              title="Members"
            >
              <Users size={19} />
            </button>

            <button
              className="rounded-lg p-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white"
              title="Settings"
            >
              <Settings size={19} />
            </button>

          </div>

        </div>

      </header>


      {/* Workspace */}
      <div className="flex min-h-[calc(100vh-80px)]">

        {/* Sidebar */}
        <aside className="hidden w-64 border-r border-white/10 p-5 md:block">

          <div className="mb-6 flex items-center justify-between">

            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Files
            </span>

            <button className="rounded-md p-1.5 text-slate-500 hover:bg-white/5 hover:text-white">
              <Plus size={16} />
            </button>

          </div>


          <div className="space-y-1">

            <button className="flex w-full items-center gap-3 rounded-lg bg-blue-500/10 px-3 py-2.5 text-sm text-blue-400">
              <FileText size={17} />
              README
            </button>

            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white">
              <FileText size={17} />
              Project Notes
            </button>

          </div>

        </aside>


        {/* Main workspace */}
        <section className="flex-1 p-6 md:p-10">

          <div className="mx-auto max-w-5xl">

            {/* Project header */}
            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm text-blue-400">
                  PROJECT
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {project.name}
                </h2>

                {project.description && (
                  <p className="mt-3 max-w-2xl text-slate-400">
                    {project.description}
                  </p>
                )}

              </div>

              <button className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white">
                <MoreHorizontal size={20} />
              </button>

            </div>


            {/* Workspace cards */}
            <div className="mt-10 grid gap-5 md:grid-cols-3">

              <Link
  href={`/projects/${projectId}/documents`}
  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.05]"
>
  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
    <FileText size={22} />
  </div>

  <h3 className="mt-5 font-semibold text-white">
    Documents
  </h3>

  <p className="mt-2 text-sm leading-6 text-slate-500">
    Create and edit project documents.
  </p>
</Link>

              <WorkspaceCard
                icon={<Users size={22} />}
                title="Collaborators"
                description="Invite people to work with you."
              />

              <WorkspaceCard
                icon={<Settings size={22} />}
                title="Settings"
                description="Manage your project configuration."
              />

            </div>


            {/* Editor placeholder */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">

              <div className="flex h-12 items-center border-b border-white/10 bg-white/[0.02] px-4">

                <FileText
                  size={17}
                  className="text-slate-500"
                />

                <span className="ml-3 text-sm text-slate-300">
                  README
                </span>

              </div>

              <div className="min-h-[400px] bg-black/20 p-6">

                <p className="text-sm leading-7 text-slate-500">
                  Your collaborative editor will appear here.
                </p>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  This is where we will integrate the real-time
                  editing functionality.
                </p>

              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}


function WorkspaceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.05]">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
        {icon}
      </div>

      <h3 className="mt-5 font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>

    </button>
  );
}