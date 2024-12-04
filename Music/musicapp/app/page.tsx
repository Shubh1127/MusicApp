import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Play, Users, Radio } from "lucide-react";
import Link from "next/link";
import { Appbar } from "./components/Appbar";

export default function LandingPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <Appbar />
        <header className="px-4 lg:px-6 h-14 flex items-center bg-gray-800"></header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-800">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-purple-400">
                    Let Your Fans Be the DJ
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                    Where creators and fans unite to create the perfect streaming soundtrack.
                  </p>
                </div>
                <div className="space-x-4">
                  <Button className="bg-purple-600 text-white hover:bg-purple-700 transition-colors">
                    Get Started
                  </Button>
                  <Button
                    variant="outline"
                    className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-gray-900 transition-colors"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-purple-400">
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <Play className="h-12 w-12 mb-4 text-purple-500" />
                  <h3 className="text-xl font-bold mb-2 text-purple-400">Start Your Stream</h3>
                  <p className="text-gray-400">Create your unique streaming channel in minutes.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Users className="h-12 w-12 mb-4 text-purple-500" />
                  <h3 className="text-xl font-bold mb-2 text-purple-400">Engage Your Fans</h3>
                  <p className="text-gray-400">Let your audience vote on songs in real-time.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Radio className="h-12 w-12 mb-4 text-purple-500" />
                  <h3 className="text-xl font-bold mb-2 text-purple-400">Enjoy Together</h3>
                  <p className="text-gray-400">Experience interactive listening sessions.</p>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
            <div className="container px-4 md:px-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4 text-purple-400">
                Ready to Revolutionize Your Streams?
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl mb-8">
                Join FanTune today and start creating unforgettable, fan-driven music experiences.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row justify-center">
                <Button
                  size="lg"
                  className="bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                >
                  Sign Up as Creator
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-gray-900 transition-colors"
                >
                  Join as Fan
                </Button>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700 bg-gray-800">
          <p className="text-xs text-gray-400">© 2024 FanTune. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs text-gray-400 hover:text-purple-400 transition-colors"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs text-gray-400 hover:text-purple-400 transition-colors"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </>
  );
}
