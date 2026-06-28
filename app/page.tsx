
import CoursePreview from "@/features/home/components/CoursePreview";
import Footer from "@/features/home/components/Footer";
import Hero from "@/features/home/components/Hero";
import Navbar from "@/features/home/components/Navbar";
import PageLayout from "@/shared/ui/PageLayout"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CoursePreview />
      </main>
      <Footer />
    </>
  );
}
