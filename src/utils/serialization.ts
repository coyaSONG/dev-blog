const HTML_SAFE_JSON_CHARACTERS: Record<string, string> = {
  '<': '\\u003c',
  '>': '\\u003e',
  '&': '\\u0026',
  '\u2028': '\\u2028',
  '\u2029': '\\u2029',
}

/** Serialize JSON so stored content cannot terminate the surrounding script tag. */
export function serializeJsonForHtml(value: unknown): string {
  return JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, (character) =>
    HTML_SAFE_JSON_CHARACTERS[character]
  )
}

/** Escape a value for an XML text or attribute context. */
export function escapeXml(value: unknown): string {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

/** Wrap untrusted text in CDATA without allowing it to close the section. */
export function toCdata(value: unknown): string {
  return `<![CDATA[${String(value).replaceAll(']]>', ']]]]><![CDATA[>')}]]>`
}
