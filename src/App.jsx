
import React, { useEffect, useState } from "react";

export default function App() {
  const [links, setLinks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("adscroll-links") || "[]");
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("adscroll-links", JSON.stringify(links));
  }, [links]);

  function addLinks() {
    const newLinks = input
      .split(/\s+/)
      .map(x => x.trim())
      .filter(Boolean);

    const valid = newLinks.filter(link => {
      try {
        const u = new URL(link);
        const facebookAd =
          ["facebook.com", "www.facebook.com"].includes(u.hostname) &&
          u.pathname === "/ads/library/" &&
          /^\d+$/.test(u.searchParams.get("id") || "");

        const directVideo =
          ["http:", "https:"].includes(u.protocol) &&
          /\.(mp4|webm)(\?.*)?$/i.test(link);

        return facebookAd || directVideo;
      } catch {
        return false;
      }
    });

    setLinks(old => [...new Set([...old, ...valid])]);
    setInput("");

    if (!valid.length) {
      alert("ما لقينا حتى رابط صالح. تحقق من الروابط.");
    } else {
      alert(`تمت إضافة ${valid.length} روابط`);
    }
  }

  function removeLink(index) {
    setLinks(old => old.filter((_, i) => i !== index));
  }

  return (
    <main className="app">
      <header className="top">
        <h1>AdScroll</h1>
        <p>Discover ads. Swipe. Repeat.</p>
      </header>

      <section className="add">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={"ألصق روابط الإعلانات هنا...\nكل رابط في سطر"}
          rows="3"
        />
        <button onClick={addLinks}>+ Add Ads</button>
        <p>{links.length} advertisements saved</p>
      </section>

      <section className="feed">
        {links.length === 0 ? (
          <div className="empty">
            <h2>Welcome to AdScroll 🚀</h2>
            <p>أضف روابط الإعلانات وابدأ التصفح</p>
          </div>
        ) : (
          links.map((link, index) => {
            const isVideo = /\.(mp4|webm)(\?.*)?$/i.test(link);

            return (
              <article className="ad" key={link}>
                <div className="ad-content">
                  <span className="number">
                    AD {index + 1} / {links.length}
                  </span>

                  {isVideo ? (
                    <video
                      src={link}
                      controls
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <div className="facebook-placeholder">
                      <div className="play">▶</div>
                      <h2>Facebook Advertisement</h2>
                      <p>
                        افتح الإعلان الأصلي لمشاهدة الفيديو
                      </p>
                    </div>
                  )}

                  <a
                    className="open"
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Original Ad ↗
                  </a>

                  <button
                    className="delete"
                    onClick={() => removeLink(index)}
                  >
                    Delete Ad
                  </button>
                </div>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}
