// components/shared/AppForm.tsx

import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import Box from "@mui/material/Box";

interface AppFormProps {
  children: ReactNode;
  onSubmit: () => void;
}

const AppForm = ({ children, onSubmit }: AppFormProps) => {
  return (
    <form onSubmit={onSubmit} noValidate>
      <Box
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
      >
        {children}
      </Box>
    </form>
  );
};

export default AppForm;
