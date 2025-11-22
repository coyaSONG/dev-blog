'use client'

import { useMDXComponent } from 'next-contentlayer2/hooks'
import { CodeBlock } from './CodeBlock'

interface MDXContentProps {
  code: string
}

const components = {
  pre: CodeBlock,
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code)
  return <Component components={components} />
}
