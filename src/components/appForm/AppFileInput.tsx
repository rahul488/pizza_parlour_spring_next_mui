import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from '@mui/material';
import { useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

type iProps = {
  name: string;
  label: string;
} & InputProps;

const AppFileInput = ({ name, label }: iProps) => {
  const { field, fieldState } = useController({ name, defaultValue: '' });
  const { error } = fieldState;
  const [selectedFile, setSelectedFile] = useState(null);
  const { setValue } = useFormContext();
  const imageRef = useRef<any>(null);

  const config = {
    id: `file_input_${name}`,
    label: label,
    ...field,
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setValue(name, file, { shouldValidate: true });
    setSelectedFile(file);
    imageRef.current = file;
  };

  return (
    <FormControl error={error ? true : false} variant='outlined'>
      <FormLabel id={`file_input_${name}`}>{label}</FormLabel>
      <Input
        type='file'
        {...config}
        onChange={handleFileChange}
        value={imageRef.current?.value}
      />
      {error ? <FormHelperText>{error?.message}</FormHelperText> : null}
    </FormControl>
  );
};
export default AppFileInput;
