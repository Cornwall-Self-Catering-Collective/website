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
    return h("li", null,
      h(
        "a",
        {
          href: "#",
          onClick: function (event) {
            event.preventDefault();
          },
          "data-current": isCurrent ? "true" : "false",
        },
        label
      )
    );
  }

  function shell(currentPage, content) {
    return h("div", { className: "preview-root" }, [
      h("header", { className: "preview-site-header", key: "header" },
        h("div", { className: "preview-shell" },
          h("div", { className: "preview-site-header__inner" }, [
            h("a", {
              className: "preview-site-logo",
              href: "#",
              onClick: function (event) {
                event.preventDefault();
              },
              key: "brand",
            },
            h("img", {
              src: "/assets/images/cornwall-self-catering-collective-logo.png",
              alt: "Cornwall Self-Catering Collective",
            })
            ),
            h("nav", { className: "preview-site-nav", key: "nav" },
              h("ul", null, [
                navItem("Home", currentPage === "home"),
                navItem("About us", currentPage === "about"),
                navItem("Articles", currentPage === "articles"),
                navItem("Contact us", currentPage === "contact"),
              ])
            ),
          ])
        )
      ),
      h("main", { className: "preview-main", key: "main" }, content),
      h("footer", { className: "preview-site-footer", key: "footer" }, [
        h("div", { className: "preview-shell" },
          h("div", { className: "preview-site-footer__inner" }, [
            h("p", { className: "preview-site-footer__brand", key: "footer-brand" }, "Cornwall Self-Catering Collective"),
            h("nav", { className: "preview-site-footer__social", key: "footer-social" }, [
              h("a", {
                href: "#",
                onClick: function (event) {
                  event.preventDefault();
                },
                "aria-label": "Instagram",
              }, h("img", { src: "/assets/icons/instagram-icon.svg", alt: "" })),
              h("a", {
                href: "#",
                onClick: function (event) {
                  event.preventDefault();
                },
                "aria-label": "LinkedIn",
              }, h("img", { src: "/assets/icons/linkedin-icon.svg", alt: "" })),
            ]),
          ])
        ),
        h("div", { className: "preview-site-footer__bar", key: "footer-bar" }),
      ]),
    ]);
  }

  function HomepagePreview(props) {
    var data = entryData(props.entry);

    return shell("home", [
      h("section", { className: "preview-home-hero", key: "hero" }, [
        h("img", {
          className: "preview-home-hero__image",
          src: "/assets/images/cornwall-coast-hero.png",
          alt: "",
          key: "hero-image",
        }),
        h("div", { className: "preview-home-hero__overlay", key: "hero-overlay" }),
        h("div", { className: "preview-shell preview-home-hero__inner", key: "hero-inner" }, [
          h("p", { className: "preview-eyebrow preview-eyebrow--light", key: "hero-eyebrow" }, textOr(data.heroEyebrow, "Hero eyebrow")),
          h("h1", { className: "preview-heading preview-heading--hero-light", key: "hero-heading" }, textOr(data.heroHeading, "Hero heading")),
        ]),
      ]),
      h("section", { className: "preview-home-mission", key: "mission" },
        h("div", { className: "preview-shell preview-home-mission__grid" }, [
          h("div", { className: "preview-home-mission__copy", key: "mission-copy" }, [
            h("p", { className: "preview-eyebrow", key: "mission-eyebrow" }, textOr(data.missionEyebrow, "Mission eyebrow")),
            h("h2", { className: "preview-heading preview-heading--h2", key: "mission-heading" }, textOr(data.missionHeading, "Mission heading")),
            h("p", { className: "preview-paragraph", key: "mission-p1" }, textOr(data.missionParagraphOne, "Mission paragraph one")),
            h("p", { className: "preview-paragraph", key: "mission-p2" }, textOr(data.missionParagraphTwo, "Mission paragraph two")),
          ]),
          h("a", {
            className: "preview-newsletter-card",
            href: "#",
            onClick: function (event) {
              event.preventDefault();
            },
            key: "newsletter",
          },
          h("span", { className: "preview-newsletter-card__inner" }, [
            h("span", { className: "preview-newsletter-card__face preview-newsletter-card__face--front" }, [
              h("span", { className: "preview-newsletter-card__kicker" }, "Stay connected"),
              h("span", { className: "preview-newsletter-card__title" }, "Newsletter"),
              h("span", { className: "preview-newsletter-card__prompt" }, "Click to Join!"),
            ]),
            h("span", { className: "preview-newsletter-card__face preview-newsletter-card__face--back" }, [
              h("img", {
                className: "preview-newsletter-card__logo",
                src: "/assets/images/cornwall-self-catering-collective-logo.png",
                alt: "",
              }),
              h("span", { className: "preview-newsletter-card__back-title" }, "Click here to sign up ->"),
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
      h("section", { className: "preview-about-hero", key: "about-hero" },
        h("div", { className: "preview-shell preview-about-hero__inner" }, [
          h("p", { className: "preview-eyebrow", key: "about-eyebrow" }, textOr(data.heroEyebrow, "Hero eyebrow")),
          h("h1", { className: "preview-heading preview-heading--hero-dark", key: "about-heading" }, textOr(data.heroHeading, "Hero heading")),
        ])
      ),
      h("section", { className: "preview-about-body", key: "about-content" },
        h("div", { className: "preview-shell preview-about-body__grid" }, [
          h("div", { className: "preview-about-body__copy", key: "about-copy" }, [
            h("p", { key: "about-p1" }, textOr(data.introParagraphOne, "Intro paragraph one")),
            h("p", { key: "about-p2" }, textOr(data.introParagraphTwo, "Intro paragraph two")),
          ]),
          h("aside", { className: "preview-about-body__aside", key: "about-aside" }, [
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
      h("section", { className: "preview-article-hero", key: "article-header" },
        h("div", { className: "preview-article-hero__inner" }, [
          h("a", {
            href: "#",
            className: "preview-article-backlink",
            onClick: function (event) {
              event.preventDefault();
            },
            key: "all-articles",
          },
          "<- All articles"
          ),
          h("p", { className: "preview-eyebrow", key: "article-category" }, textOr(data.category, "Category")),
          h("h1", { className: "preview-heading preview-heading--hero-dark", key: "article-title" }, textOr(data.title, "Article title")),
          h("p", { className: "preview-article-excerpt", key: "article-excerpt" }, textOr(data.excerpt, "Article summary")),
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
