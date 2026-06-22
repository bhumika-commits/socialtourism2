import React, { useState } from 'react';
import { PROJECT_CODE_STRUCTURE, ProjectFile } from '../data/projectCodeStructure';
import { Code2, Copy, Check, Folder, FileCode, FileText, FileJson, Database, Package } from 'lucide-react';

export const CodeViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<ProjectFile>(PROJECT_CODE_STRUCTURE[0]);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    if (selectedFile.content) {
      navigator.clipboard.writeText(selectedFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const getFileIcon = (file: ProjectFile) => {
    if (file.type === 'directory') return <Folder className="w-4 h-4 text-amber-500" />;
    if (file.language === 'python') return <FileCode className="w-4 h-4 text-blue-500" />;
    if (file.language === 'csv') return <Database className="w-4 h-4 text-emerald-500" />;
    if (file.language === 'json') return <FileJson className="w-4 h-4 text-amber-600" />;
    if (file.language === 'markdown') return <FileText className="w-4 h-4 text-indigo-500" />;
    return <Package className="w-4 h-4 text-slate-400" />;
  };

  const renderTree = (files: ProjectFile[], depth = 0) => {
    return files.map((file, idx) => {
      const isSelected = selectedFile.path === file.path;
      if (file.type === 'directory') {
        return (
          <div key={idx} className="space-y-1">
            <div 
              className="flex items-center space-x-2 px-3 py-1.5 text-sm font-bold text-slate-300 select-none"
              style={{ paddingLeft: `${(depth * 16) + 12}px` }}
            >
              {getFileIcon(file)}
              <span>{file.name}/</span>
            </div>
            {file.children && (
              <div className="space-y-0.5">
                {renderTree(file.children, depth + 1)}
              </div>
            )}
          </div>
        );
      }

      return (
        <button
          key={idx}
          onClick={() => setSelectedFile(file)}
          className={`w-full flex items-center space-x-2 px-3 py-1.5 text-xs font-medium transition duration-150 text-left ${
            isSelected 
              ? 'bg-blue-600 text-white font-bold shadow' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
          style={{ paddingLeft: `${(depth * 16) + 12}px` }}
        >
          {getFileIcon(file)}
          <span className="truncate">{file.name}</span>
        </button>
      );
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-2">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              💻 Project Code Repository & Deployment Assets
            </h1>
            <p className="text-slate-600 text-sm">
              Complete, GitHub-ready directory structure for Streamlit Cloud deployment. Inspect or copy the Python source code below.
            </p>
          </div>
        </div>
      </div>

      {/* Directory Browser & Code Viewer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* File Tree Sidebar */}
        <div className="lg:col-span-1 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg overflow-hidden py-4 h-[650px] flex flex-col">
          <div className="px-4 pb-3 border-b border-slate-800 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Repository Structure</span>
            <span className="text-xs font-mono font-medium text-blue-400 block mt-0.5">Tourism_Analytics_System/</span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1 px-2">
            {renderTree(PROJECT_CODE_STRUCTURE)}
          </div>
        </div>

        {/* Code Editor Preview */}
        <div className="lg:col-span-3 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg overflow-hidden h-[650px] flex flex-col">
          {/* Editor Header Bar */}
          <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-white font-mono text-sm font-bold">
              {getFileIcon(selectedFile)}
              <span>{selectedFile.path}</span>
            </div>
            
            <button
              onClick={handleCopy}
              disabled={!selectedFile.content}
              className={`inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold transition duration-200 gap-1.5 ${
                copied 
                  ? 'bg-emerald-600 text-white shadow' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Code Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-blue-400" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Editor Text Area */}
          <div className="flex-1 p-6 overflow-y-auto font-mono text-xs leading-relaxed text-slate-100 bg-slate-900 custom-scrollbar">
            <pre className="whitespace-pre-wrap select-text font-mono">
              {selectedFile.content || `[Binary or Directory Object: ${selectedFile.name}]`}
            </pre>
          </div>

          {/* Footer status bar */}
          <div className="bg-slate-950 px-6 py-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Language: {selectedFile.language || 'text'}</span>
            <span>UTF-8 • Streamlit App Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
};
