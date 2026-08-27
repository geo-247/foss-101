"use client";

import { SectionLabel } from "./primitives";
import { initiatives } from "@/lib/initiatives";
import { PastEvent } from "./past-event";

export function Initiatives() {
  return (
    <section
      id="initiatives"
      className="relative border-t-2 border-ink/15 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-10">
        <SectionLabel index="06" color="text-coral">
          Our event archive
        </SectionLabel>

        <h2 className="mt-6 max-w-3xl display-tight text-[clamp(2.2rem,7vw,4.6rem)]">
          Recent events, real people,
          <br />
          <span className="text-ink-soft">and what they made possible.</span>
        </h2>

        <div className="mt-6 divide-y-2 divide-ink/12">
          {initiatives.map((event, index) => (
            <PastEvent key={event.id} event={event} reverse={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
