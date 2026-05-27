import { professor } from "@/data/portfolio";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { IconMail, IconArrowRight } from "@/components/Icons";

export default function ContactPage() {
  const { name, profiles } = professor;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <div className="page-wrap">
          {/* Hero Section */}
          <section style={{ paddingBlock: "40px 10px" }}>
            <p className="hero__tag">Get in Touch</p>
            <h1 className="hero__heading">Contact Details</h1>
            <div className="hero__divider" />
          </section>

          <section style={{ paddingBottom: "100px" }}>
            <div className="contact-grid" style={{ 
              display: "grid", 
              gridTemplateColumns: "1fr 1fr", 
              gap: "40px",
              alignItems: "start"
            }}>
              {/* Contact Information (Left) */}
              <div className="contact-info-column" style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
                <div>
                  <h2 className="navbar__brand-name" style={{ fontSize: "1.6rem", marginBottom: "20px" }}>Contact Information</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div className="contact-item-wrap" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ padding: "10px", background: "var(--stats-bg)", borderRadius: "4px", color: "var(--navy)" }}>
                        <IconMail size={18} />
                      </div>
                      <div>
                        <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", marginBottom: "2px", letterSpacing: "0.05em" }}>Email Me</p>
                        <a href="mailto:alokalokmm@gmail.com" style={{ fontSize: "1.05rem", color: "var(--navy)", textDecoration: "none", fontWeight: 600 }}>
                          alokalokmm@gmail.com
                        </a>
                        
                      <div>
                        
                        <a href="mailto:alok.31011@lpu.co.in" style={{ fontSize: "1.05rem", color: "var(--navy)", textDecoration: "none", fontWeight: 600 }}>
                          alok.31011@lpu.co.in
                        </a>
                      </div>
                      </div>
                      
                    </div>

                    <div className="contact-item-wrap" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ padding: "10px", background: "var(--stats-bg)", borderRadius: "4px", color: "var(--navy)" }}>
                        <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>☏</span>
                      </div>
                      <div>
                        <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", marginBottom: "2px", letterSpacing: "0.05em" }}>Phone</p>
                        <a href="tel:+918299173187" style={{ fontSize: "1.05rem", color: "var(--navy)", textDecoration: "none", fontWeight: 600 }}>
                          +91 82991 73187
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="navbar__brand-name" style={{ fontSize: "1.5rem", marginBottom: "16px" }}>Office Address</h2>
                  <p style={{ 
                    fontSize: "1rem", 
                    color: "var(--text-body)", 
                    lineHeight: 1.6, 
                    whiteSpace: "nowrap" 
                  }}>
                    School of Computer Science & Engineering <br />
                    Lovely Professional University <br />
                    Jalandhar-Delhi G.T. Road, Phagwara <br />
                    Punjab, India - 144411
                  </p>
                </div>

                <div>
                  <h2 className="navbar__brand-name" style={{ fontSize: "1.5rem", marginBottom: "16px" }}>Research Profiles</h2>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    <a href={profiles.googleScholar} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      Scholar
                    </a>
                    <a href={profiles.scopus} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      Scopus
                    </a>
                    <a href={profiles.orcid} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      ORCID
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form (Right) */}
              <div className="contact-form-card" style={{ 
                background: "var(--surface)", 
                padding: "32px", 
                borderRadius: "4px",
                border: "1px solid var(--border)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
                width: "100%"
              }}>
                <h2 className="navbar__brand-name" style={{ fontSize: "1.4rem", marginBottom: "40px" }}>Send a Message</h2>
                <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label htmlFor="name" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--navy)" }}>Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      placeholder="Enter your name" 
                      style={{ 
                        padding: "10px 14px", 
                        borderRadius: "4px", 
                        border: "1.5px solid var(--border)",
                        background: "var(--surface)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.95rem"
                      }} 
                    />
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label htmlFor="email" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--navy)" }}>Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="your.email@example.com" 
                      style={{ 
                        padding: "10px 14px", 
                        borderRadius: "4px", 
                        border: "1.5px solid var(--border)",
                        background: "var(--surface)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.95rem"
                      }} 
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label htmlFor="message" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--navy)" }}>Your Message</label>
                    <textarea 
                      id="message" 
                      rows={3} 
                      placeholder="How can I help you?" 
                      style={{ 
                        padding: "10px 14px", 
                        borderRadius: "4px", 
                        border: "1.5px solid var(--border)",
                        background: "var(--surface)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.95rem",
                        resize: "none"
                      }} 
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
