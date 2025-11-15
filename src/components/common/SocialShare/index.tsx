'use client'

import { Share2, Twitter, Facebook, Linkedin, Link as LinkIcon } from 'lucide-react'
import { useState, useEffect } from 'react'

interface SocialShareProps {
  title: string
  url?: string
  description?: string
}

export default function SocialShare({ title, url, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const [currentUrl, setCurrentUrl] = useState(url || '')

  useEffect(() => {
    // Use client-side URL if not provided or if it's localhost
    if (!url || url.includes('localhost')) {
      setCurrentUrl(window.location.href)
    }
  }, [url])

  const encodedUrl = encodeURIComponent(currentUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || '')

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    window.open(
      shareLinks[platform],
      'share-dialog',
      'width=600,height=400'
    )
  }

  return (
    <div className="flex items-center gap-2 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <Share2 size={18} />
        <span className="font-medium">공유하기:</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleShare('twitter')}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Share on Twitter"
          title="Twitter에 공유"
        >
          <Twitter size={18} className="text-[#1DA1F2]" />
        </button>

        <button
          onClick={() => handleShare('facebook')}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Share on Facebook"
          title="Facebook에 공유"
        >
          <Facebook size={18} className="text-[#4267B2]" />
        </button>

        <button
          onClick={() => handleShare('linkedin')}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Share on LinkedIn"
          title="LinkedIn에 공유"
        >
          <Linkedin size={18} className="text-[#0077B5]" />
        </button>

        <button
          onClick={handleCopyLink}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
          aria-label="Copy link"
          title={copied ? '복사 완료!' : '링크 복사'}
        >
          <LinkIcon size={18} className={copied ? 'text-green-500' : 'text-gray-600 dark:text-gray-400'} />
          {copied && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-green-500 text-white rounded whitespace-nowrap">
              복사됨!
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
