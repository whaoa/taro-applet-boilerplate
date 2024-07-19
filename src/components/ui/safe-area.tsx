import { View } from '@tarojs/components';

import { cn } from '@/libs/util/basic';
import { useSafeAreaInsets } from '@/hooks/system';

import type { ViewProps } from '@tarojs/components';

type AvailableTaroViewProps = Omit<ViewProps, 'style' | 'children'>;

export interface SafeAreaInsetProps extends AvailableTaroViewProps {
  position: keyof ReturnType<typeof useSafeAreaInsets>;
}

export function SafeAreaInset(props: SafeAreaInsetProps) {
  const { className, position, ...restProps } = props;
  const size = useSafeAreaInsets()[position];
  return (
    <View
      className={cn(`ui-safe-area-inset ui-safe-area-inset--${position}`, className)}
      style={{ width: '100%', height: `${size}px` }}
      {...restProps}
    />
  );
}
