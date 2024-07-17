import { useForm as useHookForm, useFormContext as useHookFormContext } from 'react-hook-form';

import type { FieldValues, UseFormProps, UseFormReturn as UseHookFormReturn } from 'react-hook-form';

type PatchedUseFormReturn<T extends UseHookFormReturn<any, any, any>> = Omit<T, 'handleSubmit'> & {
  handleSubmit: (...args: Parameters<T['handleSubmit']>) => (e: any) => ReturnType<ReturnType<T['handleSubmit']>>;
};

export type UseFormReturn<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
> = PatchedUseFormReturn<
  UseHookFormReturn<TFieldValues, TContext, TTransformedValues>
>;

/**
 * Custom hook to manage the entire form.
 * @link https://react-hook-form.com/docs/useform
 */
export function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>(props?: UseFormProps<TFieldValues, TContext>) {
  const form = useHookForm<TFieldValues, TContext, TTransformedValues>(props);
  return form as UseFormReturn<TFieldValues, TContext, TTransformedValues>;
}

/**
 * This custom hook allows you to access the form context.
 * @description You need to wrap your form with FormProvider for useFormContext to work properly.
 * @link https://react-hook-form.com/docs/useformcontext
 */
export function useFormContext<
  TFieldValues extends FieldValues,
  TContext = any,
  TransformedValues extends FieldValues | undefined = undefined,
>() {
  const ctx = useHookFormContext<TFieldValues, TContext, TransformedValues>();
  return ctx as UseFormReturn<TFieldValues, TContext, TransformedValues>;
}

export { useWatch, useController } from 'react-hook-form';

export type { UseControllerReturn } from 'react-hook-form';
