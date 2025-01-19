export const LAYOUT = {
  iconSize: 20,
  maxWidth: '7xl',
} as const

interface NavItem {
  label: string
  path: string
  external?: boolean
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Posts',
    path: '/posts',
  },
  {
    label: 'GitHub',
    path: 'https://github.com/coyaSONG',
    external: true,
  },
] as const 