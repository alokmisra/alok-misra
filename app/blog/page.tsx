import { getSortedBlogsData } from "@/lib/blog";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import BlogClient from "../../components/BlogClient";

export default function BlogPage() {
  const allPosts = getSortedBlogsData();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <div className="page-wrap">
          {/* Hero Section */}
          <section style={{ paddingBlock: "40px 10px" }}>
            <p className="hero__tag">Insights & Research</p>
            <h1 className="hero__heading" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              Academic Blog
            </h1>
            <div className="hero__divider" style={{ margin: "20px 0" }} />
          </section>

          {/* Pass data to Client Component for filtering */}
          <BlogClient allPosts={allPosts} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
