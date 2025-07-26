import { SvgLoaderProps } from '@/types';
import { FC, lazy, memo, Suspense, SVGProps, useMemo } from 'react';

const svgCache = new Map<
  string,
  Promise<{ default: FC<SVGProps<SVGSVGElement>> }>
>();

// Function to get or create an SVG import promise
const getSvgComponent = (name: string) => {
  if (!svgCache.has(name)) {
    const svgPromise = import(`@/assets/svg/${name}.svg?react`).then(
      (module) => ({
        default: module.default as FC<SVGProps<SVGSVGElement>>,
      }),
    );
    svgCache.set(name, svgPromise);
    return svgPromise;
  }
  return svgCache.get(name)!;
};

const SvgRenderer = memo(
  ({
    name,
    width = 20,
    height = 20,
    color = 'currentColor',
    className,
  }: SvgLoaderProps) => {
    const SvgComponent = useMemo(
      () => lazy(() => getSvgComponent(name)),
      [name],
    );

    return (
      <Suspense fallback={null}>
        <SvgComponent
          width={width}
          height={height}
          stroke={color}
          className={className}
          aria-label={name}
        />
      </Suspense>
    );
  },
  // Memo comparison to prevent re-renders
  (prevProps, nextProps) =>
    prevProps.name === nextProps.name &&
    prevProps.width === nextProps.width &&
    prevProps.height === nextProps.height &&
    prevProps.color === nextProps.color &&
    prevProps.className === nextProps.className,
);

const SvgLoader = (props: SvgLoaderProps) => {
  return <SvgRenderer {...props} />;
};

export default memo(SvgLoader);
