"use client"
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function PrivacyPolicy() {
  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const sectionsRef = useRef([]);
  const imageRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (pageRef.current) {
      // Overall page fade-in
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Main title entrance animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.5)", delay: 0.3 }
      );

      // Animate each section as it scrolls into view
      sectionsRef.current.forEach((section, index) => {
        if (section) { // Ensure the ref is not null
          gsap.fromTo(
            section,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: "power2.out",
              delay: 0.15,
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none", 
              }
            }
          );
        }
      });

      // Animate images as they scroll into view
      imageRefs.current.forEach((img, index) => {
        if (img) { // Ensure the ref is not null
          gsap.fromTo(
            img,
            { opacity: 0, scale: 0.9 },
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: img,
                start: "top 80%",
                toggleActions: "play none none none",
              }
            }
          );
        }
      });
    }
  }, []);

  return (
    <main ref={pageRef} className="min-h-screen pt-16 pb-20 text-primary">
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center text-center overflow-hidden mb-16">
        <Image
          src="/images/privacy-policy-banner-background.jpg"
          alt="Abstract privacy background with lock icon or digital patterns"
          layout="fill"
          objectFit="cover"
          quality={80}
          priority
          className="filter brightness-[0.6] opacity-70"
        />
        <div className="relative z-10 p-4 md:p-8">
          <h1 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white drop-shadow-lg">
            Your <div className='inline-block text-blue-600'>Privacy</div>, Our <div className='inline-block text-blue-600'>Priority</div>.
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mt-4 drop-shadow-md">
            Understanding how SamBlogs handles your data.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Wider content area */}
        <p className="text-xl md:text-2xl text-secondary mb-12 leading-relaxed">
          This Privacy Policy describes how SamBlogs ("we," "us," or "our") collects, uses, and discloses your information when you visit and interact with our website,{' '}
          <a href="https://www.samblogs.com" className="text-blue-500 underline hover:text-blue-700 transition-colors duration-200">
            www.samblogs.com
          </a>{' '}
          (the "Service"). We are committed to protecting your privacy and handling your data in an open and transparent manner.
        </p>

        <hr className="my-16 border-gray-700 w-1/2 mx-auto" />

        <section ref={el => sectionsRef.current[0] = el} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
              1. Information We Collect
            </h1>
            <p className="text-lg text-secondary mb-4 leading-relaxed">
              We collect different types of information for various purposes to provide and improve our Service to you. This includes **Personal Data** like your email and name for account management and communication, as well as **Usage Data** about how you interact with our site.
            </p>

            <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-tertiary mt-8">
              a. Personal Data
            </h3>
            <p className="text-lg text-secondary mb-4 leading-relaxed">
              While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to:
            </p>
            <ul className="list-disc ml-8 text-lg text-secondary space-y-2">
              <li>
                <strong className="text-tertiary">Email address:</strong> For account creation, notifications, and communication.
              </li>
              <li>
                <strong className="text-tertiary">Name:</strong> For personalization of your profile and interactions.
              </li>
              <li>
                <strong className="text-tertiary">Usage Data:</strong> Information about how the Service is accessed and used.
              </li>
              <li>
                <strong className="text-tertiary">Cookies and Usage Data:</strong> As detailed below.
              </li>
            </ul>
          </div>
          <div className="order-1 md:order-2 flex justify-center items-center">
            <Image
              ref={el => imageRefs.current[0] = el}
              src="/images/data-collection-privacy-security.jpg" // Image for data collection
              alt="Data privacy and security concept with padlock on a digital screen"
              width={500}
              height={350}
              objectFit="cover"
              className="rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105"
            />
          </div>
        </section>

        <hr className="my-16 border-gray-700 w-1/2 mx-auto" />

        <section ref={el => sectionsRef.current[1] = el} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="flex justify-center items-center">
            <Image
              ref={el => imageRefs.current[1] = el}
              src="/images/how-we-use-information.jpg" // Image for how we use information
              alt="People connecting through technology, representing data usage and community"
              width={500}
              height={350}
              objectFit="cover"
              className="rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
              2. How We Use Your Information
            </h1>
            <p className="text-lg text-secondary mb-4 leading-relaxed">
              At SamBlogs, your information helps us serve you better. We use collected data to **maintain and improve our Service**, deliver **customer support**, analyze usage patterns to **enhance your experience**, and manage your account for relevant content and community features.
            </p>
            <ul className="list-disc ml-8 text-lg text-secondary space-y-2">
              <li>To provide and maintain our Service.</li>
              <li>To notify you about changes to our Service.</li>
              <li>To allow you to participate in interactive features of our Service when you choose to do so.</li>
              <li>To provide customer support.</li>
              <li>To gather analysis or valuable information so that we can improve our Service.</li>
              <li>To monitor the usage of our Service.</li>
              <li>To detect, prevent, and address technical issues.</li>
              <li>To manage your account and provide you with relevant content and community features if you choose to become a registered user or writer.</li>
            </ul>
          </div>
        </section>

        <hr className="my-16 border-gray-700 w-1/2 mx-auto" />

        <section ref={el => sectionsRef.current[2] = el} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
              3. Disclosure of Your Information
            </h1>
            <p className="text-lg text-secondary mb-4 leading-relaxed">
              We may share your information under specific circumstances, such as with **trusted service providers** who help us operate, or when required by **legal obligations**. Your consent is always a priority for any other disclosures.
            </p>
            <ul className="list-disc ml-8 text-lg text-secondary space-y-2">
              <li>
                <strong className="text-tertiary">With Service Providers:</strong> We may employ third-party companies and individuals to facilitate our Service (e.g., hosting, analytics).
              </li>
              <li>
                <strong className="text-tertiary">For Legal Requirements:</strong> To comply with a legal obligation, protect our rights, or ensure public safety.
              </li>
              <li>
                <strong className="text-tertiary">With Your Consent:</strong> For any other purpose with your explicit consent.
              </li>
            </ul>
          </div>
          <div className="order-1 md:order-2 flex justify-center items-center">
            <Image
              ref={el => imageRefs.current[2] = el}
              src="/images/data-sharing-and-disclosure.jpg" // Image for disclosure
              alt="Group of people discussing data sharing and privacy"
              width={500}
              height={350}
              objectFit="cover"
              className="rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105"
            />
          </div>
        </section>

        <hr className="my-16 border-gray-700 w-1/2 mx-auto" />

        <section ref={el => sectionsRef.current[3] = el} className="mb-20">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary text-center">
            4. Security of Data & Your Rights
          </h1>
          <p className="text-lg md:text-xl text-secondary mb-8 text-center leading-relaxed max-w-3xl mx-auto">
            We are deeply committed to the security of your data. While no online transmission is 100% secure, we implement robust administrative, technical, and physical safeguards. You also have significant rights regarding your data.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-tertiary">
                Security of Data
              </h3>
              <p className="text-lg text-secondary mb-4 leading-relaxed">
                The security of your data is paramount to us. We continuously work to protect your Personal Data, but it's important to remember that no method of transmission over the Internet or electronic storage is entirely secure. We utilize commercially acceptable means to protect your data and are constantly striving to enhance our security measures.
              </p>
              <div className="flex justify-center mt-6">
                <Image
                  ref={el => imageRefs.current[3] = el}
                  src="/images/data-security-cybersecurity.jpg" // Image for data security
                  alt="Cyber security concept with glowing abstract lines and a lock icon"
                  width={400}
                  height={250}
                  objectFit="cover"
                  className="rounded-xl shadow-xl transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-tertiary">
                Your Data Protection Rights
              </h3>
              <p className="text-lg text-secondary mb-4 leading-relaxed">
                Depending on your location, you may have specific rights concerning your data, including:
              </p>
              <ul className="list-disc ml-8 text-lg text-secondary space-y-2">
                <li>
                  <strong className="text-tertiary">Access, Update or Delete:</strong> The right to access, update or delete the information we have on you.
                </li>
                <li>
                  <strong className="text-tertiary">Rectification:</strong> To have your information rectified if inaccurate or incomplete.
                </li>
                <li>
                  <strong className="text-tertiary">Object:</strong> To our processing of your Personal Data.
                </li>
                <li>
                  <strong className="text-tertiary">Restriction:</strong> To request that we restrict the processing of your personal information.
                </li>
                <li>
                  <strong className="text-tertiary">Data Portability:</strong> To receive a copy of your Personal Data in a machine-readable format.
                </li>
                <li>
                  <strong className="text-tertiary">Withdraw Consent:</strong> To withdraw your consent at any time where SamBlogs relied on your consent.
                </li>
              </ul>
              <p className="text-lg text-secondary mt-4">
                We may ask you to verify your identity before fulfilling these requests.
              </p>
            </div>
          </div>
        </section>

        <hr className="my-16 border-gray-700 w-1/2 mx-auto" />

        <section ref={el => sectionsRef.current[4] = el} className="mb-20">
          <h1 className="text-3xl md:text-4xl font-bold mb-12 text-primary text-center">
            6. Important Considerations
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-tertiary">
                Links to Other Sites
              </h3>
              <p className="text-lg text-secondary mb-4 leading-relaxed">
                Our Service may contain links to other sites not operated by us. We strongly advise you to review the Privacy Policy of every site you visit, as we have no control over their content or practices.
              </p>
              <div className="flex justify-center mt-6">
                <Image
                  ref={el => imageRefs.current[4] = el}
                  src="/images/external-website-links.jpg" // Image for external links
                  alt="Person interacting with multiple website links on a screen"
                  width={400}
                  height={250}
                  objectFit="cover"
                  className="rounded-xl shadow-xl transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-tertiary">
                Children's Privacy
              </h3>
              <p className="text-lg text-secondary mb-4 leading-relaxed">
                SamBlogs is not intended for anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from Children. If you are a parent or guardian and believe your Child has provided us with Personal Data, please contact us immediately so we can take steps to remove it.
              </p>
              <div className="flex justify-center mt-6">
                <Image
                  ref={el => imageRefs.current[5] = el}
                  src="/images/childrens-online-safety.jpg" // Image for children's privacy
                  alt="Child using a tablet, emphasizing online safety for children"
                  width={400}
                  height={250}
                  objectFit="cover"
                  className="rounded-xl shadow-xl transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>

        <hr className="my-16 border-gray-700 w-1/2 mx-auto" />

        <section ref={el => sectionsRef.current[5] = el} className="text-center mb-20">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
            8. Changes to This Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            We may update our Privacy Policy periodically. We'll notify you of significant changes via email or a prominent notice on our Service before they become effective. We encourage you to review this policy regularly.
          </p>
        </section>

        <hr className="my-16 border-gray-700 w-1/2 mx-auto" />

        <section ref={el => sectionsRef.current[6] = el} className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
            9. Contact Us
          </h1>
          <p className="text-lg md:text-xl text-secondary mb-6 max-w-2xl mx-auto leading-relaxed">
            Have questions or concerns about our Privacy Policy? We're here to help. Reach out to us through the following channels:
          </p>
          <ul className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 text-lg md:text-xl text-secondary mb-12">
            <Link href='/contact'>
              <strong className='text-xl text-blue-600 underline'>Contact Us</strong>
            </Link>
          </ul>
        </section>

        <p className="text-sm text-center text-tertiary mt-12 opacity-80">
          <strong className="text-primary">Last updated: July 28, 2025</strong>
        </p>
      </div>
    </main>
  );
}