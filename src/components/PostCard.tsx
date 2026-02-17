'use client'

import { useRef, useState } from 'react'
import { Link } from 'next-view-transitions'
import type { Post } from '@/types/post'
import { ViewCount } from '@/components/ViewCount'
import { getTagClasses, getCardAccentColor } from '@/utils/styles'

interface PostCardProps {
    post: Post
    viewCount?: number
    index: number
    headingLevel?: 'h2' | 'h3'
}

export function PostCard({ post, viewCount, index, headingLevel = 'h2' }: PostCardProps) {
    const Heading = headingLevel
    const divRef = useRef<HTMLDivElement>(null)
    const [isFocused, setIsFocused] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [opacity, setOpacity] = useState(0)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isFocused) return

        const div = divRef.current
        const rect = div.getBoundingClientRect()

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    const handleFocus = () => {
        setIsFocused(true)
        setOpacity(1)
    }

    const handleBlur = () => {
        setIsFocused(false)
        setOpacity(0)
    }

    const handleMouseEnter = () => {
        setOpacity(1)
    }

    const handleMouseLeave = () => {
        setOpacity(0)
    }

    return (
        <article
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl animate-fade-in ${getCardAccentColor(
                post.tags || []
            )}`}
            style={{
                viewTransitionName: 'post-card',
                animationDelay: `${index * 50}ms`,
            } as React.CSSProperties}
        >
            {/* Spotlight Effect */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(var(--spotlight-color), 0.1), transparent 40%)`,
                }}
            />

            <Link href={post.url} className="relative block p-6 h-full flex flex-col">
                {/* Category & Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    {post.category && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent-css/10 dark:bg-accent-css/20 text-accent-css border border-accent-css/30">
                            {post.category}
                        </span>
                    )}
                    {post.tags &&
                        post.tags.map((tag) => (
                            <span
                                key={tag}
                                className={`px-3 py-1 rounded-full text-xs font-medium border ${getTagClasses(
                                    tag
                                )} transition-transform duration-200 group-hover:scale-105`}
                            >
                                {tag}
                            </span>
                        ))}
                </div>

                {/* Title */}
                <Heading className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-brand-primary dark:group-hover:text-brand-primary-light transition-colors duration-200 line-clamp-2 font-heading">
                    {post.title}
                </Heading>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 leading-relaxed flex-grow">
                    {post.description}
                </p>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400 mt-auto">
                    <div className="flex items-center gap-4">
                        <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                        <ViewCount
                            slug={post.slug}
                            increment={false}
                            initialViews={viewCount}
                        />
                    </div>

                    {/* Arrow Icon */}
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200 text-brand-primary dark:text-brand-primary-light">
                        →
                    </span>
                </div>
            </Link>
        </article>
    )
}
