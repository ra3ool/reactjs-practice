import { SvgLoaderProps } from '@/types';
import { lazy, memo, Suspense } from 'react';

const SvgRenderer = ({
  name,
  width = 20,
  height = 20,
  color = 'currentColor',
  className,
}: SvgLoaderProps) => {
  const SvgComponent = lazy(() =>
    import(`@/assets/svg/${name}.svg?react`).then((module) => ({
      default: module.default as React.FC<React.SVGProps<SVGSVGElement>>,
    })),
  );

  return (
    <Suspense>
      <SvgComponent
        width={width}
        height={height}
        stroke={color}
        className={className}
        aria-label={name}
      />
    </Suspense>
  );
};

const SvgLoader = (props: SvgLoaderProps) => {
  return <SvgRenderer key={props.name} {...props} />;
};

export default memo(SvgLoader);
