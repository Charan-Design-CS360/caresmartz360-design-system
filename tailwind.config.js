/** @type {import('tailwindcss').Config} */
// CareSmartz360 Design System — Tailwind CSS v4 Configuration
// Version: 2.4.0
// Stack: Angular 19 + Tailwind CSS + SCSS
// Auto-generated from ds-tokens-latest.json

module.exports = {
  content: [
    './src/**/*.{html,ts,scss}',
    './projects/**/*.{html,ts,scss}'
  ],
  theme: {
    extend: {
      colors: {
        // --- Brand Colors (semantic.brand) ---
        // VERIFIED 2026-07-08 against live Figma "Brandblue" variable collection
        // (Dev Mode MCP pull, DJBpjoXPMEw6bBAByIQaAy node 89:2). Previous values
        // (#2563EB primary, #1D4ED8 hover, #1E40AF active) were Tailwind's stock
        // blue-600/700/800 — not present anywhere in the real Figma ramp. See
        // VERIFICATION-LOG.md for the full before/after.
                'field': {
          'value': {
            'primary': 'var(--field-value-primary)',
            'inverse': 'var(--field-value-inverse)',
            'link': 'var(--field-value-link)',
            'placeholder': 'var(--field-value-placeholder)',
            'disabled': 'var(--field-value-disabled)',
          },
          'icon': 'var(--field-icon)',
          'bg': {
            'default': 'var(--field-bg-default)',
            'focus': 'var(--field-bg-focus)',
            'danger': 'var(--field-bg-danger)',
            'disabled': 'var(--field-bg-disabled)',
          },
          'border': {
            'default': 'var(--field-border-default)',
            'focus': 'var(--field-border-focus)',
            'danger': 'var(--field-border-danger)',
          },
        },
        'text': {
          'brand': 'var(--text-brand)',
          'primary': 'var(--text-primary)',
          'secondary': 'var(--text-secondary)',
          'tertiary': 'var(--text-tertiary)',
          'inverse': 'var(--text-inverse)',
          'links': 'var(--text-links)',
          'disabled': 'var(--text-disabled)',
          'danger': 'var(--text-danger)',
          'warning': 'var(--text-warning)',
          'success': 'var(--text-success)',
        },
        'border': {
          'brand': 'var(--border-brand)',
          'strong': 'var(--border-strong)',
          'medium': 'var(--border-medium)',
          'subtle': 'var(--border-subtle)',
          'danger': 'var(--border-danger)',
          'warning': 'var(--border-warning)',
          'success': 'var(--border-success)',
        },
        'icon': {
          'primary': 'var(--icon-primary)',
          'secondary': 'var(--icon-secondary)',
          'soft': 'var(--icon-soft)',
          'inverse': 'var(--icon-inverse)',
          'brand': 'var(--icon-brand)',
          'disabled': 'var(--icon-disabled)',
          'danger': 'var(--icon-danger)',
          'warning': 'var(--icon-warning)',
          'success': 'var(--icon-success)',
        },
        'surface': {
          'base': 'var(--surface-base)',
          'secondary': 'var(--surface-secondary)',
          'tertiary': 'var(--surface-tertiary)',
          'brand': 'var(--surface-brand)',
          'danger': 'var(--surface-danger)',
          'warning': 'var(--surface-warning)',
          'success': 'var(--surface-success)',
          'disabled': 'var(--surface-disabled)',
        },
        'action': {
          'primary': {
            'bg': 'var(--action-primary-bg)',
            'hover': 'var(--action-primary-hover)',
            'pressed': 'var(--action-primary-pressed)',
            'text': {
              'neutral': 'var(--action-primary-text-neutral)',
              'hard': 'var(--action-primary-text-hard)',
            },
            'outlined': 'var(--action-primary-outlined)',
          },
          'secondary': {
            'bg': 'var(--action-secondary-bg)',
            'hover': 'var(--action-secondary-hover)',
            'pressed': 'var(--action-secondary-pressed)',
            'text': 'var(--action-secondary-text)',
            'border': 'var(--action-secondary-border)',
            'outlined': 'var(--action-secondary-outlined)',
          },
          'soft': {
            'bg': 'var(--action-soft-bg)',
            'hover': 'var(--action-soft-hover)',
            'pressed': 'var(--action-soft-pressed)',
            'text': {
              'neutral': 'var(--action-soft-text-neutral)',
            },
            'outlined': 'var(--action-soft-outlined)',
          },
          'ghost': {
            'bg': 'var(--action-ghost-bg)',
            'hover': 'var(--action-ghost-hover)',
            'pressed': 'var(--action-ghost-pressed)',
            'text': {
              'hard': 'var(--action-ghost-text-hard)',
            },
          },
          'success': {
            'bg': 'var(--action-success-bg)',
            'hover': 'var(--action-success-hover)',
            'pressed': 'var(--action-success-pressed)',
            'text': {
              'neutral': 'var(--action-success-text-neutral)',
              'hard': 'var(--action-success-text-hard)',
            },
            'outlined': 'var(--action-success-outlined)',
          },
          'warning': {
            'bg': 'var(--action-warning-bg)',
            'hover': 'var(--action-warning-hover)',
            'pressed': 'var(--action-warning-pressed)',
            'text': {
              'neutral': 'var(--action-warning-text-neutral)',
            },
            'outlined': 'var(--action-warning-outlined)',
          },
          'destructive': {
            'bg': 'var(--action-destructive-bg)',
            'hover': 'var(--action-destructive-hover)',
            'pressed': 'var(--action-destructive-pressed)',
            'text': {
              'neutral': 'var(--action-destructive-text-neutral)',
            },
            'outlined': 'var(--action-destructive-outlined)',
          },
          'disabled': {
            'bg': 'var(--action-disabled-bg)',
            'text': {
              'neutral': 'var(--action-disabled-text-neutral)',
            },
          },
          'toggle': {
            'bg': {
              'default': 'var(--action-toggle-bg-default)',
              'hover': 'var(--action-toggle-bg-hover)',
              'active': 'var(--action-toggle-bg-active)',
              'partial': 'var(--action-toggle-bg-partial)',
            },
            'icon': {
              'default': 'var(--action-toggle-icon-default)',
              'hover': 'var(--action-toggle-icon-hover)',
              'active': 'var(--action-toggle-icon-active)',
              'partial': 'var(--action-toggle-icon-partial)',
              'disabled': 'var(--action-toggle-icon-disabled)',
            },
          },
        },
        'sidebar': {
          'primary': {
            'bg': 'var(--sidebar-primary-bg)',
            'foreground': 'var(--sidebar-primary-foreground)',
          },
          'secondary': {
            'bg': 'var(--sidebar-secondary-bg)',
            'foreground': 'var(--sidebar-secondary-foreground)',
          },
          'accent': {
            'bg': 'var(--sidebar-accent-bg)',
            'foreground': 'var(--sidebar-accent-foreground)',
          },
          'border': 'var(--sidebar-border)',
          'ring': 'var(--sidebar-ring)',
          'text': 'var(--sidebar-text)',
          'icon': 'var(--sidebar-icon)',
        },
        'tags': {
          'neutral': 'var(--tags-neutral)',
          'disabled': 'var(--tags-disabled)',
          'red': 'var(--tags-red)',
          'yellow': 'var(--tags-yellow)',
          'green': 'var(--tags-green)',
          'blue': 'var(--tags-blue)',
        },
        'tooltip': {
          'bg': 'var(--tooltip-bg)',
          'text': 'var(--tooltip-text)',
        },
        'popover': {
          'secondary': {
            'bg': 'var(--popover-secondary-bg)',
            'foreground': 'var(--popover-secondary-foreground)',
          },
        },
        'chart': {
          '1': 'var(--chart-1)',
          '2': 'var(--chart-2)',
          '3': 'var(--chart-3)',
          '4': 'var(--chart-4)',
          '5': 'var(--chart-5)',
        },
        'status': {
          'shift': {
            'open': 'var(--status-shift-open)',
            'scheduled': 'var(--status-shift-scheduled)',
            'approved': 'var(--status-shift-approved)',
          },
          'meeting': {
            'approved': 'var(--status-meeting-approved)',
            'cancelled': 'var(--status-meeting-cancelled)',
          },
          'task': {
            'deferred': 'var(--status-task-deferred)',
            'not': {
              'started': 'var(--status-task-not-started)',
            },
            'in': {
              'progress': 'var(--status-task-in-progress)',
            },
          },
        },
        // --- Primitive Blue Scale ---
        // Renamed in intent (not in key, to avoid a breaking rename across the codebase)
        // to mirror Figma's real "Brandblue" variable collection. Verified 2026-07-08.
        blue: {
          50:  '#F0F7FF',
          100: '#E0F0FF',
          200: '#BADEFF',
          300: '#8ACCFF',
          400: '#57B5FF',
          500: '#2499FF',
          600: '#0077FF',
          700: '#005CE6',
          800: '#0045B3',
          900: '#003180',
          950: '#001F52',
        },
        // --- Primitive Gray Scale ---
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
        },
        // --- Primitive Green Scale ---
        green: {
          50:  '#F0FDF4',
          100: '#DCFCE7',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          900: '#14532D',
        },
        // --- Primitive Red Scale ---
        red: {
          50:  '#FEF2F2',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          900: '#7F1D1D',
        },
        // --- Primitive Yellow Scale ---
        yellow: {
          50:  '#FEFCE8',
          400: '#FACC15',
          500: '#EAB308',
          700: '#A16207',
        },
      },
      fontFamily: {
        sans: ["'Inter'", 'system-ui', 'sans-serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
      },
      fontSize: {
        xs:   ['12px', { lineHeight: '1.5' }],
        sm:   ['14px', { lineHeight: '1.5' }],
        base: ['16px', { lineHeight: '1.5' }],
        lg:   ['18px', { lineHeight: '1.5' }],
        xl:   ['20px', { lineHeight: '1.25' }],
        '2xl':['24px', { lineHeight: '1.25' }],
        '3xl':['30px', { lineHeight: '1.25' }],
        '4xl':['36px', { lineHeight: '1.25' }],
      },
      // NOTE 2026-07-08: these keys use Tailwind's classic index convention
      // (key '4' = 16px, i.e. index × 4px) — NOT the same as Figma's primitive
      // naming, which names spacing tokens by their literal pixel value
      // (Figma's "space-4" = 4px, "space-16" = 16px). Both describe the same
      // underlying 4/8/12/16/20/24/32/40/48/64/80px scale, just indexed
      // differently. Left unchanged here because renaming these keys would be
      // a breaking change to every p-4/gap-4/etc. class already in the app —
      // needs developer sign-off before remapping. See VERIFICATION-LOG.md.
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
      },
      borderRadius: {
        none: '0px',
        sm:   '2px',
        DEFAULT: '4px',
        md:   '4px',
        lg:   '8px',
        xl:   '12px',
        '2xl':'16px',
        full: '9999px',
      },
      boxShadow: {
        sm:   '0 1px 2px 0 rgba(0,0,0,0.05)',
        DEFAULT: '0 4px 6px -1px rgba(0,0,0,0.1)',
        md:   '0 4px 6px -1px rgba(0,0,0,0.1)',
        lg:   '0 10px 15px -3px rgba(0,0,0,0.1)',
        xl:   '0 20px 25px -5px rgba(0,0,0,0.1)',
        none: 'none',
      },
      // --- Touch Target Enforcement (WCAG AA min 40px) ---
      minHeight: {
        touch: '40px',
        'touch-lg': '48px',
      },
      minWidth: {
        touch: '40px',
      },
    },
  },
  plugins: [],
  // SCSS-only custom properties are defined in src/styles/tokens.scss
  // Never use inline styles or hardcoded values — always reference semantic tokens
  // Icons: Google Material Symbols Rounded via <span class="material-symbols-rounded">
};
