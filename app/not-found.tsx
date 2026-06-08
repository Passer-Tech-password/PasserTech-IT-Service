import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-foreground/60 mb-8">Ndo, anyị enweghị ike ịchọta ibe a.</p>
      <Link
        href="/"
        className="bg-primary text-background px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all"
      >
        Laghachi n'ụlọ (Return Home)
      </Link>
    </div>
  );
}
