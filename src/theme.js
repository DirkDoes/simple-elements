const DEFAULT_PRIMARY = '#2563eb';

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const normalizeHex = (value) => {
  if (typeof value !== 'string' || !/^#[\da-f]{3}(?:[\da-f]{3})?$/i.test(value)) {
    throw new TypeError('primary must be a 3- or 6-digit hex color');
  }
  const hex = value.toLowerCase();
  return hex.length === 4 ? `#${[...hex.slice(1)].map((channel) => channel + channel).join('')}` : hex;
};

const hexToRgb = (hex) => [...hex.slice(1)].reduce((channels, channel, index) => {
  if (index % 2 === 0) channels.push(Number.parseInt(`${channel}${hex[index + 2]}`, 16) / 255);
  return channels;
}, []);

const rgbToHex = (rgb) => `#${rgb.map((channel) => Math.round(clamp(channel) * 255).toString(16).padStart(2, '0')).join('')}`;
const srgbToLinear = (channel) => channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
const linearToSrgb = (channel) => channel <= .0031308 ? channel * 12.92 : 1.055 * (Math.max(0, channel) ** (1 / 2.4)) - .055;

const rgbToOklch = (hex) => {
  const [red, green, blue] = hexToRgb(hex).map(srgbToLinear);
  const lightness = .4122214708 * red + .5363325363 * green + .0514459929 * blue;
  const greenCone = .2119034982 * red + .6806995451 * green + .1073969566 * blue;
  const blueCone = .0883024619 * red + .2817188376 * green + .6299787005 * blue;
  const l = Math.cbrt(lightness);
  const m = Math.cbrt(greenCone);
  const s = Math.cbrt(blueCone);
  const a = 1.9779984951 * l - 2.428592205 * m + .4505937099 * s;
  const b = .0259040371 * l + .7827717662 * m - .808675766 * s;
  return {
    l: .2104542553 * l + .793617785 * m - .0040720468 * s,
    c: Math.hypot(a, b),
    h: (Math.atan2(b, a) * 180 / Math.PI + 360) % 360,
  };
};

const oklchToRgb = ({ l, c, h }) => {
  const radians = h * Math.PI / 180;
  const a = c * Math.cos(radians);
  const b = c * Math.sin(radians);
  const lightness = l + .3963377774 * a + .2158037573 * b;
  const greenCone = l - .1055613458 * a - .0638541728 * b;
  const blueCone = l - .0894841775 * a - 1.291485548 * b;
  const lightnessCubed = lightness ** 3;
  const greenConeCubed = greenCone ** 3;
  const blueConeCubed = blueCone ** 3;
  return [
    4.0767416621 * lightnessCubed - 3.3077115913 * greenConeCubed + .2309699292 * blueConeCubed,
    -1.2684380046 * lightnessCubed + 2.6097574011 * greenConeCubed - .3413193965 * blueConeCubed,
    -.0041960863 * lightnessCubed - .7034186147 * greenConeCubed + 1.707614701 * blueConeCubed,
  ].map(linearToSrgb);
};

const oklchToHex = (lch) => {
  const l = clamp(lch.l);
  const c = Math.max(0, lch.c);
  let rgb = oklchToRgb({ ...lch, l, c });
  if (rgb.some((channel) => channel < 0 || channel > 1)) {
    let low = 0;
    let high = c;
    for (let attempt = 0; attempt < 14; attempt += 1) {
      const midpoint = (low + high) / 2;
      const candidate = oklchToRgb({ ...lch, l, c: midpoint });
      if (candidate.every((channel) => channel >= 0 && channel <= 1)) {
        low = midpoint;
        rgb = candidate;
      } else {
        high = midpoint;
      }
    }
  }
  return rgbToHex(rgb);
};

const relativeLuminance = (hex) => hexToRgb(hex).map(srgbToLinear).reduce((total, channel, index) => total + channel * [0.2126, 0.7152, 0.0722][index], 0);
const darkTextLuminance = relativeLuminance('#0f172a');
const contrastFor = (hex) => {
  const luminance = relativeLuminance(hex);
  const whiteContrast = 1.05 / (luminance + .05);
  const darkContrast = (luminance + .05) / (darkTextLuminance + .05);
  return whiteContrast >= Math.max(3.5, darkContrast - 1.35) ? '#ffffff' : '#0f172a';
};
const mix = (first, second, amount) => {
  const one = hexToRgb(first);
  const two = hexToRgb(second);
  return rgbToHex(one.map((channel, index) => channel * amount + two[index] * (1 - amount)));
};

const makePalette = (primary) => {
  const base = normalizeHex(primary);
  const source = rgbToOklch(base);
  const tone = (l, c = source.c) => oklchToHex({ l, c, h: source.h });
  const lightBase = base;
  const lightHover = tone(source.l - .04, source.c * .95);
  const lightDeep = tone(source.l - .1, source.c * .85);
  const lightSoft = tone(source.l + (0.97 - source.l) * .96, source.c * .1);
  const lightText = lightHover;
  const lightBorder = tone(source.l + (0.97 - source.l) * .75, source.c * .2);
  const darkBase = tone(Math.min(.72, source.l + .08), source.c * .85);
  const darkHover = tone(Math.min(.8, source.l + .15), source.c * .7);
  const darkDeep = tone(Math.max(.18, source.l - .14), source.c * .7);
  const darkSoft = mix(darkBase, '#0f172a', .35);
  const darkText = tone(Math.min(.84, source.l + .2), source.c * .5);
  const darkBorder = tone(Math.min(.78, source.l + .04), source.c * .6);

  return {
    light: { base: lightBase, hover: lightHover, soft: lightSoft, text: lightText, border: lightBorder, deep: lightDeep, contrast: contrastFor(lightBase) },
    dark: { base: darkBase, hover: darkHover, soft: darkSoft, text: darkText, border: darkBorder, deep: darkDeep, contrast: contrastFor(darkBase) },
  };
};

export const primaryTheme = (primary = DEFAULT_PRIMARY) => makePalette(primary);

export const setBrandTheme = ({ primary = DEFAULT_PRIMARY } = {}) => {
  const palette = primaryTheme(primary);
  const root = document.documentElement;
  for (const [mode, tokens] of Object.entries(palette)) {
    for (const [role, value] of Object.entries(tokens)) root.style.setProperty(`--se-primary-${mode}${role === 'base' ? '' : `-${role}`}`, value);
  }
  return palette;
};
