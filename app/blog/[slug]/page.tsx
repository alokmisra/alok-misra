import { getSortedBlogsData } from "../../../lib/blog";
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import { professor } from "../../../data/portfolio";
import { IconMail } from "../../../components/Icons";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const allPosts = getSortedBlogsData();
  const post = allPosts.find((p: any) => p.id === slug || p.slug === slug);

  if (!post) {
    notFound();
  }

  const { name, about, profiles, profileImage, description } = professor;
  const email = "alok.misra@lpu.co.in";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, paddingBlock: "60px" }}>
        <div className="page-wrap blog-post-detail" style={{ maxWidth: "1000px" }}>
          {/* Back Button */}
          <Link href="/blog" className="blog-back-btn" style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "8px", 
            color: "var(--gold)", 
            textDecoration: "none", 
            fontWeight: 600,
            marginBottom: "24px",
            fontSize: "0.9rem"
          }}>
            ← Back to all posts
          </Link>

          {/* Article Header */}
          <header style={{ marginBottom: "50px" }}>
            <h1 style={{ 
              fontFamily: "var(--font-heading)", 
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)", 
              color: "var(--navy)", 
              lineHeight: 1.1,
              marginBottom: "16px"
            }}>
              {post.title}
            </h1>
            <div className="blog-post-tags" style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
              {post.tags?.map((tag: string) => (
                <span key={tag} style={{ color: "var(--gold)", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>#{tag}</span>
              ))}
            </div>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "20px", 
              fontSize: "0.95rem", 
              color: "var(--text-muted)",
              borderTop: "1px solid var(--border)",
              paddingTop: "20px"
            }}>
              <span>{post.date}</span>
              <span style={{ opacity: 0.3 }}>•</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          {/* Article Content */}
          <article className="blog-content-body" style={{ 
            lineHeight: 1.9, 
            fontSize: "1.15rem", 
            color: "var(--text-body)",
            marginBottom: "80px"
          }}>
            {post.content.split("\n\n").map((para: string, i: number) => {
              // Handle Headers
              if (para.startsWith("## ")) {
                return <h2 key={i} style={{ color: "var(--navy)", marginTop: "50px", marginBottom: "25px", fontFamily: "var(--font-heading)", fontSize: "1.8rem" }}>{para.replace("## ", "")}</h2>;
              }
              if (para.startsWith("### ")) {
                return <h3 key={i} style={{ color: "var(--navy)", marginTop: "40px", marginBottom: "20px", fontFamily: "var(--font-heading)", fontSize: "1.4rem" }}>{para.replace("### ", "")}</h3>;
              }
              
              // Handle Lists
              if (para.startsWith("- ")) {
                 return (
                   <ul key={i} style={{ marginBottom: "30px", paddingLeft: "20px" }}>
                     {para.split("\n").map((item, j) => (
                       <li key={j} style={{ marginBottom: "12px" }}>
                         {item.replace("- ", "").split(/(\*\*.*?\*\*)/g).map((part, k) => 
                           part.startsWith("**") && part.endsWith("**") 
                             ? <strong key={k}>{part.slice(2, -2)}</strong> 
                             : part
                         )}
                       </li>
                     ))}
                   </ul>
                 );
              }

              // Handle Paragraphs with Bold support
              return (
                <p key={i} style={{ marginBottom: "32px" }}>
                  {para.split(/(\*\*.*?\*\*)/g).map((part, k) => 
                    part.startsWith("**") && part.endsWith("**") 
                      ? <strong key={k}>{part.slice(2, -2)}</strong> 
                      : part
                  )}
                </p>
              );
            })}
          </article>

          {/* Author Card (Dr. Alok Misra) */}
          <section className="blog-author-card" style={{ 
            background: "var(--navy)", 
            padding: "40px", 
            borderRadius: "4px", 
            color: "white",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            alignItems: "flex-start"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={{ 
                width: "60px", 
                height: "60px", 
                borderRadius: "50%", 
                overflow: "hidden", 
                border: "2px solid var(--gold)",
                flexShrink: 0 
              }}>
                <img src={profileImage} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontFamily: "var(--font-heading)" }}>{name}</h3>
                <p style={{ color: "var(--gold)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Professor of CS & Engineering
                </p>
              </div>
            </div>
            <div>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.6, opacity: 0.9, marginBottom: "20px" }}>
                {description}
              </p>
              <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
                <a href={`mailto:${email}`} style={{ color: "white", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem" }}>
                  Email ↗
                </a>
                <a href={profiles.googleScholar} target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem" }}>Scholar ↗</a>
                <a href={profiles.scopus} target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem" }}>Scopus ↗</a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
