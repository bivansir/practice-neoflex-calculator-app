import { useForm, FormProvider, type DefaultValues, type FieldValues } from 'react-hook-form'
import { render } from '@testing-library/react'
import type { ReactNode } from 'react'

const FormWrapper = <T extends FieldValues>({
  children,
  defaultValues,
}: {
  children: ReactNode
  defaultValues?: DefaultValues<T>
}) => {
  const methods = useForm<T>({ defaultValues })
  return <FormProvider {...methods}>{children}</FormProvider>
}

const FormWithSubmitWrapper = <T extends FieldValues>({
  children,
  defaultValues,
}: {
  children: ReactNode
  defaultValues?: DefaultValues<T>
}) => {
  const methods = useForm<T>({ defaultValues, mode: 'onSubmit' })
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => {})}>
        {children}
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  )
}

export const renderWithForm = <T extends FieldValues>(
  ui: ReactNode,
  defaultValues?: DefaultValues<T>
) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <FormWrapper defaultValues={defaultValues}>{children}</FormWrapper>
    ),
  })
}

export const renderWithFormSubmit = <T extends FieldValues>(
  ui: ReactNode,
  defaultValues?: DefaultValues<T>
) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <FormWithSubmitWrapper defaultValues={defaultValues}>
        {children}
      </FormWithSubmitWrapper>
    ),
  })
}