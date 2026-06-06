/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:       '#C1440E',
        'primary-light':'#D4622A',
        'primary-dark': '#A03509',
        secondary:     '#1C1C1C',
        surface:       '#FAF7F2',
        muted:         '#8A8680',
        accent:        '#B8960C',
        'accent-light':'#D4AE16',
      },
      fontFamily: {
        // Cormorant Garamond — high-contrast editorial serif (headings)
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        // Plus Jakarta Sans — modern humanist sans-serif (body)
        body:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        // DM Mono — tabular data, RERA IDs, stats
        'mono-detail': ['"DM Mono"', 'monospace'],
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'marquee-slow': 'marquee 42s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
