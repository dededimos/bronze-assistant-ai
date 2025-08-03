'use client';

import AIActionLog from '../../components/AI/AIActionLog';      // σωστό
// ή
// import AIActionLog from '../../components/AI/AIActionLog.jsx';

export default function AssistantPage() {
  return (
    <main className="p-4">
      <AIActionLog />
    </main>
  );
}
