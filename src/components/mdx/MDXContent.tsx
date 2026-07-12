'use client'

import { getMDXComponent } from 'next-contentlayer2/hooks'
import { CodeBlock } from './CodeBlock'

interface MDXContentProps {
  code: string
}

const components = {
  pre: CodeBlock,
}

export function MDXContent({ code }: MDXContentProps) {
  // Contentlayer compiles the MDX source into this component; its identity follows `code`.
  const Component = getMDXComponent(code)
  // eslint-disable-next-line react-hooks/static-components
  return <Component components={components} />
}
