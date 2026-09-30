"use client";

import Editor from "@monaco-editor/react";

type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  language?: string;
};

export default function CodeEditor({
  value,
  onChange,
  language = "javascript",
}: CodeEditorProps) {
  return (
    <div className="h-full min-h-[500px] overflow-hidden rounded-xl border border-white/10">
      <Editor
        height="100%"
        language={language}
        theme="vs-dark"
        value={value}
        onChange={(value) => onChange(value ?? "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          automaticLayout: true,
          wordWrap: "on",
          scrollBeyondLastLine: false,
          padding: { top: 16 },
          tabSize: 2,
          formatOnPaste: true,
          suggestOnTriggerCharacters: true,
        }}
      />
    </div>
  );
}