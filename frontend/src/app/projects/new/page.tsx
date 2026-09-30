"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, FolderPlus } from "lucide-react";
import { supabase } from "../../../lib/supabase/client";

export default function NewProjectPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreateProject(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Project name is required.");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("projects")
      .insert({
        name: name.trim(),
        description: description.trim(),
        owner_id: user.id,
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push(`/projects/${data.id}`);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="border-b border-white/10">

        <div className="mx-auto flex h-20 max-w-5xl items-center px-6">

          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to dashboard
          </Link>

        </div>

      </header>


      {/* Content */}
      <section className="mx-auto max-w-2xl px-6 py-16">

        <div className="mb-10">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
            <FolderPlus size={28} />
          </div>

          <h1 className="mt-6 text-3xl font-bold">
            Create a new project
          </h1>

          <p className="mt-3 text-slate-400">
            Start a new workspace and invite your team
            to collaborate.
          </p>

        </div>


        <form
          onSubmit={handleCreateProject}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-8"
        >

          {/* Project name */}
          <div>

            <label className="mb-2 block text-sm font-medium">
              Project name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Website Redesign"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
            />

          </div>


          {/* Description */}
          <div className="mt-6">

            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this project about?"
              rows={5}
              className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
            />

          </div>


          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}


          {/* Buttons */}
          <div className="mt-8 flex gap-3">

            <Link
              href="/dashboard"
              className="flex-1 rounded-xl border border-white/10 py-3 text-center text-sm font-medium text-slate-300 transition hover:bg-white/5"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-medium transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Creating..."
                : "Create project"}
            </button>

          </div>

        </form>

      </section>

    </main>
  );
}