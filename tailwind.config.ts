import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'var(--font-body)', '-apple-system', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: 'rgb(var(--brand-primary) / <alpha-value>)',
          'primary-light': 'rgb(var(--brand-primary-light) / <alpha-value>)',
          'primary-dark': 'rgb(var(--brand-primary-dark) / <alpha-value>)',
        },
        accent: {
          react: 'rgb(var(--accent-react) / <alpha-value>)',
          nextjs: 'rgb(var(--accent-nextjs) / <alpha-value>)',
          typescript: 'rgb(var(--accent-typescript) / <alpha-value>)',
          css: 'rgb(var(--accent-css) / <alpha-value>)',
          web: 'rgb(var(--accent-web) / <alpha-value>)',
          default: 'rgb(var(--accent-default) / <alpha-value>)',
        },
        semantic: {
          success: 'rgb(var(--color-success) / <alpha-value>)',
          warning: 'rgb(var(--color-warning) / <alpha-value>)',
          error: 'rgb(var(--color-error) / <alpha-value>)',
          info: 'rgb(var(--color-info) / <alpha-value>)',
        },
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease',
        'fade-in-down': 'fade-in-down 0.2s ease',
        'slide-in': 'slide-in 0.2s ease',
        'scale-in': 'scale-in 0.2s ease',
      }
    },
  },
  plugins: [typography],
}

export default config
