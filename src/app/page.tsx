import Terminal from '@/components/Terminal';
import { logout } from './actions';

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-screen bg-black overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-white/5 border-b border-white/10 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-4 text-sm font-medium text-gray-300">root@vps-anywhere:~</span>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="text-xs px-3 py-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20"
          >
            Disconnect
          </button>
        </form>
      </header>

      {/* Terminal Area */}
      <div className="flex-1 relative">
        <Terminal />
      </div>
    </main>
  );
}
