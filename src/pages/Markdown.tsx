import React, { useEffect } from "react";
import MarkdownEditor from "@/components/MarkdownEditor";

const MarkdownPage = () => {
  useEffect(() => {
    const title = "Markdown Editor & HTML to Markdown Converter";
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const canonicalHref = `${window.location.origin}/markdown`;
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalHref);

    setMeta(
      "description",
      "Free Markdown editor with HTML to Markdown converter. Paste HTML or text and get clean Markdown with live preview."
    );

    // Structured data (SoftwareApplication)
    const ldJsonId = "ld-json-markdown-editor";
    let ld = document.getElementById(ldJsonId);
    if (ld) ld.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = ldJsonId;
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Markdown Editor",
      applicationCategory: "Productivity",
      description:
        "Free Markdown editor with HTML to Markdown converter and live preview.",
      url: canonicalHref,
      operatingSystem: "Web",
    });
    document.head.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold tracking-tight">Markdown Editor and HTML to Markdown Converter</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Paste HTML or plain text, convert it to clean Markdown, and preview the
          result instantly.
        </p>
      </section>
      <section className="container mx-auto px-4 pb-12">
        <MarkdownEditor />
      </section>
    </div>
  );
};

export default MarkdownPage;
