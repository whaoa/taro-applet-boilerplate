import { View } from '@tarojs/components';

import { cn } from '@/libs/util/basic';
import { Image } from '@/components/ui/image';
import { Popup } from '@/components/ui/popup';

import type { ReactNode } from 'react';
import type { PopupProps } from '@/components/ui/popup';

// close icon data-url (from remix-icon: https://remixicon.com/icon/close-line)
const closeIconImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z'%3E%3C/path%3E%3C/svg%3E`;

type AvailablePopupProps = Pick<
  PopupProps,
  | 'className' | 'children'
  | 'embedded' | 'open' | 'defaultOpen' | 'forceMount' | 'rootClassName'
  | 'closeOnBackdropClick' | 'onClose'
>;

export interface ModalProps extends AvailablePopupProps {
  title?: ReactNode;
  closeable?: boolean;
  TitleClassName?: string;
}

export function Modal(props: ModalProps) {
  const { className, children, rootClassName } = props;
  const { embedded, open, defaultOpen, forceMount } = props;
  const { closeOnBackdropClick = false, onClose } = props;
  const { title, TitleClassName, closeable = true } = props;

  const isTitleVisible = title || closeable;

  return (
    <Popup
      className="rounded-md bg-white shadow-xl"
      rootClassName={cn(embedded ? 'ui-modal--embedded' : 'ui-modal', rootClassName)}
      popupClassName="w-4/5"
      embedded
      placement="center"
      forceMount={forceMount}
      open={open}
      defaultOpen={defaultOpen}
      backdropClassName="!bg-black/60"
      closeOnBackdropClick={closeOnBackdropClick}
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
              onClick={() => onClose?.(false)}
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
