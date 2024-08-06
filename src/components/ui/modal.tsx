import { View } from '@tarojs/components';

import { cn } from '@/libs/util/basic';
import { Image } from '@/components/ui/image';
import { Popup } from '@/components/ui/popup';

import type { ReactNode } from 'react';
import type { PopupProps } from '@/components/ui/popup';

// close icon data-url (from remix-icon: https://remixicon.com/icon/close-line)
const closeIconImage = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAABibAAAYmwFJdYOUAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAASFJREFUWIXt18FuwjAMgOHfvAAR70Wv7LS9LlCxFxqTd1iQQgVtnDiAUCzlUuH6k1O3QVSVV47VswFL0YG10YG10YG18V5AEdmKSCgtJiJBRLamJFXNWsAH8AN8A5vcvCR/DRyAX+ArOy/z5gNwBjSuIxAMuBBzLvlnYPAEroF9UkBzO5l0Ls095e6CdYtMyFqcCWhFeuDMwJnCV0gvXBFwCemJKwZGZADGCeQ4mVbzxLsBZzrp0jkX4AKyGqeqTb/F4nKXxltc9FlsOSTjjWuPH5I7nZt7zRR30hVn+U0ToKWwF7IJzhPZDOeFzAVOD6yjZTJvTLzvgTUW2eF35P90fwaTTpa/0/47mdW5y5KY+LLxXv+LnxEdWBsdWBsdWBt/9fc8geSpVIAAAAAASUVORK5CYII=`;

type AvailablePopupProps = Pick<
  PopupProps,
  | 'className' | 'children'
  | 'embedded' | 'visible' | 'forceMount' | 'rootClassName'
  | 'closeOnOverlayClick' | 'onClose'
>;

export interface ModalProps extends AvailablePopupProps {
  title?: ReactNode;
  closeable?: boolean;
  TitleClassName?: string;
}

export function Modal(props: ModalProps) {
  const { className, children, rootClassName } = props;
  const { embedded, visible, forceMount } = props;
  const { closeOnOverlayClick: closeOnBackdropClick = false, onClose } = props;
  const { title, TitleClassName, closeable = true } = props;

  const isTitleVisible = title || closeable;

  return (
    <Popup
      className="rounded-md bg-white shadow-xl"
      rootClassName={cn(embedded ? 'ui-modal--embedded' : 'ui-modal', rootClassName)}
      popupClassName="w-4/5"
      embedded
      position="center"
      forceMount={forceMount}
      visible={visible}
      overlayClassName="!bg-black/60"
      closeOnOverlayClick={closeOnBackdropClick}
      onClose={onClose}
    >
      {isTitleVisible ? (
        <View
          className={cn(
            'ui-modal__title flex items-center px-4 font-bold text-base text-slate-900',
            title ? 'py-3' : 'py-2',
            TitleClassName,
          )}
        >
          <View className="flex-1">{title}</View>
          {closeable ? (
            <Image
              className="shrink-0"
              src={closeIconImage}
              width={20}
              height={20}
              onClick={onClose}
            />
          ) : null}
        </View>
      ) : null}
      <View
        className={cn(
          'ui-modal__content px-4 pb-3 text-base text-slate-900',
          !isTitleVisible && 'pt-3',
          className,
        )}
      >
        {children}
      </View>
    </Popup>
  );
}
