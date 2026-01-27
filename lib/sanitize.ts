// lib/sanitize.ts
import sanitizeHtml from "sanitize-html";

export const sanitize = (dirty: string) =>
  sanitizeHtml(dirty, {
    allowedTags: [
      "p",
      "br",
      "b",
      "strong",
      "i",
      "em",
      "u",
      "s",
      "ul",
      "ol",
      "li",
      "blockquote",
      "code",
      "pre",
      "a",
      "img",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "span",
      "div",
      "hr",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
    ],
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      "*": ["style"], // si necesitas estilos inline (ver CSS seguro abajo)
    },
    // Evita javascript:, data:, etc. Permite solo http(s), mailto y tel
    allowedSchemes: ["http", "https", "mailto", "tel"],
    // Limpia estilos peligrosos si permites style
    allowedStyles: {
      "*": {
        // restringe propiedades comunes (ajusta a tu UI)
        "text-align": [/^left$|^right$|^center$|^justify$/],
        "font-weight": [/^bold$|^700$|^600$|^500$|^normal$/],
        "text-decoration": [/^none$|^underline$|^line-through$/],
        "font-style": [/^italic$|^normal$/],
        color: [/^#[0-9A-Fa-f]{3,6}$|^rgb\(.+\)$|^rgba\(.+\)$|^var\(.+\)$/],
        "background-color": [/^#[0-9A-Fa-f]{3,6}$|^rgb\(.+\)$|^rgba\(.+\)$/],
      },
    },
    // Quita CSS y atributos no permitidos en lugar de descartar todo el nodo
    nonTextTags: ["style", "script"],
    disallowedTagsMode: "discard",
    // Evita target=_blank sin rel
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href || "";
        const safe = { ...attribs };
        if (href.startsWith("javascript:")) delete safe.href;
        if (safe.target === "_blank") {
          safe.rel = "noopener noreferrer";
        }
        return { tagName, attribs: safe };
      },
      img: (tagName, attribs) => {
        const src = attribs.src || "";
        // bloquea data: y javascript:
        if (src.startsWith("data:") || src.startsWith("javascript:")) {
          return { tagName: "img", attribs: { alt: attribs.alt || "" } };
        }
        return { tagName, attribs };
      },
    },
  });
