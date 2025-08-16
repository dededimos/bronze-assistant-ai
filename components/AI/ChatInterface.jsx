'use client';

import { useState } from 'react';

type Msg = { role: 'user' | 'assistant'; content: string };

export default function ChatInterface() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsgs = [...messages, { role: 'user', content: input }];
    setMessages(newMsgs);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMsgs }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages([...newMsgs, { role: 'assistant', content: data.reply.content }]);
      }
    } catch (error) {
      console.error('Chat error', error);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="border p-4 h-64 overflow-y-auto mb-2">
        {messages.map((m, i) => (
          <p key={i} className={m.role === 'user' ? 'text-right' : ''}>
            <strong>{m.role === 'user' ? 'Εσύ:' : 'AI:'}</strong> {m.content}
          </p>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-2"
          placeholder="Γράψε μήνυμα..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded disabled:opacity-40"
          disabled={!input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}
