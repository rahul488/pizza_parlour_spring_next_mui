'use client';
import React, { ReactNode, useRef, useState } from 'react';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import { StyledIcon, StyledLink } from '../styles/common';
import {
  StyledListButton,
  StyledListButtonSubMenu,
  StyledSidebar,
} from '../styles/appSidebar';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import IcecreamIcon from '@mui/icons-material/Icecream';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import { useClickOutSide } from '@/hooks';
import { signOut } from 'next-auth/react';
import ExitToApp from '@mui/icons-material/ExitToApp';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

type appSidebarProps = {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
};

const Menus = [
  {
    text: 'Home',
    icon: <HomeIcon />,
    link: '/home',
  },
  {
    text: 'Category',
    submenu: [
      {
        text: 'Pizza',
        icon: <LocalPizzaIcon />,
        link: '/home/product/pizza',
      },
      {
        text: 'Sides',
        icon: <RamenDiningIcon />,
        link: '/home/product/sides',
      },
      {
        text: 'Desserts',
        icon: <IcecreamIcon />,
        link: '/home/product/desserts',
      },
      {
        text: 'Drinks',
        icon: <LocalBarIcon />,
        link: '/home/product/drinks',
      },
    ],
    icon: <CategoryIcon />,
  },
  {
    text: 'Profile',
    icon: <AccountCircleIcon />,
    submenu: [
      {
        text: 'My Account',
        icon: <ManageAccountsIcon />,
        link: '/home/account',
      },
      {
        text: 'My Orders',
        icon: <DeliveryDiningIcon />,
        link: '/home/orders',
      },
    ],
  },
  {
    text: 'Cart',
    icon: <ShoppingBagIcon />,
    link: '/home/cart',
  },
  // {
  //   text: "WishList",
  //   icon: <FavoriteIcon />,
  // },
  // {
  //   text: "About",
  //   icon: <InfoIcon />,
  // },
];

const AppSidebar = ({
  open,
  onClose,
  onOpen,
  mode,
  toggleColorMode,
}: appSidebarProps) => {
  const swipeableRef = useRef<HTMLDivElement>(null);
  useClickOutSide(swipeableRef, onClose);
  return (
    <StyledSidebar>
      <SwipeableDrawer
        onOpen={onOpen}
        onClose={onClose}
        anchor='right'
        open={open}
        variant='persistent'
        sx={{ overflowY: 'auto' }}
        ref={swipeableRef}
      >
        <Box sx={{ width: '300px' }}>
          <List>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <IconButton onClick={toggleColorMode}>
                {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <IconButton onClick={() => signOut()}>
                <ExitToApp />
              </IconButton>
            </Box>
            {Menus.map((menu, i) => (
              <React.Fragment key={i}>
                <CreateMenu
                  text={menu.text}
                  icon={menu.icon}
                  link={menu.link as string}
                  submenu={menu.submenu}
                />
              </React.Fragment>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </StyledSidebar>
  );
};
export default AppSidebar;

type createMenuProps = {
  text: string;
  icon: ReactNode;
  link: string;
  submenu: any[] | undefined;
};

const CreateMenu = ({ text, icon, submenu, link = '' }: createMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [toggle, setToggle] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setToggle(!toggle);
  };
  return (
    <React.Fragment>
      <StyledListButton ref={ref}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
          }}
        >
          <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <StyledIcon>{icon}</StyledIcon>
            <StyledLink
              href={link}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <ListItemText secondary={text}></ListItemText>
            </StyledLink>
          </Box>
          {submenu && (
            <ListItemIcon
              sx={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={(e) => handleClick(e)}
            >
              {!toggle ? '\u2192' : '\u2193'}
            </ListItemIcon>
          )}
        </Box>
        <Divider />
        {submenu &&
          toggle &&
          submenu.map((submenu: any, i: number) => (
            <React.Fragment key={i + 'x'}>
              <StyledListButtonSubMenu>
                <StyledIcon>{submenu.icon}</StyledIcon>
                <StyledLink href={submenu.link || ''}>
                  <ListItemText secondary={submenu.text}></ListItemText>
                </StyledLink>
              </StyledListButtonSubMenu>
              <Divider />
            </React.Fragment>
          ))}
      </StyledListButton>
    </React.Fragment>
  );
};
