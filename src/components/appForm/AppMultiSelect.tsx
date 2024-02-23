import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

type iProps = {
  name: string;
  label: string;
  options: [{ label: string; value: string }];
};

const AppMultiSelect = ({ name, options, label }: iProps) => {
  const { field, fieldState } = useController({ name, defaultValue: [] });
  const { error } = fieldState;
  const { value: selectValue, onChange: handleChange, onBlur } = field;
  return (
    <FormControl fullWidth variant='standard' error={error ? true : false}>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        placeholder={label}
        {...field}
        options={options}
      />
      {error ? <FormHelperText>{error?.message}</FormHelperText> : null}
    </FormControl>
  );
};
export default AppMultiSelect;
