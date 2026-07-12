import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { CodeBlock } from './CodeBlock'

interface MDXContentProps {
  source: string
}

const components = {
  pre: CodeBlock,
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          rehypePlugins: [
            rehypeSlug,
            [
              rehypePrettyCode,
              {
                theme: { dark: 'github-dark-dimmed', light: 'github-light' },
                keepBackground: false,
                defaultLang: 'plaintext',
              },
            ],
          ],
        },
      }}
    />
  )
}
