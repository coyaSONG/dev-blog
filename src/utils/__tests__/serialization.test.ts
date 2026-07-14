import { describe, expect, it } from 'vitest'
import { escapeXml, serializeJsonForHtml, toCdata } from '@/utils/serialization'

describe('safe serialization', () => {
  it('keeps stored JSON data from terminating a script element', () => {
    const storedValue = '</script><script>alert(1)</script>&\u2028'
    const serialized = serializeJsonForHtml({ storedValue })

    expect(serialized).not.toContain('</script>')
    expect(serialized).not.toContain('<')
    expect(JSON.parse(serialized)).toEqual({ storedValue })
  })

  it('escapes every XML metacharacter in text and attributes', () => {
    expect(escapeXml(`Tom & <Jerry> "cat" 'mouse'`)).toBe(
      'Tom &amp; &lt;Jerry&gt; &quot;cat&quot; &apos;mouse&apos;'
    )
  })

  it('cannot close a CDATA section with stored content', () => {
    const serialized = toCdata('safe]]><script>unsafe</script>')

    expect(serialized).toBe(
      '<![CDATA[safe]]]]><![CDATA[><script>unsafe</script>]]>'
    )
  })
})
