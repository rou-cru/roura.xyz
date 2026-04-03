import StyleDictionary from 'style-dictionary';
import type { Config, TransformedToken } from 'style-dictionary/types';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ESM path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const config: Config = {
	source: [join(projectRoot, 'design-system/tokens/**/*.json')],
	platforms: {
		css: {
			transformGroup: 'css',
			transforms: ['attribute/cti', 'name/tailwind-v4', 'color/css'],
			buildPath: 'src/styles/',
			files: [
				{
					destination: 'tokens.css',
					format: 'css/tailwind-theme',
					options: {
						outputReferences: true
					}
				}
			]
		}
	},
	log: {
		verbosity: 'verbose' // Force verbose logging to see what SD is doing
	}
};

(async () => {
	try {
		console.log('Starting Token Build...');
		console.log(`Project Root: ${projectRoot}`);
		console.log(`Source Pattern: ${config.source?.[0]}`);

		const sd = new StyleDictionary(config);

		// 1. Register Format
		await sd.registerFormat({
			name: 'css/tailwind-theme',
			format: async ({ dictionary }) => {
				const header = `/**\n * Do not edit directly, this file was auto-generated.\n * Generated on ${new Date().toUTCString()}\n */\n\n`;
				const tokens = dictionary.allTokens
					.map((token) => `	${token.name}: ${token.value};`)
					.join('\n');
				return `${header}@theme {\n${tokens}\n}\n`;
			}
		});

		// 2. Register Transform
		await sd.registerTransform({
			name: 'name/tailwind-v4',
			type: 'name',
			transform: (token: TransformedToken) => {
				const { category, type, item } = token.attributes || {};
				const path = token.path;

				// Spacing: size.space.4 -> --space-4
				if (category === 'size' && type === 'space') return `--space-${item}`;
				if (category === 'size' && type === 'radius') return `--radius-${item}`;
				if (category === 'size' && type === 'border') return `--border-width`;

				// Typography Primitives
				if (category === 'font' && type === 'size') return `--font-size-${item}`;
				if (category === 'font' && type === 'family') return `--font-family-${item}`;

				// Typography Semantics: text.display.family -> --font-display
				if (path[0] === 'text' && path.length === 3) {
					const role = path[1];
					const property = path[2];
					if (property === 'family') return `--font-${role}`;
					if (property === 'size') return `--text-${role}-size`;
					if (property === 'leading') return `--text-${role}-leading`;
					if (property === 'tracking') return `--text-${role}-tracking`;
					if (property === 'weight') return `--text-${role}-weight`;
				}

				// Colors
				if (category === 'color') {
					if (type === 'bg' && item === 'base') return '--color-base';
					if (type === 'bg' && item === 'surface') return '--color-surface';
					if (type === 'bg' && item === 'surface-elevated') return '--color-surface-elevated';
					if (type === 'border' && item === 'default') return '--color-border';
					if (type === 'text') return `--color-text-${item}`;
					if (type === 'accent') {
						if (item === 'main') return '--color-accent';
						return `--color-accent-${item}`;
					}
					return `--color-${type}-${item}`;
				}

				// Motion
				if (category === 'motion') {
					if (type === 'duration') return `--duration-${item}`;
					if (type === 'ease') return `--ease-${item}`;
					return `--motion-${type}-${item}`;
				}

				return `--${token.path.join('-')}`;
			}
		});
		// Build
		await sd.buildAllPlatforms();
		console.log('Build completed successfully.');
	} catch (error) {
		console.error('Build failed:', error);
		process.exit(1);
	}
})();
