import ChatInterface from "../components/AI/ChatInterface";
import AIActionLog from "../components/AI/AIActionLog"; // Optional log panel

export default function Home() {
  return (
    <main className="p-6 space-y-6">
      <ChatInterface />
      <AIActionLog />
    </main>
  );
}
