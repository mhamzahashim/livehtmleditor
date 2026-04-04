import { useEffect } from "react";
import MarkdownEditor from "@/components/MarkdownEditor";

const MarkdownPage = () => {
  useEffect(() => {
    document.title = "Markdown Editor & HTML to Markdown Converter";
    const setMeta = (name: string, content: string) => { let t = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null; if (!t) { t = document.createElement("meta"); t.setAttribute("name", name); document.head.appendChild(t); } t.setAttribute("content", content); };
    const href = `${window.location.origin}/markdown`;
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]'); if (!link) { link = document.createElement("link"); link.setAttribute("rel", "canonical"); document.head.appendChild(link); } link.setAttribute("href", href);
    setMeta("description", "Free Markdown editor with HTML to Markdown converter and live preview.");
    const id = "ld-json-markdown-editor"; let ld = document.getElementById(id); if (ld) ld.remove(); const s = document.createElement("script"); s.type = "application/ld+json"; s.id = id; s.text = JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Markdown Editor", applicationCategory: "Productivity", url: href, operatingSystem: "Web" }); document.head.appendChild(s);
  }, []);

  return (
    <div className="min-h-screen dot-grid">
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground" style={{ letterSpacing: '-0.02em' }}>Markdown Editor</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">Paste HTML or plain text, convert to Markdown, and preview instantly.</p>
      </section>
      <section className="container mx-auto px-4 pb-12">
        <MarkdownEditor />
      </section>
    </div>
  );
};

export default MarkdownPage;
