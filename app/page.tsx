import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/gcprof-ai-academy_logo_01.png"
          alt="gcprof-ai-academy logo"
          width={300}
          height={300}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome!
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            <a
              href="https://gcprof-ai-academy.vercel.app/"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              gcprof-ai-academy.vercel.app
            </a>
          </p>
        </div>



      </main>
    </div>
  );
}
