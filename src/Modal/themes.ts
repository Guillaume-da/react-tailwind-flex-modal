/**
 * Preset themes.
 *
 * A theme is *not* a bag of Tailwind utilities. It is a single class on the modal
 * root, and the visuals for it are written in `src/tailwind.css` under
 * `@layer components`. That layer sits below `utilities` in the cascade, so any
 * utility a consumer passes through `classNames` — or through the deprecated
 * colour props — beats the theme without needing an `!` suffix.
 *
 * The flip side: the component must stop emitting its own *colour* utilities when
 * a theme is active, or those would beat the theme for the same reason. See the
 * `skin` / structure split in `Modal.tsx`.
 */

export type ModalTheme =
	| 'neutral'
	| 'terminal'
	| 'brutalist'
	| 'glass'
	| 'editorial'
	| 'neon'
	| 'minimal'
	| 'pop'
	| 'liquid'
	| 'command'
	| 'elevated'

export interface ModalThemeInfo {
	name: ModalTheme;
	label: string;
	description: string;
	/** Class applied to the modal root, or `null` for the built-in neutral look. */
	className: string | null;
	/** Render window chrome by default. Only the terminal look wants it. */
	chrome?: boolean;
	/** Append a blinking block caret after the variant message. */
	caret?: boolean;
}

export const modalThemes: Record<ModalTheme, ModalThemeInfo> = {
	neutral: {
		name: 'neutral',
		label: 'Neutral',
		description:
			'The default: white panel, outlined cancel, red destructive confirm.',
		className: null
	},
	terminal: {
		name: 'terminal',
		label: 'Terminal',
		description:
			'A terminal window — dark navy panel, traffic lights, monospace type.',
		className: 'rtm-theme-terminal',
		chrome: true,
		caret: true
	},
	brutalist: {
		name: 'brutalist',
		label: 'Brutalist',
		description:
			'Flat offset shadow instead of blur, 2px ink borders, vermillion confirm.',
		className: 'rtm-theme-brutalist'
	},
	glass: {
		name: 'glass',
		label: 'Glass',
		description: 'Frosted translucent panel over a heavily blurred backdrop.',
		className: 'rtm-theme-glass'
	},
	editorial: {
		name: 'editorial',
		label: 'Editorial',
		description: 'Warm paper stock, serif title, hairline rules, small caps.',
		className: 'rtm-theme-editorial'
	},
	neon: {
		name: 'neon',
		label: 'Neon',
		description:
			'Coloured halo, 1.5px gradient hairline, gradient confirm button.',
		className: 'rtm-theme-neon'
	},
	minimal: {
		name: 'minimal',
		label: 'Minimal',
		description: 'No borders, no shadow — hierarchy carried by space alone.',
		className: 'rtm-theme-minimal'
	},
	pop: {
		name: 'pop',
		label: 'Pop',
		description:
			'Saturated backdrop, cream panel, multicolour ribbon, oversized title.',
		className: 'rtm-theme-pop'
	},
	liquid: {
		name: 'liquid',
		label: 'Liquid',
		description:
			'Tinted glass: thick blur, specular top edge, long shadow, pill buttons.',
		className: 'rtm-theme-liquid'
	},
	command: {
		name: 'command',
		label: 'Command',
		description:
			'Command-palette chrome — tight rhythm, chevron title, amber confirm.',
		className: 'rtm-theme-command'
	},
	elevated: {
		name: 'elevated',
		label: 'Elevated',
		description:
			'Dark-native: zinc panel, light hairline instead of a grey border, sky confirm.',
		className: 'rtm-theme-elevated'
	}
}

/** Every theme name, in the order they should be listed in docs and pickers. */
export const modalThemeNames = Object.keys(modalThemes) as ModalTheme[]

export const resolveThemeClass = (theme: ModalTheme | undefined): string =>
	(theme && modalThemes[theme]?.className) || ''

/** `neutral` is the only theme whose colours come from the component itself. */
export const isNeutralTheme = (theme: ModalTheme | undefined): boolean =>
	theme === undefined || theme === 'neutral' || !modalThemes[theme]

export const themeInfo = (theme: ModalTheme | undefined): ModalThemeInfo =>
	(theme && modalThemes[theme]) || modalThemes.neutral
