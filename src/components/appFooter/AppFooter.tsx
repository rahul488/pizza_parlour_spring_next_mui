import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CopyrightIcon from '@mui/icons-material/Copyright';

const AppFooter = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        background: 'orange',
        zIndex: '10000',
      }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <CopyrightIcon />
        <Typography variant='body2'>
          {new Date().getFullYear()} - Created And Designed By The Pizza Parlors
        </Typography>
      </Box>
    </Box>
  );
};
export default AppFooter;
