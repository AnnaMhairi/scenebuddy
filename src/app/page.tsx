// src/app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        SceneBuddy 🎬
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        Your all-in-one tool for actors: upload audition scripts, rehearse with line highlighting, and manage your self-tape prep — all in one place.
      </p>
      <a
        href="/login"
        className="px-6 py-3 bg-black text-white rounded-xl text-lg hover:bg-gray-800 transition"
      >
        Get Started
      </a>
    </main>
  );
}
