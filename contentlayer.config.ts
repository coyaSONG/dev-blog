import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import rehypePrettyCode from 'rehype-pretty-code'
import { visit } from 'unist-util-visit'
import type { Root, Element } from 'hast'

interface RehypePrettyCodeOptions {
  theme: string
  onVisitLine: (node: Element) => void
  onVisitHighlightedLine: (node: Element) => void
  onVisitHighlightedWord: (node: Element) => void
}

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  theme: 'github-dark',
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  onVisitHighlightedLine(node) {
    if (Array.isArray(node.properties?.className)) {
      node.properties.className.push('highlighted')
    } else {
      node.properties.className = ['highlighted']
    }
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ['word']
  },
}

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string', required: true },
    category: {
      type: 'string',
      required: false,
      default: 'General'
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: false,
      default: []
    },
    viewCount: {
      type: 'number',
      required: false,
      default: 0
    },
    author: {
      type: 'json',
      required: false
    }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath.replace(/^posts\//, '')
    },
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.flattenedPath.replace(/^posts\//, '')}`
    },
    readingTime: {
      type: 'number',
      resolve: (post) => {
        const wordsPerMinute = 200
        const wordCount = post.body.raw.split(/\s+/g).length
        const minutes = Math.ceil(wordCount / wordsPerMinute)
        return minutes
      }
    }
  }
}))

interface CodeElement extends Element {
  value?: string
  raw?: string
}

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      [rehypePrettyCode, rehypePrettyCodeOptions],
      () => (tree: Root) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'pre') {
            const [codeEl] = node.children as CodeElement[]
            if (codeEl.tagName !== 'code') return

            ;(node as CodeElement).raw = codeEl.value
          }
        })
      },
    ],
  },
})