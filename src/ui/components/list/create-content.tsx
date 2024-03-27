import { Formik } from "formik";

type CreateContentProps = {
  children: React.ReactNode,
  onSubmit: (toSave: unknown | any) => void,
}

export function CreateContent({ onSubmit, children }: CreateContentProps) {
  return (
    <Formik
      initialValues={{}}
      onSubmit={(values, actions) => {
        onSubmit(values)
        actions.resetForm();
        actions.setSubmitting(false);
      }}
    >
      {children}
    </Formik >

  )
}
