// import { Controller, useFormContext } from 'react-hook-form';

// import { Editor } from '../../../../../crm1/crm-ui/src/components/editor';

// import type { EditorProps } from '../';

// // ----------------------------------------------------------------------

// type Props = EditorProps & {
//   name: string;
// };

// export function RHFEditor({ name, helperText, ...other }: Props) {
//   const {
//     control,
//     formState: { isSubmitSuccessful },
//   } = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <Editor
//           {...field}
//           error={!!error}
//           helperText={error?.message ?? helperText}
//           resetValue={isSubmitSuccessful}
//           {...other}
//         />
//       )}
//     />
//   );
// }
