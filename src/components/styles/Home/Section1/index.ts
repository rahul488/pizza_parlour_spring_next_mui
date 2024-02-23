import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

type iProps = {
  src: string;
};
export const StyledBox = styled(Box)<iProps>(({ theme, src }) => ({
  position: 'relative',
  height: '500px',
  filter: 'brightness(100%)',
  ':before': {
    position: 'absolute',
    background: `url(${src})`,
    content: '""',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    opacity: '0.9',
    height: '100%',
    width: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    filter: 'brightness(40%)',
  },
  ':hover': {
    transition: 'transform 0.5s ease-in-out',
    transform: 'scale(1.2)',
  },
}));
