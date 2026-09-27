import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // categorias.ts arma clases de gradiente/color como strings (p.ej.
    // 'from-dorado-200 via-dorado-300 to-dorado-500') que luego se
    // interpolan en tiempo de ejecución. El escaneo de Tailwind es texto
    // plano, no evalúa JS — necesita ver ese archivo para encontrar esos
    // tokens; sin esta línea generaba CSS vacío para casi todas las
    // categorías (texto blanco sobre fondo transparente = invisible).
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terracota: {
          50: '#fdf4f0',
          100: '#fbe5d8',
          200: '#f8cab0',
          300: '#f3a680',
          400: '#ec7a4e',
          500: '#e55a2b',
          600: '#d44220',
          700: '#b0321b',
          800: '#8d2a1c',
          900: '#72261b',
        },
        dorado: {
          50: '#fefdf0',
          100: '#fdf7d0',
          200: '#faec9e',
          300: '#f5dc64',
          400: '#edc83a',
          500: '#d9ac1e',
          600: '#b98914',
          700: '#946713',
          800: '#785116',
          900: '#654316',
        },
        bosque: {
          50: '#f2f7f2',
          100: '#e0ede0',
          200: '#c2dbc3',
          300: '#96c198',
          400: '#64a167',
          500: '#428445',
          600: '#326834',
          700: '#285329',
          800: '#224324',
          900: '#1c3720',
        },
        turquesa: {
          50: '#eefcfb',
          100: '#d3f6f3',
          200: '#a8ede7',
          300: '#72ddd5',
          400: '#3fc3bb',
          500: '#22a49d',
          600: '#18827e',
          700: '#186866',
          800: '#175452',
          900: '#164645',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
