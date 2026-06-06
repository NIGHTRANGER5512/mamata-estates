/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:       '#0D6245',
        'primary-light':'#128A5E',
        'primary-dark': '#094D36',
        secondary:     '#141A15',
        surface:       '#F7F3EE',
        muted:         '#7C8A7E',
        accent:        '#C09508',
        'accent-light':'#D9B020',
      },
      fontFamily: {
        // DM Serif Display — clean premium serif (headings)
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        // Plus Jakarta Sans — modern humanist sans-serif (body)
        body:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        // DM Mono — tabular data, stats, codes
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
