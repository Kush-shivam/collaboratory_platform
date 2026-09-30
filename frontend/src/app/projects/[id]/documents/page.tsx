"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import CodeEditor from "@/components/editor/CodeEditor";
import { supabase } from "@/src/lib/supabase/client";
import {
  ArrowLeft,
  FileText,
  Plus,
  Save,
  Users,
  Settings,
} from "lucide-react";

export default function DocumentsPage() {
  const params = useParams();
  const projectId = params.id as string;

  const [activeDocument, setActiveDocument] = useState("README");
  const [content, setContent] = useState("");
  const [documentId, setDocumentId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const documents = ["README", "Project Notes"];

  // Default README content
  const defaultContent = `# Welcome to Collaboratory

This is your project document.

Start writing and collaborating with your team.

## Project Overview

Add your project information here.

## Tasks

- Create project structure
- Add collaborators
- Start collaborating
`;

  // Load README from Supabase
  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true);
      setSaveMessage("");

      try {
        // Check logged-in user
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setSaveMessage("Please log in first.");
          setLoading(false);
          return;
        }

        // Look for README belonging to this project
        const { data, error } = await supabase
          .from("documents")
          .select("*")
          .eq("project_id", projectId)
          .eq("name", "README")
          .eq("created_by", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error loading document:", error);
          setSaveMessage("Failed to load document.");
          setLoading(false);
          return;
        }

        if (data) {
          // Existing document
          setDocumentId(data.id);
          setContent(data.content);
        } else {
          // No document yet
          setContent(defaultContent);
        }
      } catch (error) {
        console.error(error);
        setSaveMessage("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      loadDocument();
    }
  }, [projectId]);

  // Save document
  const handleSave = async () => {
    setSaving(true);
    setSaveMessage("");

    try {
      // Get logged-in user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setSaveMessage("Please log in first.");
        setSaving(false);
        return;
      }

      if (documentId) {
        // Update existing document
        const { error } = await supabase
          .from("documents")
          .update({
            content: content,
            updated_at: new Date().toISOString(),
          })
          .eq("id", documentId)
          .eq("created_by", user.id);

        if (error) {
          console.error("Error updating document:", error);
          setSaveMessage("Failed to save.");
          setSaving(false);
          return;
        }
      } else {
        // Create new document
        const { data, error } = await supabase
          .from("documents")
          .insert({
            project_id: projectId,
            name: "README",
            content: content,
            created_by: user.id,
          })
          .select()
          .single();

        if (error) {
          console.error("Error creating document:", error);
          setSaveMessage("Failed to save.");
          setSaving(false);
          return;
        }

        setDocumentId(data.id);
      }

      setSaveMessage("Saved successfully");

      // Remove message after 2 seconds
      setTimeout(() => {
        setSaveMessage("");
      }, 2000);
    } catch (error) {
      console.error(error);
      setSaveMessage("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-white">

      {/* HEADER */}
      <header className="border-b border-white/10">
        <div className="flex h-20 items-center justify-between px-6">

          <div className="flex items-center gap-5">

            <Link
              href={`/projects/${projectId}`}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft size={20} />
            </Link>

            <div className="h-7 w-px bg-white/10" />

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <FileText size={20} />
              </div>

              <div>
                <h1 className="font-semibold">
                  Documents
                </h1>

                <p className="text-xs text-slate-500">
                  Project documents
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">

            <button
              className="rounded-lg p-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white"
              title="Collaborators"
            >
              <Users size={19} />
            </button>

            <button
              className="rounded-lg p-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white"
              title="Settings"
            >
              <Settings size={19} />
            </button>

            <button
              onClick={handleSave}
              disabled={saving || loading}
              className="ml-2 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={16} />

              {saving ? "Saving..." : "Save"}
            </button>

          </div>

        </div>

      </header>

      {/* SAVE MESSAGE */}
      {saveMessage && (
        <div className="absolute right-6 top-24 z-50 rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-sm text-slate-300 shadow-lg">
          {saveMessage}
        </div>
      )}

      {/* DOCUMENT WORKSPACE */}
      <div className="flex flex-1">

        {/* SIDEBAR */}
        <aside className="w-64 shrink-0 border-r border-white/10">

          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">

            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Documents
            </span>

            <button
              className="rounded-md p-1.5 text-slate-500 transition hover:bg-white/5 hover:text-white"
              title="New document"
            >
              <Plus size={16} />
            </button>

          </div>

          <div className="space-y-1 p-3">

            {documents.map((document) => (

              <button
                key={document}
                onClick={() => setActiveDocument(document)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  activeDocument === document
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >

                <FileText size={17} />

                {document}

              </button>

            ))}

          </div>

        </aside>

        {/* EDITOR */}
        <section className="flex min-w-0 flex-1 flex-col">

          {/* DOCUMENT TAB */}
          <div className="flex h-12 items-center border-b border-white/10 bg-white/[0.02] px-5">

            <FileText
              size={16}
              className="text-blue-400"
            />

            <span className="ml-3 text-sm text-slate-300">
              {activeDocument}
            </span>

          </div>

          {/* EDITOR AREA */}
          <div className="min-h-[500px] flex-1">

            {loading ? (
              <div className="flex h-[500px] items-center justify-center text-slate-500">
                Loading document...
              </div>
            ) : (
              <CodeEditor
                value={content}
                onChange={setContent}
                language="markdown"
              />
            )}

          </div>

        </section>

      </div>

    </main>
  );
}