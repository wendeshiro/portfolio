"use client";
import ProjectTitle from "@/components/ProjectTitle";
import ParallaxImage from "@/components/ParallaxImage";
import ProjectOverview from "@/components/ProjectOverview";
import SectionDivider from "@/components/SectionDivider";
import Image from "next/image";
import HeroImg from "@/images/development/plan-it/plan-it-hero.webp";
import Snippet01 from "@/images/development/plan-it/snippet-01.png";
import Snippet02 from "@/images/development/plan-it/snippet-02.png";
import Snippet03 from "@/images/development/plan-it/snippet-03.png";
import Pdf from "@/images/development/plan-it/pdf.png";
import DatePicker from "@/images/development/plan-it/date-picker.jpg";
import Dropdown from "@/images/development/plan-it/dropdown.png";
import { motion } from "framer-motion";

export default function PlanIt() {
  return (
    <main className="max-w-full py-16 md:py-36">
      <header className="mx-auto flex max-w-7xl flex-col px-5">
        <ProjectTitle
          title="Plan-it: Trip Planning Web App"
          year={2025}
          description="A desktop web app for organizing trips, tracking weather, and preparing with confidence."
        />
      </header>
      <ParallaxImage src={HeroImg} alt="Plan-it Trip Planning Web App hero" />
      <section className="mx-auto flex max-w-7xl flex-col px-5">
        <ProjectOverview
          primaryText={
            <p>
              Plan-it is a{" "}
              <span className="text-primary">desktop web application</span>{" "}
              created to help travelers organize trips in a clear and reliable
              way. The project addresses the need for a single place where{" "}
              <span className="text-primary">
                itineraries, weather information, and preparation tasks
              </span>{" "}
              can be viewed together, reducing confusion and missed details
              during trip planning.
            </p>
          }
          secondaryText={
            <>
              <p>
                The main challenge was presenting essential information—such as
                schedules, forecasts, and checklists—in a way that feels simple
                and approachable. Built with React and integrated with external
                APIs for city and weather data, along with PDF exports for
                offline access, the application provides a structured and
                dependable planning experience that supports confident travel
                preparation.
              </p>
              <p>
                *This is a concept project created for educational purposes.
              </p>
            </>
          }
          details={[
            {
              label: "Deliverables",
              content: "Desktop Web Application",
            },
            {
              label: "Tools & Skills",
              content:
                "React / JavaScript / Vite / External APIs / Third-Party Libraries",
            },
            {
              label: "Main Responsibilities",
              content:
                "Website Development / Project Management / Sitemap Planning",
            },
          ]}
          links={[
            {
              label: "Live App",
              url: "https://comp-3170-plan-it.vercel.app/",
            },
            {
              label: "GitHub Repo",
              url: "https://github.com/wendeshiro/COMP-3170-Plan-it",
            },
          ]}
        />
        <SectionDivider />
        <motion.section
          initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
          whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
          transition={{ duration: 1, ease: "easeOut" }} // Animation settings
          viewport={{ once: true, amount: 0.02 }} // Trigger animation when 2% in view, only once
          className="relative"
        >
          <div className="flex flex-col">
            <h2 className="mb-7 font-serif text-2xl font-medium md:text-4xl md:font-normal">
              State Management & Data Handling
            </h2>
            <div className="bg-primary/10 flex h-auto items-center justify-center overflow-hidden rounded-xl p-4 md:h-[80vh] md:p-20">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/videos/plan-it/plan-it-demo-placeholder.png"
                className="w-full rounded-xl shadow-xl"
              >
                <source
                  src="/videos/plan-it/plan-it-demo.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
              whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
              transition={{ duration: 1, ease: "easeOut" }} // Animation settings
              viewport={{ once: true, amount: 0.02 }} // Trigger animation when 2% in view, only once
              className="mt-10 flex flex-col gap-8 md:flex-row md:justify-between md:gap-10"
            >
              <div className="top-24 space-y-3 self-start text-base md:sticky md:w-1/2 md:text-lg">
                <p>
                  Travel plans are stored in{" "}
                  <span className="text-primary">localStorage</span> using
                  .getItem() and .setItem() to persist data.
                </p>
                <p>
                  The <span className="text-primary">useState</span> hook
                  manages the component’s state and updates the display whenever
                  the data changes.
                </p>
                <p>
                  Together, these technologies enable{" "}
                  <span className="text-primary">
                    Create, Read, Update, and Delete (CRUD)
                  </span>{" "}
                  operations on the travel plans.
                </p>
              </div>
              <div className="flex flex-col gap-8 md:w-1/2">
                <div className="overflow-hidden rounded-xl shadow-2xl shadow-black/30">
                  <Image
                    src={Snippet01}
                    alt="snippet01"
                    placeholder="blur"
                    unoptimized
                  />
                </div>
                <div className="overflow-hidden rounded-xl shadow-2xl shadow-black/30">
                  <Image
                    src={Snippet02}
                    alt="snippet02"
                    placeholder="blur"
                    unoptimized
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
        <SectionDivider />
        <motion.section
          initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
          whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
          transition={{ duration: 1, ease: "easeOut" }} // Animation settings
          viewport={{ once: true, amount: 0.02 }} // Trigger animation when 2% in view, only once
          className="relative"
        >
          <div className="flex flex-col">
            <h2 className="mb-8 font-serif text-2xl font-medium md:text-4xl md:font-normal">
              API Integration: Weather & Location
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
              whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
              transition={{ duration: 1, ease: "easeOut" }} // Animation settings
              viewport={{ once: true, amount: 0.02 }} // Trigger animation when 2% in view, only once
              className="flex flex-col gap-8 md:flex-row md:justify-between md:gap-16"
            >
              <div className="flex flex-col gap-8 md:w-1/2">
                <div className="bg-primary/10 flex h-auto items-center justify-center overflow-hidden rounded-xl p-4 md:h-50 md:p-8">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster="/videos/plan-it/plan-it-api-placeholder.png"
                    className="w-full rounded-xl shadow-xl"
                  >
                    <source
                      src="/videos/plan-it/plan-it-api.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>
                <div className="overflow-hidden rounded-xl shadow-2xl shadow-black/30">
                  <Image
                    src={Snippet03}
                    alt="snippet03"
                    placeholder="blur"
                    unoptimized
                  />
                </div>
              </div>
              <div className="top-24 order-first space-y-3 self-start text-base md:sticky md:order-0 md:w-1/2 md:text-lg">
                <p>
                  The application integrates the{" "}
                  <a
                    href="https://open-meteo.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/70 group"
                  >
                    Open-Meteo{" "}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.bigdatacloud.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/70 group"
                  >
                    BigDataCloud{" "}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </a>{" "}
                  APIs, with fetched data stored in useState for dynamic UI
                  updates.
                </p>
                <p>
                  By using <span className="text-primary">useEffect</span>, the
                  application updates weather and location information only when
                  the location changes, avoiding unnecessary API requests.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>
        <SectionDivider />
        <motion.section
          initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly down
          whileInView={{ opacity: 1, y: 0 }} // Animate to: visible and in place
          transition={{ duration: 1, ease: "easeOut" }} // Animation settings
          viewport={{ once: true, amount: 0.02 }} // Trigger animation when 2% in view, only once
        >
          <h2 className="mb-7 font-serif text-2xl font-medium md:text-4xl md:font-normal">
            Third-Party Libraries Used
          </h2>
          <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-18">
            <div className="flex flex-col items-center md:w-1/3">
              <p className="mb-3 text-lg md:mb-5 md:text-xl">
                PDF Export via{" "}
                <a
                  href="https://www.npmjs.com/package/jspdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/70 group"
                >
                  jsPDF
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              </p>
              <div className="bg-primary/10 flex h-53 w-full items-center justify-center overflow-hidden rounded-xl p-3 md:h-90 md:p-8">
                <Image
                  src={Pdf}
                  alt="PDF export via jsPDF"
                  className="h-auto w-auto rounded-xl shadow-xl"
                  placeholder="blur"
                />
              </div>
            </div>
            <div className="flex flex-col items-center md:w-1/3">
              <p className="mb-3 text-lg md:mb-5 md:text-xl">
                Date Picker from{" "}
                <a
                  href="https://www.npmjs.com/package/react-date-range"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/70 group"
                >
                  react-date-range
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              </p>
              <div className="bg-primary/10 flex h-90 w-full items-center justify-center overflow-hidden rounded-xl p-3 md:p-8">
                <Image
                  src={DatePicker}
                  alt="date picker"
                  className="h-auto w-auto rounded-xl shadow-xl"
                  placeholder="blur"
                />
              </div>
            </div>
            <div className="flex flex-col items-center md:w-1/3">
              <p className="mb-3 text-lg md:mb-5 md:text-xl">
                Customized{" "}
                <a
                  href="https://react-bootstrap.netlify.app/docs/components/dropdowns"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/70 group"
                >
                  React Bootstrap
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>{" "}
                </a>
                Dropdown
              </p>
              <div className="bg-primary/10 flex h-80 w-full items-center justify-center overflow-hidden rounded-xl p-3 md:h-90 md:p-8">
                <Image
                  src={Dropdown}
                  alt="customized bootstrap dropdown"
                  className="h-auto w-auto rounded-xl shadow-xl"
                  placeholder="blur"
                />
              </div>
            </div>
          </div>
        </motion.section>
      </section>
    </main>
  );
}
