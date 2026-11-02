import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-[40rem] flex-col items-start justify-center gap-4 px-4">
      <h1 className="text-3xl font-bold">No encontré esa página</h1>
      <p className="text-ink-2">Puede que el link esté mal escrito o que la página ya no exista.</p>
      <Link href="/" className="btn btn-primary mt-2">
        Ir al inicio
      </Link>
    </main>
  );
}
