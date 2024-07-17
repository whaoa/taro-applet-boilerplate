import { Controller } from 'react-hook-form';

import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import type { PartialByKeys } from '@/types/utility';

/**
 * A wrapper component for controlled inputs
 * @description add support for passing render prop as children
 * @link https://react-hook-form.com/docs/usecontroller/controller
 * @param props
 */
export function FormController<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: (
    & PartialByKeys<ControllerProps<TFieldValues, TName>, 'render'>
    & { children: ControllerProps<TFieldValues, TName>['render'] }
  ),
) {
  const { children, render, ...otherProps } = props;
  return <Controller {...otherProps} render={render || children} />;
}

export { Controller, FormProvider } from 'react-hook-form';
