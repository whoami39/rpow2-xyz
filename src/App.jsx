import React from "react";
import { useI18n } from "./i18n.jsx";
import LangSwitcher from "./components/LangSwitcher.jsx";

// Renders copy that contains HTML (links/strong); the copy comes from the
// repo-maintained i18n dictionary and is trusted.
function Html({ k, as = "p", className }) {
  const { t } = useI18n();
  const Tag = as;
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: t(k) }} />;
}

export default function App() {
  const { t } = useI18n();

  return (
    <div className="app-shell">
      {/* ===== Header ===== */}
      <header className="app-header">
        <div className="titlebox">
          <span className="titlebox-name">RPOW2.XYZ</span>
          <span className="titlebox-dot" aria-hidden="true">●</span>
        </div>
        <div className="subhead">
          <p className="tagline">{t("tagline")}</p>
          <LangSwitcher />
        </div>
      </header>

      <main>
        {/* ===== About ===== */}
        <section className="panel">
          <div className="panel-title">
            <span>{t("about.title")}</span>
          </div>
          <div className="panel-body">
            <Html k="about.lead" className="about-lead" />
            <p className="about-lead">{t("about.lead2")}</p>
          </div>
        </section>

        {/* ===== Tools / ecosystem ===== */}
        <section id="tools" className="panel">
          <div className="panel-title">
            <span>{t("tools.title")}</span>
          </div>
          <div className="panel-body">
            <div className="tool-grid">
              {/* Mining pool: live */}
              <a className="tool-card live" href="https://pool.rpow2.xyz" target="_blank" rel="noopener">
                <div className="tool-head">
                  <span className="tool-name">{t("tool.pool.name")}</span>
                  <span className="badge ok">{t("badge.live")}</span>
                </div>
                <div className="tool-host">pool.rpow2.xyz</div>
                <p className="tool-desc">{t("tool.pool.desc")}</p>
                <ul className="tool-feats">
                  <li>{t("tool.pool.f1")}</li>
                  <li>{t("tool.pool.f2")}</li>
                  <li>{t("tool.pool.f3")}</li>
                </ul>
                <span className="tool-cta">{t("tool.pool.cta")}</span>
              </a>

              {/* Placeholder: coming soon */}
              <div className="tool-card soon">
                <div className="tool-head">
                  <span className="tool-name">{t("tool.next.name")}</span>
                  <span className="badge soon">{t("badge.soon")}</span>
                </div>
                <div className="tool-host">— — —</div>
                <p className="tool-desc">{t("tool.next.desc")}</p>
                <span className="tool-cta dim">{t("tool.next.cta")}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="app-footer">
        <div className="foot-links">
          <a href="https://rpow2.com" target="_blank" rel="noopener">rpow2.com</a>
          <span className="sep">·</span>
          <a href="https://pool.rpow2.xyz" target="_blank" rel="noopener">mining pool</a>
          <span className="sep">·</span>
          <a href="https://nakamotoinstitute.org/rpow/" target="_blank" rel="noopener">original RPOW</a>
        </div>
      </footer>
    </div>
  );
}
