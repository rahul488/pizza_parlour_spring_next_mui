'use client';
import { Box, FormLabel, TextField, TextFieldProps } from '@mui/material';
import { useController } from 'react-hook-form';

type iProps = {
  name: string;
} & TextFieldProps;

const AppTextField = ({ name, label, type, ...rest }: iProps) => {
  const { field, fieldState } = useController({ name, defaultValue: '' });
  const { error } = fieldState;

  const config = {
    id: `text_input_${name}`,
    type: type,
    label: label,
    ...field,
    ...rest,
  };

  return (
    <TextField
      variant='outlined'
      {...config}
      error={error ? true : false}
      helperText={error ? error?.message : ''}
    />
  );
};
export default AppTextField;
