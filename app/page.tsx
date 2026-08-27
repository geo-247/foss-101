import { JourneyProgress } from "@/components/foss/journey-progress";
import { Hero } from "@/components/foss/hero";
import { WhatIsFoss } from "@/components/foss/what-is-foss";
import { Freedoms } from "@/components/foss/freedoms";
import { FreeClarification } from "@/components/foss/free-clarification";
import { WhyItMatters } from "@/components/foss/why-it-matters";
import { InteractiveSummary } from "@/components/foss/interactive-summary";
import { ZoomToGect } from "@/components/foss/zoom-to-gect";
import { Initiatives } from "@/components/foss/initiatives";
import { Community } from "@/components/foss/community";
import { FinalCta } from "@/components/foss/final-cta";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <JourneyProgress />
      <main className="relative">
        <Hero />
        <WhatIsFoss />
        <Freedoms />
        <FreeClarification />
        <WhyItMatters />
        <InteractiveSummary />
        <ZoomToGect />
        <Initiatives />
        <Community />
        <FinalCta />
      </main>
      <footer className="border-t-2 border-ink/15 px-5 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/60">
            <div className="flex items-center gap-3">
              <Image
                src="/foss-logo.png"
                alt="FOSS GECT"
                width={36}
                height={36}
                className="size-9 object-contain"
              />
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/60">
                FOSS Cell &middot; Government Engineering College Thrissur
              </p>
            </div>
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/60">
            Built in the open
          </p>
        </div>
      </footer>
    </>
  );
}
