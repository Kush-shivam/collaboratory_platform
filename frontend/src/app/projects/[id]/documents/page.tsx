"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Plus,
  Save,
  Users,
  Settings,
} from "lucide-react";

export default function DocumentsPage() {
  const [activeDocument, setActiveDocument] = useState("README");
  const [content, setContent] = useState(
    `# Welcome to Collaboratory

This is your project document.

Start writing and collaborating with your team.

## Project Overview

Add your project information here.

## Tasks

- Create project structure
- Add collaborators
- Start collaborating
`
  );

  const documents = [
    "README",
    "Project Notes",
  ];

  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-white">

      {/* HEADER */}
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
              className="ml-2 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Save size={16} />
              Save
            </button>

          </div>

        </div>

      </header>


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
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck={false}
            className="min-h-[calc(100vh-128px)] flex-1 resize-none border-none bg-[#020617] p-8 font-mono text-sm leading-7 text-slate-300 outline-none"
          />

        </section>

      </div>

    </main>
  );
}