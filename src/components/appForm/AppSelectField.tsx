'use client';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';
import { useCallback, useRef } from 'react';
import { useController } from 'react-hook-form';

type iProps = SelectProps & {
  name: string;
  label: string;
  options: { label: string; value: string | number }[];
  enableInfiniteScroll?: boolean;
  asynCb?: () => void;
};
const AppSelectField = ({
  name,
  label,
  options,
  value,
  enableInfiniteScroll,
  asynCb,
  ...rest
}: iProps) => {
  const { field, fieldState } = useController({
    name,
    defaultValue: '',
  });
  const { error } = fieldState;
  const selectRef = useRef<HTMLDivElement | null>(null);
  const config = {
    id: `select_${name}`,
    label: label,
    ...field,
    ...rest,
  };
  const handleScroll = useCallback(() => {
    const selectEl = selectRef.current;
    if (!selectEl) return;
    const isCloseToBottom = selectEl.scrollTop + selectEl.clientHeight;
    if (isCloseToBottom == selectEl.scrollHeight && asynCb) {
      asynCb();
    }
  }, [asynCb]);
  return (
    <FormControl fullWidth variant='outlined' error={error ? true : false}>
      <InputLabel id={`select_${name}`}>{label}</InputLabel>
      <Select {...config}>
        {enableInfiniteScroll
          ? options.map((op, i) => (
              <MenuItem value={op.value} key={i}>
                {op.label}
              </MenuItem>
            ))
          : options.map((op, i) => (
              <MenuItem value={op.value} key={i}>
                {op.label}
              </MenuItem>
            ))}
      </Select>
      {error ? <FormHelperText>{error?.message}</FormHelperText> : null}
    </FormControl>
  );
};
export default AppSelectField;
