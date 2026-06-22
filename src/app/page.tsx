import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Industries } from "@/components/Industries";
import { Framework } from "@/components/Framework";
import { WhyStar } from "@/components/WhyStar";
import { CaseStudy } from "@/components/CaseStudy";
import { Templates } from "@/components/Templates";
import { FooterCta } from "@/components/FooterCta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Industries />
        <Framework />
        <WhyStar />
        <CaseStudy />
        <Templates />
        <FooterCta />
      </main>
    </>
  );
}
