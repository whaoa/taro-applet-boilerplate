import { Button, View } from '@tarojs/components';

import { createContext, useCallback, useContext, useState } from 'react';

import { cn } from '@/libs/util/basic';
import { useEventCallback } from '@/hooks/callback';
import { Modal } from '@/components/ui/modal';

import type { PropsWithChildren, ReactNode } from 'react';
import type { ModalProps } from '@/components/ui/modal';

interface DialogContextValue {
  onCancel?: () => (void | Promise<void>);
  onConfirm?: () => (void | Promise<void>);
}

const DialogContext = createContext<DialogContextValue>({});

export interface DialogProps extends ModalProps {
  onCancel?: () => (void | Promise<void>);
  onConfirm?: () => (void | Promise<void>);
}

export function Dialog(props: DialogProps) {
  const {
    children,
    embedded,
    onClose,
    onCancel,
    onConfirm,
    ...modalProps
  } = props;

  const handleCancel = useEventCallback(() => (
    Promise.resolve(onCancel?.()).then(() => onClose?.())
  ));
  const handleConfirm = useEventCallback(() => (
    Promise.resolve(onConfirm?.()).then(() => onClose?.())
  ));
  const [context] = useState<DialogContextValue>(() => ({
    onCancel: handleCancel,
    onConfirm: handleConfirm,
  }));

  return (
    <DialogContext.Provider value={context}>
      <Modal
        rootClassName={embedded ? 'ui-dialog--embedded' : 'ui-dialog'}
        onClose={onClose}
        {...modalProps}
      >
        {children}
      </Modal>
    </DialogContext.Provider>
  );
}

interface DialogFooterProps extends PropsWithChildren {
  className?: string;
}

export function DialogFooter(props: DialogFooterProps) {
  const { className, children } = props;
  return (
    <View className={cn('ui-dialog__footer flex items-center justify-end mt-3', className)}>
      {children}
    </View>
  );
}

interface DialogActionProps {
  className?: string;
  children?: ReactNode | ((onClick: () => void) => ReactNode);
  type: 'cancel' | 'confirm';
  asChild?: boolean;
}

export function DialogAction(props: DialogActionProps) {
  const { className, children, type, asChild = false } = props;

  const ctx = useContext(DialogContext);

  const onClick = useCallback(() => {
    const handler = type === 'confirm' ? ctx.onConfirm : ctx.onCancel;
    return handler?.();
  }, [type, ctx]);

  if (!type) {
    return null;
  }

  if (!asChild) {
    if (typeof children === 'function') {
      return null;
    }
    const defaultButtonClassName = cn(
      `ui-dialog__action ui-dialog__action--${type}`,
      'm-0 ml-2 rounded-md px-3 py-1 w-max h-max font-bold text-sm after:hidden',
      type === 'cancel' && 'text-slate-900 bg-white hover:bg-gray-100 focus:bg-gray-100 active:!bg-gray-100 active:!text-slate-900',
      type === 'confirm' && 'text-white bg-orange-500 hover:bg-orange-400 focus:bg-orange-400 active:!bg-orange-400 active:!text-white',
      className,
    );
    return (
      <Button className={defaultButtonClassName} onClick={onClick}>
        {children}
      </Button>
    );
  }

  if (typeof children !== 'function') {
    return null;
  }
  return children(onClick);
}
