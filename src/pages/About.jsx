import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AboutHero from "../components/about/AboutHero";
import AboutStory from "../components/about/AboutStory";
import AboutInterests from "../components/about/AboutInterests";
import AboutJourney from "../components/about/AboutJourney";
import AboutPortfolioCTA from "../components/about/AboutPortfolioCTA";

export default function About() {
  return (
    <>
      <Header />

      <main>
        <AboutHero />
        <AboutStory />
        <AboutInterests />
        <AboutJourney />
        <AboutPortfolioCTA />
      </main>

      <Footer />
    </>
  );
}