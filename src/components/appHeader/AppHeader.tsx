'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { MobileMenu, StyledIconBoxWrapper } from '../styles/appHeader';
import { StyledIcon, StyledLink } from '../styles/common/index';
import { signOut, useSession } from 'next-auth/react';
import { useCartStore } from '@/store/store';
import useAxios from '@/hooks/axios/useAxios';
import { AUTH_APIS } from '@/utils/services/apiService';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';

type appHeaderProps = {
  setOpen: () => void;
  open: boolean;
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
};

const AppHeader = ({
  open,
  setOpen,
  mode,
  toggleColorMode,
}: appHeaderProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const { products, removeAll, addAll } = useCartStore();
  const session = useSession();
  const { get } = useAxios();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getCartDetails = React.useCallback(async () => {
    const res = await get(AUTH_APIS['getCartDetails']);
    if (res && res?.status) {
      addAll(res?.data);
    }
  }, []); // eslint-disable-line

  React.useEffect(() => {
    if (session.status === 'authenticated') {
      getCartDetails();
    }
  }, [session, getCartDetails]);

  React.useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  const handleLogout = async () => {
    await removeAll();
    signOut();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='sticky' elevation={10} color='transparent'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, fontWeight: 'bold' }}
          >
            The Pizza Parlor
          </Typography>

          {session.status === 'authenticated' ? (
            <>
              <StyledIconBoxWrapper>
                <Box>
                  <Tooltip title='My Account'>
                    <StyledIcon onClick={handleClick}>
                      <AccountCircleIcon />
                    </StyledIcon>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    id='account-menu'
                    open={openMenu}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        transition: '0.5s ease-in-out',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&::before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem>
                      <StyledLink href='/home/account'>Profile</StyledLink>
                    </MenuItem>
                    <MenuItem>
                      <StyledLink href='/home/orders'>My Orders</StyledLink>
                    </MenuItem>
                  </Menu>
                </Box>
                <Tooltip title='My Cart'>
                  <StyledLink href='/home/cart'>
                    <StyledIcon>
                      <Badge badgeContent={products.length} color='success'>
                        <ShoppingBagIcon color='action' />
                      </Badge>
                    </StyledIcon>
                  </StyledLink>
                </Tooltip>
                {/* <StyledLink href="/home/wishlist">
                  <StyledIcon>
                    <FavoriteIcon />
                  </StyledIcon>
                </StyledLink> */}
                <Tooltip title='Mode'>
                  <StyledIcon onClick={toggleColorMode}>
                    {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
                  </StyledIcon>
                </Tooltip>
                <Tooltip title='Logout'>
                  <StyledIcon onClick={handleLogout}>
                    <ExitToAppIcon titleAccess='Logout' />
                  </StyledIcon>
                </Tooltip>
              </StyledIconBoxWrapper>
              <MobileMenu onClick={setOpen}>
                <MenuIcon />
              </MobileMenu>
            </>
          ) : (
            <Tooltip title='Mode'>
              <StyledIcon onClick={toggleColorMode}>
                {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
              </StyledIcon>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default AppHeader;
