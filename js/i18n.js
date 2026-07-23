/**
 * Web Dev Notes - i18n Language Switcher Engine
 * Features: Instant translation, persistent storage, RTL support for Arabic, UI buttons auto-injection, automatic note label & HTML/CSS/JS topic translation.
 */

(function () {
  const STORAGE_KEY = "webdev_notes_lang";
  const DEFAULT_LANG = "en";

  const LANGUAGES = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "roman_urdu", name: "Roman Urdu", flag: "🇵🇰" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "ar", name: "العربية", flag: "🇸🇦" }
  ];

  // Get saved language or fallback
  function getLanguage() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  // Set language and update page
  function setLanguage(langCode) {
    if (!window.APP_TRANSLATIONS[langCode]) return;
    localStorage.setItem(STORAGE_KEY, langCode);
    applyLanguage(langCode);
  }

  // Auto-translate common note labels (Definition, Syntax, Example, Output, Extra Info)
  function translateNoteLabels(translations) {
    document.querySelectorAll("strong").forEach((el) => {
      const text = el.textContent.trim();

      if (text.startsWith("Definition") || text.startsWith("Wazahat") || text.startsWith("परिभाषा") || text.startsWith("التعريف")) {
        el.textContent = translations.lbl_definition || "Definition:";
      } else if (text.startsWith("Syntax") || text.startsWith("Tareeqa") || text.startsWith("सिंटैक्स") || text.startsWith("الصيغة")) {
        el.textContent = translations.lbl_syntax || "Syntax:";
      } else if (text.startsWith("Example") || text.startsWith("Misaal") || text.startsWith("उदाहरण") || text.startsWith("مثال")) {
        el.textContent = translations.lbl_example || "Example:";
      } else if (text.startsWith("Output") || text.startsWith("Nateeja") || text.startsWith("परिणाम") || text.startsWith("النتيجة")) {
        el.textContent = translations.lbl_output || "Output:";
      } else if (text.includes("extra information") || text.includes("jaankari") || text.includes("अधिक जानकारी") || text.includes("معلومات إضافية")) {
        el.textContent = translations.lbl_extra_info || "Link of extra information for this topic:";
      }
    });
  }

  // Auto-translate HTML Topics
  function translateHtmlTopics(langCode) {
    if (!window.HTML_NOTES_TRANSLATIONS || !window.HTML_NOTES_TRANSLATIONS[langCode]) return;
    const topicData = window.HTML_NOTES_TRANSLATIONS[langCode];

    const sections = document.querySelectorAll("section");
    sections.forEach((sec) => {
      const h1 = sec.querySelector("h1");
      if (!h1) return;
      const h1Text = h1.textContent.trim();
      const match = h1Text.match(/^(\d+)\./);
      if (match) {
        const num = match[1];
        const titleKey = "t" + num + "_title";
        const defKey = "t" + num + "_def";

        if (topicData[titleKey]) {
          h1.textContent = topicData[titleKey];
        }

        const pList = sec.querySelectorAll("p");
        pList.forEach((p) => {
          const strong = p.querySelector("strong");
          if (strong) {
            const strongText = strong.textContent.trim();
            if (strongText.startsWith("Definition") || strongText.startsWith("Wazahat") || strongText.startsWith("परिभाषा") || strongText.startsWith("التعريف")) {
              if (topicData[defKey]) {
                const labelStr = window.APP_TRANSLATIONS[langCode].lbl_definition || "Definition:";
                p.innerHTML = `<strong>${labelStr}</strong> ${topicData[defKey]}`;
              }
            }
          }
        });
      }
    });
  }

  // Auto-translate CSS Topics
  function translateCssTopics(langCode) {
    if (!window.CSS_NOTES_TRANSLATIONS || !window.CSS_NOTES_TRANSLATIONS[langCode]) return;
    const topicData = window.CSS_NOTES_TRANSLATIONS[langCode];

    const sections = document.querySelectorAll("section");
    sections.forEach((sec) => {
      const h1 = sec.querySelector("h1");
      if (!h1) return;
      const h1Text = h1.textContent.trim();
      const match = h1Text.match(/^(\d+)\./);
      if (match) {
        const num = match[1];
        const titleKey = "t" + num + "_title";
        const defKey = "t" + num + "_def";

        if (topicData[titleKey]) {
          h1.textContent = topicData[titleKey];
        }

        const pList = sec.querySelectorAll("p");
        pList.forEach((p) => {
          const strong = p.querySelector("strong");
          if (strong) {
            const strongText = strong.textContent.trim();
            if (strongText.startsWith("Definition") || strongText.startsWith("Wazahat") || strongText.startsWith("परिभाषा") || strongText.startsWith("التعريف")) {
              if (topicData[defKey]) {
                const labelStr = window.APP_TRANSLATIONS[langCode].lbl_definition || "Definition:";
                p.innerHTML = `<strong>${labelStr}</strong> ${topicData[defKey]}`;
              }
            }
          }
        });
      }
    });
  }

  // Auto-translate JS Topics
  function translateJsTopics(langCode) {
    if (!window.JS_NOTES_TRANSLATIONS || !window.JS_NOTES_TRANSLATIONS[langCode]) return;
    const topicData = window.JS_NOTES_TRANSLATIONS[langCode];

    const sections = document.querySelectorAll("section");
    sections.forEach((sec) => {
      const h1 = sec.querySelector("h1");
      if (!h1) return;
      const h1Text = h1.textContent.trim();
      const match = h1Text.match(/^(\d+)\./);
      if (match) {
        const num = match[1];
        const titleKey = "t" + num + "_title";
        const defKey = "t" + num + "_def";

        if (topicData[titleKey]) {
          h1.textContent = topicData[titleKey];
        }

        const pList = sec.querySelectorAll("p");
        pList.forEach((p) => {
          const strong = p.querySelector("strong");
          if (strong) {
            const strongText = strong.textContent.trim();
            if (strongText.startsWith("Definition") || strongText.startsWith("Wazahat") || strongText.startsWith("परिभाषा") || strongText.startsWith("التعريف")) {
              if (topicData[defKey]) {
                const labelStr = window.APP_TRANSLATIONS[langCode].lbl_definition || "Definition:";
                p.innerHTML = `<strong>${labelStr}</strong> ${topicData[defKey]}`;
              }
            }
          }
        });
      }
    });
  }

  // Apply language to DOM
  function applyLanguage(langCode) {
    const translations = window.APP_TRANSLATIONS[langCode] || window.APP_TRANSLATIONS[DEFAULT_LANG];
    
    // Set HTML lang & dir
    document.documentElement.lang = langCode;
    if (langCode === "ar") {
      document.documentElement.dir = "rtl";
      document.body.classList.add("rtl-mode");
    } else {
      document.documentElement.dir = "ltr";
      document.body.classList.remove("rtl-mode");
    }

    // Update all elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[key] !== undefined) {
        if (translations[key].includes("<")) {
          el.innerHTML = translations[key];
        } else {
          el.textContent = translations[key];
        }
      }
    });

    // Translate all repetitive note labels dynamically
    translateNoteLabels(translations);

    // Translate full HTML, CSS & JS topic content
    translateHtmlTopics(langCode);
    translateCssTopics(langCode);
    translateJsTopics(langCode);

    // Update active button state in navbar
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      if (btn.getAttribute("data-lang") === langCode) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  // Inject CSS styles for Language Switcher
  function injectStyles() {
    if (document.getElementById("i18n-styles")) return;
    const style = document.createElement("style");
    style.id = "i18n-styles";
    style.textContent = `
      .lang-switcher {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 0.25rem 0.35rem;
        border-radius: 999px;
        backdrop-filter: blur(10px);
      }
      .lang-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        background: transparent;
        border: none;
        color: #8892a4;
        font-family: inherit;
        font-size: 0.78rem;
        font-weight: 600;
        padding: 0.35rem 0.65rem;
        border-radius: 999px;
        cursor: pointer;
        transition: all 0.25s ease;
      }
      .lang-btn:hover {
        color: #f0f4ff;
        background: rgba(255, 255, 255, 0.08);
      }
      .lang-btn.active {
        color: #ffffff;
        background: linear-gradient(135deg, #2e9fff, #7ec8ff);
        box-shadow: 0 2px 10px rgba(46, 159, 255, 0.35);
      }
      .lang-flag {
        font-size: 0.9rem;
        line-height: 1;
      }
      body.rtl-mode {
        direction: rtl;
        text-align: right;
      }
      body.rtl-mode .card-cta i,
      body.rtl-mode .topics-link-box i {
        transform: rotate(180deg);
      }
      body.rtl-mode .card-tag {
        right: auto;
        left: 1.5rem;
      }
      @media (max-width: 600px) {
        .lang-btn span.lang-name {
          display: none;
        }
        .lang-btn {
          padding: 0.35rem 0.45rem;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Create Language Switcher UI HTML
  function renderSwitcher(container) {
    if (!container) return;
    injectStyles();

    const switcher = document.createElement("div");
    switcher.className = "lang-switcher";

    const currentLang = getLanguage();

    LANGUAGES.forEach((lang) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `lang-btn ${lang.code === currentLang ? "active" : ""}`;
      btn.setAttribute("data-lang", lang.code);
      btn.innerHTML = `<span class="lang-flag">${lang.flag}</span><span class="lang-name">${lang.name}</span>`;
      btn.onclick = () => setLanguage(lang.code);
      switcher.appendChild(btn);
    });

    container.appendChild(switcher);
  }

  // Init on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    const target = document.querySelector(".nav-lang-container") || document.querySelector("nav");
    if (target) {
      renderSwitcher(target);
    }
    applyLanguage(getLanguage());
  });

  // Expose global methods
  window.WebDevI18n = {
    getLanguage,
    setLanguage,
    applyLanguage,
    renderSwitcher
  };
})();
