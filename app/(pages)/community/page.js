"use client"
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function CommunityPage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const showcaseRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Hero Section Animation
    if (heroRef.current) {
      tl.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.6, delay: .6, ease: "power3.out" }
      );
    }

    // Features Section Animation
    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current.children,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%", // When the top of the section enters 80% of the viewport
            // toggleActions: "play none none reverse", // Play on enter, reverse on leave
            once: true, // Only animate once
          },
        }
      );
    }

    // Community Showcase Animation (cards revealed from bottom)
    if (showcaseRef.current) {
      gsap.fromTo(
        Array.from(showcaseRef.current.children),
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: showcaseRef.current,
            start: "top 75%",
            // toggleActions: "play none none reverse",
            once: true,
          },
        }
      );
    }

    // CTA Section Animation
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current.children,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 70%",
            // toggleActions: "play none none reverse",
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background-color text-primary">
      <main>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative flex flex-col md:flex-row items-center justify-center py-20 px-4 md:px-8 xl:px-[10vw] overflow-hidden rounded-lg"
        >
          <div className="md:w-1/2 text-center md:text-left md:pr-8 mb-8 md:mb-0 z-10">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-blue-600">
              Join Our Vibrant Community
            </h1>
            <p className="text-xl md:text-2xl text-secondary mb-6">
              Connect, share, and grow with fellow enthusiasts and writers!
            </p>
            <Link
              href="/login"
              className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 relative overflow-hidden group"
            >
              Login
              <span className="absolute top-0 left-0 w-full h-full border-2 border-blue-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              <span className="absolute top-0 left-0 w-full h-full border-2 border-blue-600 rounded-full transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out delay-150"></span>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center z-10">
            <Image
              src="/images/pexels-belle-co-99483-1000445.jpg"
              alt="Community Members"
              width={600}
              height={400}
              className="rounded-lg shadow-xl max-w-full h-auto object-cover"
            />
          </div>
          
          {/* Decorative background elements for aesthetic appeal */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute w-64 h-64 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob top-1/4 left-1/4"></div>
            <div className="absolute w-64 h-64 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 top-1/2 right-1/4"></div>
            <div className="absolute w-64 h-64 bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 bottom-1/4 left-1/2"></div>
          </div>
        </section>

        {/* Community Features Section */}
        <section className="py-20 px-4 md:px-8 xl:px-[10vw] bg-surface rounded-lg shadow-lg mx-auto my-12 w-[96vw] md:w-[90vw] transition-all duration-500 hover:shadow-2xl border-2 border-blue-600">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-blue-600">
            What You'll Find Here
          </h2>
          <div
            ref={featuresRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Feature Card 1 */}
            <div className="nested-card-bg p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-3 text-primary">
                Engaging Forums
              </h3>
              <p className="text-secondary">
                Discuss your favorite topics, ask questions, and share insights
                with a passionate community.
              </p>
            </div>
            {/* Feature Card 2 */}
            <div className="nested-card-bg p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-3 text-primary">
                Collaborative Projects
              </h3>
              <p className="text-secondary">
                Find co-authors, get feedback on your drafts, and work together
                on exciting new content.
              </p>
            </div>
            {/* Feature Card 3 */}
            <div className="nested-card-bg p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-3 text-primary">
                Exclusive Events
              </h3>
              <p className="text-secondary">
                Participate in webinars, Q&A sessions with expert writers, and
                community challenges.
              </p>
            </div>
            {/* Feature Card 4 */}
            <div className="nested-card-bg p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-3 text-primary">
                Member Spotlights
              </h3>
              <p className="text-secondary">
                Get recognized for your contributions and discover inspiring
                stories from fellow members.
              </p>
            </div>
            {/* Feature Card 5 */}
            <div className="nested-card-bg p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-3 text-primary">
                Resource Library
              </h3>
              <p className="text-secondary">
                Access a curated collection of guides, templates, and tools to
                enhance your blogging skills.
              </p>
            </div>
            {/* Feature Card 6 */}
            <div className="nested-card-bg p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-3 text-primary">
                Direct Messaging
              </h3>
              <p className="text-secondary">
                Connect one-on-one with other members for private discussions
                and networking.
              </p>
            </div>
          </div>
        </section>

        {/* Community Showcase Section (Examples/Testimonials) */}
        <section className="py-20 px-4 md:px-8 xl:px-[10vw] bg-primary rounded-lg mx-auto my-12 md:w-[85vw] transition-all duration-500">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-blue-600">
            Hear From Our Members
          </h2>
          <div ref={showcaseRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial Card 1 */}
            <div className="nested-card-bg p-6 rounded-lg shadow-md">
              <p className="italic text-secondary mb-4">
                "SamBlogs community has been a game-changer for my writing. The
                feedback and encouragement are invaluable!"
              </p>
              <div className="flex items-center">
                <Image
                  src="/images/avatar-1.jpg" // Replace with actual avatar
                  alt="Member Avatar"
                  width={50}
                  height={50}
                  className="rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold text-primary">Jane Doe</h4>
                  <p className="text-tertiary text-sm">Active Member</p>
                </div>
              </div>
            </div>
            {/* Testimonial Card 2 */}
            <div className="nested-card-bg p-6 rounded-lg shadow-md">
              <p className="italic text-secondary mb-4">
                "I've learned so much from the discussions here. It's truly a
                supportive and knowledgeable environment."
              </p>
              <div className="flex items-center">
                <Image
                  src="/images/avatar-2.jpg" // Replace with actual avatar
                  alt="Member Avatar"
                  width={50}
                  height={50}
                  className="rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold text-primary">John Smith</h4>
                  <p className="text-tertiary text-sm">New Contributor</p>
                </div>
              </div>
            </div>
            {/* Add more testimonial cards as needed */}
          </div>
        </section>

        {/* Final Call to Action */}
        <section
          ref={ctaRef}
          className="py-20 px-4 md:px-8 xl:px-[10vw] text-center bg-surface rounded-lg shadow-lg mx-auto my-12 w-[96vw] md:w-[90vw] transition-all duration-500 hover:scale-[1.002] hover:shadow-2xl border-2 border-blue-600"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-blue-600">
            Ready to Connect?
          </h2>
          <p className="text-xl md:text-2xl text-secondary mb-8">
            Start your journey with SamBlogs community today!
          </p>
          <Link
            href="/signup"
            className="px-10 py-4 bg-blue-600 text-white text-xl font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Sign Up
          </Link>
        </section>
      </main>
    </div>
  );
}
