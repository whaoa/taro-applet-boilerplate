import { Image as TaroImage, View } from '@tarojs/components';

import { useCallback, useMemo, useState } from 'react';

import { cn } from '@/libs/util/basic';
import { toRealSize } from '@/libs/taro/system';

import type { ImageProps as TaroImageProps } from '@tarojs/components';
import type { CSSProperties, ReactNode } from 'react';

interface ImageProps extends TaroImageProps {
  width?: number | `${number}%` | `${number}px` | 'auto';
  height?: number | `${number}%` | `${number}px` | 'auto';
  round?: number | `${number}%` | `${number}px`;
  embedded?: boolean;
  placeholder?: ReactNode;
  filler?: ReactNode;
  fallback?: ReactNode;
}

type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

export function Image(props: ImageProps) {
  const {
    id,
    className,
    width = '100%',
    height = 'auto',
    round,
    mode,
    src,
    embedded = false,
    placeholder,
    filler,
    fallback,
    onClick,
    onLoad,
    onError,
    ...imageProps
  } = props;

  const style = useMemo(
    () => ({
      overflow: 'hidden',
      borderRadius: typeof round === 'number' ? toRealSize(round) : round,
      width: typeof width === 'number' ? toRealSize(width) : width,
      height: typeof height === 'number' ? toRealSize(height) : height,
    } satisfies CSSProperties),
    [width, height, round],
  );

  const imageFillMode = mode || (
    // When given a specific width and height,
    // try setting the default mode to 'aspectFill' to scale the image
    (style.width !== 'auto' && style.height !== 'auto') ? 'aspectFill' : undefined
  );

  const [source, setSource] = useState(src);
  const [loadingStatus, setLoadingStatus] = useState<ImageLoadingStatus>('idle');

  if (source !== src) {
    setSource(src);
    setLoadingStatus(src ? 'loading' : 'idle');
  }
  if (source && loadingStatus === 'idle') {
    setLoadingStatus('loading');
  }

  const handleLoaded: NonNullable<TaroImageProps['onLoad']> = useCallback((event) => {
    setLoadingStatus('loaded');
    onLoad?.(event);
  }, [onLoad]);

  const handleError: NonNullable<TaroImageProps['onError']> = useCallback((event) => {
    setLoadingStatus('error');
    onError?.(event);
  }, [onError]);

  return (
    <View
      id={id || ''}
      style={style}
      className={cn(
        embedded ? 'ui-image__embedded' : 'ui-image',
        `ui-image--${loadingStatus} *:w-full *:h-full`,
        style.width === 'auto' && 'max-w-max',
        className,
      )}
      onClick={onClick}
    >
      {loadingStatus === 'idle' ? (
        <View className="ui-image__placeholder">
          {placeholder ?? <View className="bg-slate-100 h-full" />}
        </View>
      ) : null}

      {loadingStatus === 'loading' ? (
        <View className="ui-image__filler">
          {filler ?? <View className="bg-slate-50 h-full" />}
        </View>
      ) : null}

      {(loadingStatus === 'loading' || loadingStatus === 'loaded') ? (
        <TaroImage
          className={cn('ui-image__image block *:max-w-none', loadingStatus === 'loading' && 'hidden')}
          mode={imageFillMode}
          src={source}
          onLoad={handleLoaded}
          onError={handleError}
          {...imageProps}
        />
      ) : null}

      {loadingStatus === 'error' ? (
        <View className="ui-image__fallback">
          {fallback ?? <View className="h-full bg-slate-200" />}
        </View>
      ) : null}
    </View>
  );
}

export interface AvatarProps extends Omit<ImageProps, 'embedded'> {
  size?: ImageProps['width'];
}

export function Avatar(props: AvatarProps) {
  const { className, size, width, height, round = '50%', ...imageProps } = props;
  return (
    <Image
      className={cn('ui-avatar', className)}
      embedded
      width={width || size}
      height={height || size}
      round={round}
      {...imageProps}
    />
  );
}
