import { getCurrentPages } from '@tarojs/taro';
import { Text, View } from '@tarojs/components';

import { useCallback, useMemo, useState } from 'react';

import { PLATFORM } from '@/constants/taro';
import { HOME_ROUTE_PATH } from '@/constants/option';
import { cn } from '@/libs/util/basic';
import { toRealPixel, toRelativeSize } from '@/libs/taro/system';
import { useNavigationLayout, useViewport } from '@/hooks/system';
import { useRoute, useRouter } from '@/hooks/router';
import { Image } from '@/components/ui/image';
import { SafeAreaInset } from '@/components/ui/safe-area';

import type { ViewProps } from '@tarojs/components';
import type { PropsWithChildren } from 'react';
import type { PropsWithClassName } from '@/types/react';

type Style = Exclude<NonNullable<ViewProps['style']>, string>;
type Background = NonNullable<Style['background']>;

// back icon data-url (from remix-icon: https://remixicon.com/icon/arrow-left-s-line)
const backIcon = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAACToAAAk6AGCYwUcAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAASZJREFUaIHt2UFqAlEQhOGqkFzIu2STi7hRIuQSnsCFN8pJskhCZREFESME7O6i7R/e9rWfbwZGh5JwTz1Uf4DsBty9AXdvwN0bcPcG3L0Bd88KTHJF8jlyxmPk5v+J5BLAG4Bvkk+SdiGDJJUvAEsAOllfAF5CZhlgX8+wx/UJYNEKfOFkT9cWANuAK7Bl4CpsCbgSmw6uxqaCAWyqsWlgF2wK2AkbDnbDhoIdsWFgV2wI2BkrKeT38EfAnrcr6JIuf8BIu6Td0bGbG6LjB5ihc4YYofO+WRN0GtgFnQp2QKeDq9El4Ep0GbgKXQo+oDd/gPv9EX/lpPu+armADsNK+r1HXCK5BvAuaR82wwmckdUL8YwG3L0Bd2/A3Rtw9wbcvQF37webGaSaIwEGjQAAAABJRU5ErkJggg==`;
const backIconSize = 30;
const needCustomBackIcon = PLATFORM !== 'tt';
const isCenteredNavigation = PLATFORM !== 'tt';

interface PageHeaderProps extends PropsWithChildren {
  background?: Background;
  showBack?: boolean;
  onBackClick?: () => void;
}

function PageHeader(props: PageHeaderProps) {
  const { children, background = 'white', showBack = true, onBackClick } = props;

  const viewport = useViewport();
  const navigation = useNavigationLayout();

  const style = useMemo<Style>(
    () => {
      const pl = toRelativeSize(navigation.left, viewport);
      const pr = toRelativeSize(viewport.windowWidth - navigation.right, viewport);

      const margin = 10;
      const left = pl + (needCustomBackIcon ? backIconSize : 0) + margin;
      const right = margin + pr;
      const space = Math.max(left, right);

      return {
        'boxSizing': 'border-box',
        'width': '100%',
        'height': `${toRealPixel(navigation.height, viewport)}px`,
        'paddingLeft': `${toRealPixel(isCenteredNavigation ? space : left, viewport)}px`,
        'paddingRight': `${toRealPixel(isCenteredNavigation ? space : right, viewport)}px`,
        '--nav-padding-left': `${toRealPixel(pl, viewport)}px`,
        '--nav-padding-right': `${toRealPixel(isCenteredNavigation ? pl : pr, viewport)}px`,
      };
    },
    [viewport, navigation],
  );

  if (navigation.mode === 'default') {
    return null;
  }

  return (
    <View className="feat-page__header" style={{ background }}>
      <View className="feat-page__header-placement w-full">
        <SafeAreaInset className="feat-page__safe-area-inset--top" position="top" />
        <View className="feat-page__header-content" style={style} />
      </View>

      <View className="feat-page__header-fixed fixed top-0 left-0 w-full h-max">
        <SafeAreaInset className="feat-page__safe-area-inset--top" position="top" />
        <View className="feat-page__header-content relative" style={style}>
          {(needCustomBackIcon && showBack) ? (
            <View
              className="absolute top-0 bottom-0 m-auto w-max h-max"
              style={{ left: 'var(--nav-padding-left)' }}
              onClick={onBackClick}
            >
              <Image width={backIconSize} height={backIconSize} src={backIcon} />
            </View>
          ) : null}
          <View className="relative h-full">
            {typeof children === 'string' ? (
              <View
                className={cn(
                  'flex items-center overflow-hidden w-full h-full font-bold text-base text-slate-800',
                  isCenteredNavigation && 'justify-center',
                )}
              >
                <Text className="truncate">{children}</Text>
              </View>
            ) : children}
          </View>
        </View>
      </View>
    </View>
  );
}

interface PageProps extends PropsWithClassName, PropsWithChildren {
  title?: PageHeaderProps['children'];
  headerBackground?: PageHeaderProps['background'];
  background?: Background;
}

export function Page(props: PageProps) {
  const { className, children, title, headerBackground, background } = props;

  const route = useRoute();
  const router = useRouter();
  const windowHeight = useViewport().windowHeight;

  const [pages] = useState(() => getCurrentPages().length);
  const showBack = pages > 1 || route.path !== HOME_ROUTE_PATH;

  const handleBackClick = useCallback(() => {
    router.back(1, { path: HOME_ROUTE_PATH });
  }, [router]);

  return (
    <View
      className={cn('feat-page overflow-auto', className)}
      style={{ background, minHeight: `${windowHeight}px` }}
    >
      <PageHeader background={headerBackground} showBack={showBack} onBackClick={handleBackClick}>
        {title}
      </PageHeader>

      <View className="feat-page__body">
        {children}
      </View>

      <SafeAreaInset className="feat-page__safe-area-inset--bottom" position="bottom" />
    </View>
  );
}
