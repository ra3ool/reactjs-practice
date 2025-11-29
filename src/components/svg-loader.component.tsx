import { SvgLoaderProps } from '@/types';
import { FC, lazy, memo, Suspense, SVGProps } from 'react';

// Cache stores lazy components
const svgComponentCache = new Map<string, FC<SVGProps<SVGSVGElement>>>();

// Internal: Creates or returns existing lazy component
const getLazySvgComponent = (name: string) => {
  if (!svgComponentCache.has(name)) {
    const LazyComp = lazy(async () => {
      const module = await import(`@/assets/svg/${name}.svg?react`);
      return { default: module.default as FC<SVGProps<SVGSVGElement>> };
    });
    svgComponentCache.set(name, LazyComp);
  }
  return svgComponentCache.get(name)!;
};

// Preload function: loads and caches immediately
const preloadSvg = async (name: string) => {
  if (!svgComponentCache.has(name)) {
    const module = await import(`@/assets/svg/${name}.svg?react`);
    const Comp: FC<SVGProps<SVGSVGElement>> = (props) => (
      <module.default {...props} />
    );
    svgComponentCache.set(name, Comp);
  }
};

const SvgRenderer: FC<SvgLoaderProps> = memo(
  ({ name, width = 20, height = 20, color = 'currentColor', className }) => {
    const SvgComponent = getLazySvgComponent(name);
    return (
      <Suspense fallback={null}>
        <SvgComponent
          width={width}
          height={height}
          stroke={color}
          color={color}
          className={className}
          aria-label={name}
        />
      </Suspense>
    );
  },
  (prev, next) =>
    prev.name === next.name &&
    prev.width === next.width &&
    prev.height === next.height &&
    prev.color === next.color &&
    prev.className === next.className,
);

// Extended type for static preload
interface SvgLoaderComponent extends FC<SvgLoaderProps> {
  preload: (name: string) => Promise<void>;
}

// Memoize first, then cast safely to SvgLoaderComponent
export const SvgLoader = memo((props: SvgLoaderProps) => (
  <SvgRenderer {...props} />
)) as unknown as SvgLoaderComponent;

// Attach the preload method
SvgLoader.preload = preloadSvg;
