import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { ProofStrip } from "@/components/sections/proof-strip";
import { TranscriptExample } from "@/components/sections/transcript-example";
import { Audience } from "@/components/sections/audience";
import { Comparison } from "@/components/sections/comparison";
import { Platform } from "@/components/sections/platform";
import { Product } from "@/components/sections/product";
import { CsedCalculator } from "@/components/sections/csed-calculator";
import { Steps } from "@/components/sections/steps";
import { Walkthrough } from "@/components/sections/walkthrough";
import { Feedback } from "@/components/sections/feedback";
import { Guidance } from "@/components/sections/guidance";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

// Sections render in the order of the offer page content handoff (01–14).
export default function Home() {
  return (
    <div id="top">
      <Header />

      <main>
        <Hero />
        <ProofStrip />
        <TranscriptExample />
        <Audience />
        <Comparison />
        <Platform />
        <Product />
        <CsedCalculator />
        <Steps />
        <Walkthrough />
        <Feedback />
        <Guidance />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
