'use client'

import { useEffect } from 'react'

export function CopyButtonHandler() {
  useEffect(() => {
    const handleCopyClick = async (event: MouseEvent) => {
      const button = (event.currentTarget as HTMLButtonElement)
      const code = button.getAttribute('data-code')

      if (!code) return

      try {
        await navigator.clipboard.writeText(code)

        // Toggle icons
        const copyIcon = button.querySelector('.copy-icon')
        const checkIcon = button.querySelector('.check-icon')

        if (copyIcon && checkIcon) {
          copyIcon.classList.add('hidden')
          checkIcon.classList.remove('hidden')
          button.setAttribute('title', 'Copied!')
          button.setAttribute('aria-label', 'Code copied to clipboard')

          setTimeout(() => {
            copyIcon.classList.remove('hidden')
            checkIcon.classList.add('hidden')
            button.setAttribute('title', 'Copy code')
            button.setAttribute('aria-label', 'Copy code to clipboard')
          }, 2000)
        }
      } catch (err) {
        console.error('Failed to copy code:', err)
      }
    }

    // Attach event listeners to all copy buttons
    const copyButtons = document.querySelectorAll('.copy-button')
    copyButtons.forEach((button) => {
      button.addEventListener('click', handleCopyClick as EventListener)
    })

    // Cleanup
    return () => {
      copyButtons.forEach((button) => {
        button.removeEventListener('click', handleCopyClick as EventListener)
      })
    }
  }, [])

  return null
}
