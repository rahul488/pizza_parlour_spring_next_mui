'use client';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type iProps = {
  tabs: React.ReactNode[];
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function AppTabs({ tabs }: iProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Tabs
          orientation='horizontal'
          variant='scrollable'
          scrollButtons='auto'
          value={value}
          textColor='inherit'
          onChange={handleChange}
        >
          <Tab label='Customers' {...a11yProps(0)} />
          <Tab label='Orders' {...a11yProps(1)} />
          <Tab label='Products' {...a11yProps(2)} />
          <Tab label='Deals' {...a11yProps(3)} />
          <Tab label='Banner' {...a11yProps(4)} />
          <Tab label='Categories' {...a11yProps(5)} />
        </Tabs>
      </Box>
      {tabs &&
        tabs.map((tab, idx) => (
          <TabPanel value={value} index={idx} key={idx}>
            {tab}
          </TabPanel>
        ))}
    </Box>
  );
}
