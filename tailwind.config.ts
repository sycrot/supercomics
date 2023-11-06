import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'white': '#ffffff',
        'red-primary': '#E50000',
        'gray-8f': '#8F8F8F',
        'gray-1e': '#1E1E1E',
        'gray-1a1': '#1A1C1D',
        'gray-63': '#636363',
        'gray-33': '#333333',
        'gray-2f-80': 'rgba(47, 47, 47, 0.80)'
      },
      width: {
        '48-29': '48.29%',
        '16p': '16%',
        '19-37': '19.37%',
      },
      height: {
        '707': '600px',
        '360': '360px',
        '458': '458px',
        '440': '440px',
        '416': '416px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-menu': 'linear-gradient(180deg, rgba(24, 26, 27, 0.70) 0%, rgba(0, 0, 0, 0.00) 100%)',
        'gradient-left': 'linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0.00) 100%)',
        'gradient-heroes': 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #6F0000 80.54%)',
      },
      boxShadow: {
        'footer': '0px -2px 6px 2px rgba(0, 0, 0, 0.15)',
      },
      letterSpacing: {
        widest: '.18em',
      },
      fontSize: {
        'zero': '0px'
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
export default config
