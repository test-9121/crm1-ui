// import { Controller, useFormContext } from 'react-hook-form';

// import { PhoneInput } from '../../../../../crm1/crm-ui/src/components/phone-input';

// import type { PhoneInputProps } from '../../../../../crm1/crm-ui/src/components/phone-input';

// // ----------------------------------------------------------------------

// type Props = Omit<PhoneInputProps, 'value' | 'onChange'> & {
//   name: string;
// };

// export function RHFPhoneInput({ name, helperText, ...other }: Props) {
//   const { control, setValue } = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <PhoneInput
//           {...field}
//           fullWidth
//           value={field.value}
//           onChange={(newValue) => setValue(name, newValue, { shouldValidate: true })}
//           error={!!error}
//           helperText={error ? error?.message : helperText}
//           {...other}
//         />
//       )}
//     />
//   );
// }
