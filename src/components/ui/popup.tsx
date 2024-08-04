import { ScrollView, View } from '@tarojs/components';

import { cn } from '@/libs/util/basic';
import { Popup as PopupView } from '@/libs/ui/popup';

import type { ScrollViewProps, ViewProps } from '@tarojs/components';
import type { PopupProps as PopupViewProps } from '@/libs/ui/popup';

type AvailablePopupProps = Pick<
  PopupViewProps,
  | 'children' | 'visible'
  | 'overlay' | 'overlayStyle' | 'overlayClassName' | 'closeOnOverlayClick'
  | 'onClose' | 'onOverlayClick'
>;

export interface PopupProps extends AvailablePopupProps {
  className?: ViewProps['className'];
  style?: ViewProps['style'];

  embedded?: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  lockScroll?: boolean;
  forceMount?: boolean;

  rootClassName?: PopupViewProps['className'];
  rootStyle?: PopupViewProps['style'];
  popupClassName?: ScrollViewProps['className'];
  popupStyle?: PopupViewProps['style'];
}

export function Popup(props: PopupProps) {
  const { className, style, children, embedded = false, forceMount = false } = props;
  const { rootClassName, rootStyle, popupClassName, popupStyle } = props;
  const { position = 'center', visible, lockScroll = true, onClose } = props;
  const { overlay = true, overlayClassName, overlayStyle } = props;
  const { closeOnOverlayClick = true, onOverlayClick } = props;

  return (
    <View className={cn(embedded ? 'ui-popup--embedded' : 'ui-popup', rootClassName)} style={rootStyle}>
      <PopupView
        className={cn('!bg-transparent', popupClassName)}
        style={popupStyle}
        position={position}
        visible={visible}
        lockScroll={lockScroll}
        overlay={overlay}
        overlayStyle={overlayStyle}
        overlayClassName={overlayClassName}
        closeOnOverlayClick={closeOnOverlayClick}
        onClose={onClose}
        onOverlayClick={onOverlayClick}
      >
        {(!forceMount || visible) ? (
          <ScrollView className={cn('ui-popup__content', className)} style={style}>
            {children}
          </ScrollView>
        ) : null}
      </PopupView>
    </View>
  );
}
