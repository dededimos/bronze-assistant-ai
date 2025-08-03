'use client';
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatInterface() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "system", content: "Καλησπέρα! Τι θέλεις να φτιάξεις σήμερα;" },
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newUserMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    const simulatedResponse = {
      role: "assistant",
      content: `Κατάλαβα: ${input}. Θα σου προτείνω μοντέλο VS με BronzeClean.`,
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, simulatedResponse]);
    }, 800);
  };

  return (
    <Card className="w-full max-w-xl shadow border">
      <CardContent className="p-4">
        <h2 className="text-lg font-semilbold mb-2">
          🤖 Χάλκινη συνομιλία AI
        </h2>
        <ScrollArea className="h-64 border rounded p-2 mb-4">
          <div className="space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.role === "user"
                    ? "text-right"
                    : "text-left text-gray-700"
                }
              >
                <span className="inline-block bg-gray-100 rounded px-2 py-1">
                  {msg.content}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex gap-2">
          <Input
            placeholder="Πες μου τι θέλεις να φτιάξεις..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
}
