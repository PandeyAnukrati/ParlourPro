"use client";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        {/* Hero Section */}
        <section className="w-full max-w-4xl text-center mb-16">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <Image
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
              alt="Modern Salon"
              width={600}
              height={400}
              className="rounded-2xl shadow-2xl w-full max-w-xs md:max-w-sm h-auto object-cover border-4 border-white"
              style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)' }}
            />
            <div className="flex-1">
              <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-pink-500 to-fuchsia-600 mb-6 drop-shadow-xl">
                ParlourPro
              </h1>
              <p className="text-2xl md:text-3xl text-gray-700 mb-8 font-medium">
                The all-in-one modern dashboard for beauty parlours & salons
              </p>
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
                <Link href="/login">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-200 border-2 border-indigo-700">
                    Admin Login
                  </button>
                </Link>
                <Link href="/user-login">
                  <button className="bg-white border-2 border-pink-400 text-pink-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-pink-50 transition-all duration-200">
                    Employee Login
                  </button>
                </Link>
              </div>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                {/* Dashboard quick links removed as requested */}
              </div>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section className="w-full max-w-5xl bg-white/80 rounded-2xl shadow-2xl p-10 mb-12 border border-indigo-100">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4 text-center">
            Why ParlourPro?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-xl bg-gradient-to-br from-pink-50 to-white shadow">
              <h3 className="text-xl font-semibold text-pink-600 mb-2">
                Role-Based Access
              </h3>
              <p className="text-gray-700">
                Separate portals for admins and employees, with secure
                authentication and permissions.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-white shadow">
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                Live Attendance & Tasks
              </h3>
              <p className="text-gray-700">
                Real-time attendance punch, instant task updates, and modern UI for
                daily operations.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-fuchsia-50 to-white shadow">
              <h3 className="text-xl font-semibold text-fuchsia-600 mb-2">
                Modern Dashboard
              </h3>
              <p className="text-gray-700">
                Beautiful, responsive design with summary stats, graphs,
                notifications, and more.
              </p>
            </div>
          </div>
        </section>
        {/* Call to Action */}
        <section className="w-full max-w-2xl text-center mt-8">
          <h3 className="text-2xl font-bold text-indigo-700 mb-2">
            Ready to streamline your parlour?
          </h3>
          <p className="text-gray-700 mb-6">
            Login as Admin or Employee to get started!
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/login">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition">
                Admin Login
              </button>
            </Link>
            <Link href="/user-login">
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold shadow transition">
                Employee Login
              </button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
