export const styles = {
  button: {
    base: 'p-2 rounded-lg transition-colors',
    hover: 'hover:bg-gray-100 dark:hover:bg-gray-800'
  },
  link: {
    base: 'relative group',
    text: 'hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors',
    underline: 'absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left'
  }
} as const 