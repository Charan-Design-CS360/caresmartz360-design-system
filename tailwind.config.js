/** @type {import('tailwindcss').Config} */
// CareSmartz360 Design System — Tailwind CSS v4 Configuration
// Version: 2.3.0
// Auto-generated from ds-tokens-latest.json

const tokens = require('./ds-tokens-latest.json');

module.exports = {
  content: [
    './src/**/*.{html,ts,tsx,js,jsx}',
    './components/**/*.{html,ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        brand: {
          primary:   '#2563EB', // blue.600
          secondary: '#DBEAFE', // blue.100
          hover:     '#1D4ED8', // blue.700
          active:    '#1E40AF', // blue.800
          disabled:  '#D1D5DB', // gray.300
        },
        // Status Colors
        status: {
          success: '#16A34A', // green.600
          warning: '#EAB308', // yellow.500
          error:   '#DC2626', // red.600
          info:    '#2563EB', // blue.600
        },
        // Surface Colors
        surface: {
          default: '#FFFFFF',
          subtle:  '#F9FAFB', // gray.50
          muted:   '#F3F4F6', // gray.100
          overlay: '#1F2937', // gray.800
        },
        // Text Colors
        text: {
          primary:   '#111827', // gray.900
          secondary: '#4B5563', // gray.600
          disabled:  '#9CA3AF', // gray.400
          inverse:   '#FFFFFF',
          brand:     '#2563EB', // blue.600
        },
        // Border Colors
        border: {
          default: '#E5E7EB', // gray.200
          strong:  '#9CA3AF', // gray.400
          focus:   '#3B82F6', // blue.500
          error:   '#EF4444', // red.500
        },
        // Primitive Colors (Blue)
        blue: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },
        // Primitive Colors (Gray)
        gray: {
          50:  '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },
        // Primitive Colors (Green)
        green: {
          50:  '#F0FDF4',
          100: '#DCFCE7',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          900: '#14532D',
        },
        // Primitive Colors (Red)
        red: {
          50:  '#FEF2F2',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          900: '#7F1D1D',
        },
        // Primitive Colors (Yellow)
        yellow: {
          50:  '#FEFCE8',
          400: '#FACC15',
          500: '#EAB308',
          700: '#A16207',
        },
      },
      spacing: {
        '0':  '0px',
        '1':  '4px',
        '2':  '8px',
        '3':  '12px',
        '4':  '16px',
        '5':  '20px',
        '6':  '24px',
        '8':  '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
      },
      borderRadius: {
        'none': '0px',
        'sm':   '2px',
        'DEFAULT': '4px',
        'md':   '4px',
        'lg':   '8px',
        'xl':   '12px',
        '2xl':  '16px',
        'full': '9999px',
      },
      fontSize: {
        'xs':   ['11px', { lineHeight: '1.5' }],
        'sm':   ['12px', { lineHeight: '1.5' }],
        'base': ['14px', { lineHeight: '1.5' }],
        'md':   ['16px', { lineHeight: '1.5' }],
        'lg':   ['18px', { lineHeight: '1.4' }],
        'xl':   ['20px', { lineHeight: '1.4' }],
        '2xl':  ['24px', { lineHeight: '1.3' }],
        '3xl':  ['28px', { lineHeight: '1.25' }],
        '4xl':  ['32px', { lineHeight: '1.2' }],
        '5xl':  ['36px', { lineHeight: '1.2' }],
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontWeight: {
        regular:  '400',
        medium:   '500',
        semibold: '600',
        bold:     '700',
      },
      boxShadow: {
        'sm':  '0 1px 2px rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'md':  '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'lg':  '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'xl':  '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
        'none': 'none',
      },
      zIndex: {
        'dropdown': '1000',
        'sticky':   '1020',
        'fixed':    '1030',
        'overlay':  '1040',
        'modal':    '1050',
        'popover':  '1060',
        'tooltip':  '1070',
        'toast':    '1080',
      },
      opacity: {
        '0':   '0',
        '5':   '0.05',
        '10':  '0.1',
        '20':  '0.2',
        '25':  '0.25',
        '30':  '0.3',
        '40':  '0.4',
        '50':  '0.5',
        '60':  '0.6',
        '70':  '0.7',
        '75':  '0.75',
        '80':  '0.8',
        '90':  '0.9',
        '95':  '0.95',
        '100': '1',
      },
    },
  },
  plugins: [],
};
