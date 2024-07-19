import { ScrollView, View } from '@tarojs/components';

import { cn } from '@/libs/util/basic';
import { Popup as PopupView } from '@/libs/taroify/popup';

import type { ScrollViewProps, ViewProps } from '@tarojs/components';
import type { PopupBackdropProps, PopupProps as PopupViewProps } from '@/libs/taroify/popup';

type AvailablePopupProps = Pick<
  PopupViewProps,
  'children' | 'placement' | 'open' | 'defaultOpen' | 'onClose'
>;

export interface PopupProps extends AvailablePopupProps {
  className?: ViewProps['className'];
  style?: ViewProps['style'];

  embedded?: boolean;
  lockScroll?: boolean;
  forceMount?: boolean;

  withBackdrop?: boolean;
  backdropStyle?: PopupBackdropProps['style'];
  backdropClassName?: PopupBackdropProps['className'];
  closeOnBackdropClick?: boolean;
  onBackdropClick?: PopupBackdropProps['onClick'];

  rootClassName?: PopupViewProps['className'];
  rootStyle?: PopupViewProps['style'];
  popupClassName?: ScrollViewProps['className'];
  popupStyle?: PopupViewProps['style'];
}

export function Popup(props: PopupProps) {
  const { className, style, children, embedded = false, forceMount = false } = props;
  const { rootClassName, rootStyle, popupClassName, popupStyle } = props;
  const { placement = 'center', open, defaultOpen, lockScroll = true, onClose } = props;
  const { withBackdrop = true, backdropClassName, backdropStyle } = props;
  const { closeOnBackdropClick = true, onBackdropClick } = props;

  return (
    <View className={cn(embedded ? 'ui-popup--embedded' : 'ui-popup', rootClassName)} style={rootStyle}>
      <PopupView
        className={cn('!bg-transparent', popupClassName)}
        style={popupStyle}
        placement={placement}
        lock={lockScroll}
        open={open}
        defaultOpen={defaultOpen}
        onClose={onClose}
      >
        {(!forceMount || open) ? (
          <ScrollView className={cn('ui-popup__content', className)} style={style}>
            {children}
          </ScrollView>
        ) : null}

        <PopupView.Backdrop
          className={backdropClassName}
          style={backdropStyle}
          open={withBackdrop}
          closeable={closeOnBackdropClick}
          onClick={onBackdropClick}
        />
      </PopupView>
    </View>
  );
}
