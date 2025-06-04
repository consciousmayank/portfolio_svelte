<script lang="ts">
	interface Props {
		children: any;
		class?: string;
		padding?: string;
		margin?: string;
		marginTop?: string;
		marginRight?: string;
		marginBottom?: string;
		marginLeft?: string;
		borderRadius?: string;
		blur?: string;
		opacity?: number;
		color?: string;
	}

	let {
		children,
		class: className = '',
		padding = '2rem',
		margin = '1rem',
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		borderRadius = '20px',
		blur = '10px',
		opacity = 0.25,
		color = '255, 255, 255' // Default to white (RGB values)
	}: Props = $props();

	// Use individual margins if provided, otherwise fall back to general margin
	const topMargin = marginTop ?? margin;
	const rightMargin = marginRight ?? margin;
	const bottomMargin = marginBottom ?? margin;
	const leftMargin = marginLeft ?? margin;

	// Convert color to RGB if it's a hex color
	function parseColor(inputColor: string): string {
		// If it's already RGB format (e.g., "255, 0, 0"), return as is
		if (inputColor.includes(',')) {
			return inputColor;
		}
		
		// If it's a hex color, convert to RGB
		if (inputColor.startsWith('#')) {
			const hex = inputColor.slice(1);
			const r = parseInt(hex.slice(0, 2), 16);
			const g = parseInt(hex.slice(2, 4), 16);
			const b = parseInt(hex.slice(4, 6), 16);
			return `${r}, ${g}, ${b}`;
		}
		
		// If it's a named color, try to handle common ones
		const colorMap: Record<string, string> = {
			red: '255, 0, 0',
			green: '0, 255, 0',
			blue: '0, 0, 255',
			purple: '128, 0, 128',
			orange: '255, 165, 0',
			pink: '255, 192, 203',
			yellow: '255, 255, 0',
			cyan: '0, 255, 255',
			magenta: '255, 0, 255'
		};
		
		return colorMap[inputColor.toLowerCase()] || '255, 255, 255';
	}

	const parsedColor = $derived(parseColor(color));
</script>

<div
	class="glass-container {className}"
	style="
		--padding: {padding};
		--margin-top: {topMargin};
		--margin-right: {rightMargin};
		--margin-bottom: {bottomMargin};
		--margin-left: {leftMargin};
		--border-radius: {borderRadius};
		--blur: {blur};
		--bg-opacity: {opacity};
		--glass-color: {parsedColor};
	"
>
	{@render children()}
</div>

<style>
	.glass-container {
		position: relative;
		backdrop-filter: blur(var(--blur));
		background: linear-gradient(135deg, 
			rgba(var(--glass-color), calc(var(--bg-opacity) * 1.2)) 0%,
			rgba(var(--glass-color), var(--bg-opacity)) 50%,
			rgba(var(--glass-color), calc(var(--bg-opacity) * 1.1)) 100%);
		border: 1px solid rgba(var(--glass-color), 0.3);
		border-radius: var(--border-radius);
		margin-top: var(--margin-top);
		margin-right: var(--margin-right);
		margin-bottom: var(--margin-bottom);
		margin-left: var(--margin-left);
		padding: var(--padding);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
		overflow: hidden;
		transition: all 0.3s ease;
		
		/* Enhanced text readability */
		color: rgba(255, 255, 255, 0.95);
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
	}

	.glass-container:hover {
		transform: translateY(-2px);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
		background: linear-gradient(135deg, 
			rgba(var(--glass-color), calc(var(--bg-opacity) * 1.3)) 0%,
			rgba(var(--glass-color), calc(var(--bg-opacity) * 1.1)) 50%,
			rgba(var(--glass-color), calc(var(--bg-opacity) * 1.2)) 100%);
	}

	/* Dark mode adjustments */
	:global(.dark) .glass-container {
		background: linear-gradient(135deg, 
			rgba(var(--glass-color), calc(var(--bg-opacity) * 1.0)) 0%,
			rgba(var(--glass-color), calc(var(--bg-opacity) * 0.8)) 50%,
			rgba(var(--glass-color), calc(var(--bg-opacity) * 0.9)) 100%);
		border: 1px solid rgba(var(--glass-color), 0.2);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
	}

	:global(.dark) .glass-container:hover {
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
		background: linear-gradient(135deg, 
			rgba(var(--glass-color), calc(var(--bg-opacity) * 1.1)) 0%,
			rgba(var(--glass-color), calc(var(--bg-opacity) * 0.9)) 50%,
			rgba(var(--glass-color), calc(var(--bg-opacity) * 1.0)) 100%);
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.glass-container {
			margin-left: 0.5rem;
			margin-right: 0.5rem;
			padding: 1.5rem;
			border-radius: 15px;
		}
	}
</style> 