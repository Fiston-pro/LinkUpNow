import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[rgba(26,16,52,0.7)] text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="px-6 py-3 bg-highlight text-white rounded-full hover:bg-orange-600 transition duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/50 focus:outline-none focus:ring-4 focus:ring-orange-600">
          Go Back to Home Page
      </Link>
    </div>
  );
}