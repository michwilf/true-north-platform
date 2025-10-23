"use client";

/**
 * StreamingMarkdown Component
 * Renders markdown with proper styling and a typing cursor effect
 */

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface StreamingMarkdownProps {
  content: string;
  isStreaming?: boolean;
  className?: string;
}

export default function StreamingMarkdown({
  content,
  isStreaming = false,
  className = "",
}: StreamingMarkdownProps) {
  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold text-gray-900 mt-5 mb-3">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
              {children}
            </h3>
          ),

          // Paragraphs
          p: ({ children }) => (
            <p className="text-gray-700 leading-relaxed mb-3">{children}</p>
          ),

          // Lists
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1 mb-4 text-gray-700">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="ml-4 leading-relaxed">{children}</li>
          ),

          // Code blocks
          code: ({ className, children }) => {
            const isInline = !className;
            return isInline ? (
              <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            ) : (
              <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto mb-4">
                {children}
              </code>
            );
          },

          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
              {children}
            </blockquote>
          ),

          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),

          // Tables
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full divide-y divide-gray-200">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="bg-white divide-y divide-gray-200">
              {children}
            </tbody>
          ),
          tr: ({ children }) => <tr>{children}</tr>,
          th: ({ children }) => (
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 text-sm text-gray-700">{children}</td>
          ),

          // Strong/Bold
          strong: ({ children }) => (
            <strong className="font-bold text-gray-900">{children}</strong>
          ),

          // Emphasis/Italic
          em: ({ children }) => (
            <em className="italic text-gray-700">{children}</em>
          ),

          // Horizontal rule
          hr: () => <hr className="my-6 border-t border-gray-300" />,
        }}
      >
        {content}
      </ReactMarkdown>

      {/* Typing cursor when streaming */}
      {isStreaming && (
        <span className="inline-block w-2 h-5 bg-blue-600 ml-1 animate-pulse"></span>
      )}
    </div>
  );
}

/**
 * Compact version for smaller spaces
 */
export function StreamingMarkdownCompact({
  content,
  isStreaming = false,
  className = "",
}: StreamingMarkdownProps) {
  return (
    <div className={`text-sm ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-lg font-bold text-gray-900 mb-2">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-bold text-gray-900 mb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-gray-700 leading-relaxed mb-2">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-1 mb-2 text-gray-700">
              {children}
            </ul>
          ),
          code: ({ className, children }) => {
            const isInline = !className;
            return isInline ? (
              <code className="bg-gray-100 text-red-600 px-1 py-0.5 rounded text-xs font-mono">
                {children}
              </code>
            ) : (
              <code className="block bg-gray-900 text-gray-100 p-2 rounded text-xs font-mono overflow-x-auto mb-2">
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>

      {isStreaming && (
        <span className="inline-block w-1.5 h-4 bg-blue-600 ml-1 animate-pulse"></span>
      )}
    </div>
  );
}
