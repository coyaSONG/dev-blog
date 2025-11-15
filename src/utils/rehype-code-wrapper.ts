import { visit } from 'unist-util-visit'
import type { Element, Root } from 'hast'

interface CodeElement extends Element {
  value?: string
  raw?: string
}

export function rehypeCodeWrapper() {
  return (tree: Root) => {
    visit(tree, (node, index, parent) => {
      if (
        node?.type === 'element' &&
        node?.tagName === 'pre' &&
        parent &&
        typeof index === 'number'
      ) {
        const codeEl = node.children[0] as CodeElement
        if (!codeEl || codeEl.tagName !== 'code') return

        // Extract raw code value from the raw attribute or reconstruct from children
        let raw = (node as CodeElement).raw || ''

        // If raw is empty, try to extract from code element's text content
        if (!raw) {
          const extractText = (node: any): string => {
            if (node.type === 'text') return node.value
            if (node.children) {
              return node.children.map((child: any) => extractText(child)).join('')
            }
            return ''
          }
          raw = extractText(codeEl)
        }

        // Create a deep copy of the pre node to avoid circular references
        const preCopy: Element = JSON.parse(JSON.stringify(node))

        // Create wrapper div with group class
        const wrapper: Element = {
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['relative', 'group'],
          },
          children: [
            {
              type: 'element',
              tagName: 'button',
              properties: {
                className: [
                  'copy-button',
                  'absolute',
                  'top-2',
                  'right-2',
                  'p-2',
                  'rounded-md',
                  'bg-gray-800/50',
                  'hover:bg-gray-700/70',
                  'dark:bg-gray-700/50',
                  'dark:hover:bg-gray-600/70',
                  'text-gray-300',
                  'hover:text-white',
                  'transition-all',
                  'duration-200',
                  'opacity-0',
                  'group-hover:opacity-100',
                  'md:opacity-0',
                  'md:group-hover:opacity-100',
                  'sm:opacity-100',
                ],
                'data-code': raw || '',
                title: 'Copy code',
                'aria-label': 'Copy code to clipboard',
              },
              children: [
                {
                  type: 'element',
                  tagName: 'svg',
                  properties: {
                    className: ['copy-icon', 'h-4', 'w-4'],
                    xmlns: 'http://www.w3.org/2000/svg',
                    width: '24',
                    height: '24',
                    viewBox: '0 0 24 24',
                    fill: 'none',
                    stroke: 'currentColor',
                    strokeWidth: '2',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                  },
                  children: [
                    {
                      type: 'element',
                      tagName: 'rect',
                      properties: {
                        width: '14',
                        height: '14',
                        x: '8',
                        y: '8',
                        rx: '2',
                        ry: '2',
                      },
                      children: [],
                    },
                    {
                      type: 'element',
                      tagName: 'path',
                      properties: {
                        d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2',
                      },
                      children: [],
                    },
                  ],
                },
                {
                  type: 'element',
                  tagName: 'svg',
                  properties: {
                    className: ['check-icon', 'h-4', 'w-4', 'hidden'],
                    xmlns: 'http://www.w3.org/2000/svg',
                    width: '24',
                    height: '24',
                    viewBox: '0 0 24 24',
                    fill: 'none',
                    stroke: 'currentColor',
                    strokeWidth: '2',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                  },
                  children: [
                    {
                      type: 'element',
                      tagName: 'path',
                      properties: {
                        d: 'M20 6 9 17l-5-5',
                      },
                      children: [],
                    },
                  ],
                },
              ],
            },
            preCopy, // Copy of the original pre element
          ],
        }

        // Replace the pre node in parent with the wrapper
        parent.children[index] = wrapper
      }
    })
  }
}
