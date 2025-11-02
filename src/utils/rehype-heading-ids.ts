import { visit } from 'unist-util-visit'
import type { Root, Element } from 'hast'

/**
 * Rehype plugin to add IDs to headings
 */
export function rehypeHeadingIds() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (['h2', 'h3'].includes(node.tagName)) {
        const text = extractText(node)
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9가-힣\s-]/g, '')
          .replace(/\s+/g, '-')

        node.properties = node.properties || {}
        node.properties.id = id
      }
    })
  }
}

function extractText(node: Element): string {
  if (node.children) {
    return node.children
      .map((child: any) => {
        if (child.type === 'text') {
          return child.value
        }
        if (child.type === 'element') {
          return extractText(child)
        }
        return ''
      })
      .join('')
  }
  return ''
}
