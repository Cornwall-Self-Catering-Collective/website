(function () {
  function resolveFactory() {
    if (window.React && typeof window.React.createElement === "function") {
      return window.React.createElement;
    }

    if (typeof window.h === "function") {
      return window.h;
    }

    if (window.CMS && window.CMS.React && typeof window.CMS.React.createElement === "function") {
      return window.CMS.React.createElement;
    }

    throw new Error("Decap preview runtime could not find a React element factory.");
  }

  var h = resolveFactory();

  function entryData(entry) {
    var raw = entry && entry.getIn ? entry.getIn(["data"]) : null;
    return raw && raw.toJS ? raw.toJS() : {};
  }

  function toArray(value) {
    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    if (value.toJS) {
      return value.toJS();
    }

    return [value];
  }

  function textOr(value, fallback) {
    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }

    return fallback;
  }

  function navItem(label, isCurrent) {
    return h(
      "a",
      {
        href: "#",
        onClick: function (event) {
          event.preventDefault();
        },
        "data-current": isCurrent ? "true" : "false",
      },
      label
    );
  }

  function shell(currentPage, content) {
    return h("div", { className: "preview-root" }, [
      h("header", { className: "preview-header", key: "header" },
        h("div", { className: "preview-header__inner" }, [
          h("a", {
            className: "preview-brand",
            href: "#",
            onClick: function (event) {
              event.preventDefault();
            },
            key: "brand",
          }, [
            h("img", {
              src: "/assets/images/cornwall-self-catering-collective-logo.png",
              alt: "Cornwall Self-Catering Collective",
              key: "brand-image",
            }),
          ]),
          h("nav", { className: "preview-nav", key: "nav" }, [
            navItem("Home", currentPage === "home"),
            navItem("About us", currentPage === "about"),
            navItem("Articles", currentPage === "articles"),
            navItem("Contact us", currentPage === "contact"),
          ]),
        ])
      ),
      h("main", { className: "preview-main", key: "main" }, content),
      h("footer", { className: "preview-footer", key: "footer" }, [
        h("div", { className: "preview-footer__inner", key: "footer-inner" },
          "Previewing content in CMS with live-site structure and styling"
        ),
        h("div", { className: "preview-footer__bar", key: "footer-bar" }),
      ]),
    ]);
  }

  function HomepagePreview(props) {
    var data = entryData(props.entry);

    return shell("home", [
      h("section", { className: "preview-hero preview-hero--image", key: "hero" },
        h("div", { className: "preview-hero__inner" }, [
          h("p", { className: "preview-eyebrow", key: "hero-eyebrow" }, textOr(data.heroEyebrow, "Hero eyebrow")),
          h("h1", { className: "preview-heading", key: "hero-heading" }, textOr(data.heroHeading, "Hero heading")),
        ])
      ),
      h("section", { className: "preview-section", key: "mission" },
        h("div", { className: "preview-grid preview-grid--mission" }, [
          h("div", { key: "mission-copy" }, [
            h("p", { className: "preview-eyebrow", key: "mission-eyebrow" }, textOr(data.missionEyebrow, "Mission eyebrow")),
            h("h2", { className: "preview-heading", key: "mission-heading" }, textOr(data.missionHeading, "Mission heading")),
            h("div", { className: "preview-copy", key: "mission-body" }, [
              h("p", { key: "mission-p1" }, textOr(data.missionParagraphOne, "Mission paragraph one")),
              h("p", { key: "mission-p2" }, textOr(data.missionParagraphTwo, "Mission paragraph two")),
            ]),
          ]),
          h("aside", { className: "preview-newsletter", key: "newsletter" },
            h("div", { className: "preview-newsletter__inner" }, [
              h("div", { className: "preview-newsletter__face preview-card preview-card--teal", key: "newsletter-front" }, [
                h("p", { className: "preview-card__meta", key: "newsletter-meta" }, "Community focus"),
                h("h3", { className: "preview-card__title", key: "newsletter-title" }, "Keep Cornwall welcoming year-round"),
                h("p", { className: "preview-card__excerpt", key: "newsletter-copy" }, "This card mirrors the live homepage support block placement and interaction tone."),
              ]),
              h("div", { className: "preview-newsletter__back preview-card", key: "newsletter-back" }, [
                h("p", { className: "preview-card__meta", key: "newsletter-back-meta" }, "Preview note"),
                h("p", { className: "preview-card__excerpt", key: "newsletter-back-copy" }, "Hover behavior is represented here to keep editing context close to production."),
              ]),
            ])
          ),
        ])
      ),
    ]);
  }

  function AboutPreview(props) {
    var data = entryData(props.entry);
    var standFor = toArray(data.standForItems)
      .map(function (item) {
        if (typeof item === "string") {
          return item;
        }

        if (item && typeof item.item === "string") {
          return item.item;
        }

        return "";
      })
      .filter(Boolean);

    if (!standFor.length) {
      standFor = ["Stand-for item one", "Stand-for item two", "Stand-for item three"];
    }

    return shell("about", [
      h("section", { className: "preview-hero", key: "about-hero" },
        h("div", { className: "preview-hero__inner" }, [
          h("p", { className: "preview-eyebrow", key: "about-eyebrow" }, textOr(data.heroEyebrow, "Hero eyebrow")),
          h("h1", { className: "preview-heading", key: "about-heading" }, textOr(data.heroHeading, "Hero heading")),
        ])
      ),
      h("section", { className: "preview-section", key: "about-content" },
        h("div", { className: "preview-grid preview-grid--about" }, [
          h("div", { className: "preview-copy", key: "about-copy" }, [
            h("p", { key: "about-p1" }, textOr(data.introParagraphOne, "Intro paragraph one")),
            h("p", { key: "about-p2" }, textOr(data.introParagraphTwo, "Intro paragraph two")),
          ]),
          h("aside", { className: "preview-aside", key: "about-aside" }, [
            h("h2", { key: "about-aside-heading" }, textOr(data.standForHeading, "What we stand for")),
            h("ul", { key: "about-aside-list" },
              standFor.map(function (item, index) {
                return h("li", { key: "standfor-" + index }, item);
              })
            ),
          ]),
        ])
      ),
    ]);
  }

  function ArticlesPreview(props) {
    var data = entryData(props.entry);
    var markdownBody = props.widgetFor ? props.widgetFor("body") : null;

    return shell("articles", [
      h("section", { className: "preview-article-header", key: "article-header" },
        h("div", { className: "preview-article-wrap" }, [
          h("a", {
            href: "#",
            className: "preview-backlink",
            onClick: function (event) {
              event.preventDefault();
            },
            key: "all-articles",
          },
          "<- All articles"
          ),
          h("p", { className: "preview-eyebrow", key: "article-category" }, textOr(data.category, "Category")),
          h("h1", { className: "preview-heading", key: "article-title" }, textOr(data.title, "Article title")),
          h("p", { className: "preview-copy", key: "article-excerpt" },
            h("span", { className: "preview-card__excerpt" }, textOr(data.excerpt, "Article summary"))
          ),
        ])
      ),
      h("section", { className: "preview-article-body", key: "article-body" },
        h("div", { className: "preview-markdown" },
          markdownBody || h("p", null, "Start writing in the markdown field to preview article body content.")
        )
      ),
    ]);
  }

  window.CMS.registerPreviewStyle("/admin/preview.css");
  window.CMS.registerPreviewTemplate("homepage", HomepagePreview);
  window.CMS.registerPreviewTemplate("about", AboutPreview);
  window.CMS.registerPreviewTemplate("articles", ArticlesPreview);
})();
