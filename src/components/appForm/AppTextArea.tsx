'use client';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  TextareaAutosize,
  TextareaAutosizeProps,
} from '@mui/material';
import { useController } from 'react-hook-form';

type iProps = {
  name: string;
  label: string;
  rows: number;
} & TextareaAutosizeProps;

const AppTextArea = ({ name, label, rows }: iProps) => {
  const { field, fieldState } = useController({ name, defaultValue: '' });
  const { error } = fieldState;

  const config = {
    label: label,
    ...field,
  };

  return (
    <FormControl variant='standard' fullWidth error={error ? true : false}>
      <TextareaAutosize
        id='desc'
        minRows={rows}
        {...config}
        placeholder='Enter Prodcut Description'
      />
      {error?.message ? (
        <FormHelperText>{error?.message}</FormHelperText>
      ) : null}
    </FormControl>
  );
};
export default AppTextArea;
