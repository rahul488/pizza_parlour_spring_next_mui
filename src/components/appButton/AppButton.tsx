import Button from '@mui/material/Button';
import { ReactNode } from 'react';

const AppButton = ({ children }: { children: ReactNode }) => {
  return <Button>{children}</Button>;
};

export default AppButton;
