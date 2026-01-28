import sanitizeHtml from "sanitize-html";

// Constantes para evitar repetición
const ALLOWED_TAGS = [
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
  "button",
] as const;

const ALLOWED_SCHEMES = ["http", "https", "mailto", "tel"] as const;

const COLOR_REGEX = /^(#[0-9A-Fa-f]{3,6}|rgb\(.+\)|rgba\(.+\)|var\(.+\))$/;
const SAFE_TEXT_ALIGN = /^(left|right|center|justify)$/;
const SAFE_FONT_WEIGHT = /^(bold|700|600|500|normal)$/;
const SAFE_TEXT_DECORATION = /^(none|underline|line-through)$/;
const SAFE_FONT_STYLE = /^(italic|normal)$/;
const VALID_URL_REGEX = /^(https?:\/\/|mailto:|tel:|#).+/;

const ALLOWED_STYLES = {
  "*": {
    "text-align": [SAFE_TEXT_ALIGN],
    "font-weight": [SAFE_FONT_WEIGHT],
    "text-decoration": [SAFE_TEXT_DECORATION],
    "font-style": [SAFE_FONT_STYLE],
    color: [COLOR_REGEX],
    "background-color": [COLOR_REGEX],
  },
};

const ALLOWED_ATTRIBUTES = {
  a: ["href", "name", "target", "rel"],
  img: ["src", "alt", "title", "width", "height"],
  "*": ["style"],
};

/**
 * Sanitiza URLs peligrosas (javascript:, data:) y valida formato
 */
const isSafeUrl = (url: string): boolean => {
  if (!url || typeof url !== "string") return false;

  const trimmedUrl = url.trim();

  // Rechazar URLs maliciosas
  if (trimmedUrl.startsWith("javascript:") || trimmedUrl.startsWith("data:")) {
    return false;
  }

  // Validar que sea una URL válida (http, https, mailto, tel)
  return VALID_URL_REGEX.test(trimmedUrl);
};

/**
 * Transforma tags de anclaje de forma segura
 */
const transformAnchorTag = (tagName: string, attribs: Record<string, string>) => {
  const href = attribs.href || "";
  const safe = { ...attribs };

  if (!isSafeUrl(href)) {
    delete safe.href;
  }

  if (safe.target === "_blank") {
    safe.rel = "noopener noreferrer";
  }

  return { tagName, attribs: safe };
};

/**
 * Transforma tags de imagen de forma segura
 */
const transformImageTag = (tagName: string, attribs: Record<string, string>) => {
  const src = attribs.src || "";

  if (!isSafeUrl(src)) {
    return { tagName, attribs: { alt: attribs.alt || "" } };
  }

  return { tagName, attribs };
};

/**
 * Sanitiza HTML eliminando contenido malicioso
 * @param dirty - HTML sin limpiar
 * @returns HTML sanitizado
 */
export const sanitize = (dirty: string): string => {
  if (!dirty || typeof dirty !== "string") {
    return "";
  }

  return sanitizeHtml(dirty, {
    allowedTags: [...ALLOWED_TAGS],
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: [...ALLOWED_SCHEMES],
    allowedStyles: ALLOWED_STYLES,
    nonTextTags: ["style", "script"],
    disallowedTagsMode: "discard",
    transformTags: {
      a: transformAnchorTag,
      img: transformImageTag,
    },
  });
};
