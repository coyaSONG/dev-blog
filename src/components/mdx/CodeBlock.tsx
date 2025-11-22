'use client'

import { useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { useTransition, animated } from '@react-spring/web'
import { LanguageIcon } from './LanguageIcon'

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
    children?: React.ReactNode
    raw?: string
    'data-language'?: string
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
    const [isCopied, setIsCopied] = useState(false)
    const preRef = useRef<HTMLPreElement>(null)

    // rehype-pretty-code의 data-language 속성 우선 사용
    const language = props['data-language'] ||
        className?.replace(/language-/, '') ||
        'plaintext'

    const copyToClipboard = async () => {
        if (preRef.current?.textContent) {
            await navigator.clipboard.writeText(preRef.current.textContent)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        }
    }

    const transitions = useTransition(isCopied, {
        from: { opacity: 0, transform: 'scale(0.5)' },
        enter: { opacity: 1, transform: 'scale(1)' },
        leave: { opacity: 0, transform: 'scale(0.5)' },
        config: { tension: 300, friction: 20 },
    })

    return (
        <div className="my-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E1E1E] shadow-sm">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-[#2D2D2D] border-b border-gray-200 dark:border-gray-700">
                <LanguageIcon language={language} />
                <button
                    onClick={copyToClipboard}
                    className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-500 dark:text-gray-400 relative w-6 h-6 flex items-center justify-center"
                    aria-label="Copy code"
                >
                    {transitions((style, item) => (
                        item ? (
                            <animated.div style={{ ...style, position: 'absolute' }}>
                                <Check size={14} />
                            </animated.div>
                        ) : (
                            <animated.div style={{ ...style, position: 'absolute' }}>
                                <Copy size={14} />
                            </animated.div>
                        )
                    ))}
                </button>
            </div>
            <div className="p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                <pre ref={preRef} className={`!m-0 !p-0 !bg-transparent ${className || ''}`} {...props}>
                    {children}
                </pre>
            </div>
        </div>
    )
}
