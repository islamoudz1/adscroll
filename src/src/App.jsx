
import React, { useState } from "react";

export default function App() {
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState("");

  function addLink() {
    const link = url.trim();
    if (!link) return;

    if (!/^https:\/\/(www\.)?facebook\.com\/ads\/library\/\?id=\d+/.test(link)) {
      alert("دخل رابط صحيح من Facebook Ads Library");
      return;
    }

    setLinks([...links, link]);
    setUrl("");
  }

  return (
    <main className="app">
      <header>
        <h1>AdScroll</h1>
        <p>Your Facebook Ads Library Feed</p>
      </header>

      <section className="add">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste Facebook ad link..."
        />
        <button onClick={addLink}>+ Add Ad</button>
      </section>

      <section className="feed">
        {links.length === 0 ? (
          <h2>Add your first Facebook ad 🚀</h2>
        ) : (
          links.map((link, index) => (
            <article className="ad" key={index}>
              <h3>Advertisement {index + 1}</h3>
              <a href={link} target="_blank" rel="noreferrer">
                Open original ad ↗
              </a>
              <iframe
                title={`Ad ${index + 1}`}
                src={link}
                loading="lazy"
              />
            </article>
          ))
        )}
      </section>
    </main>
  );
}
