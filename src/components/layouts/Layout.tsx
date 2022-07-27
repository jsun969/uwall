import { GitHub, Grain } from '@mui/icons-material';
import {
  AppBar,
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  categories: { id: string; name: string }[];
  selectedCategory?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  categories,
  selectedCategory,
}) => {
  return (
    <>
      <Head>
        <title>XXX万能墙{title && ` - ${title}`}</title>
      </Head>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            XXX万能墙{title && ` - ${title}`}
          </Typography>
          <IconButton
            size="large"
            color="inherit"
            edge="end"
            onClick={() => window.open('https://github.com/jsun969/uwall')}
          >
            <GitHub />
          </IconButton>
        </Toolbar>
        {selectedCategory && (
          <Tabs
            value={selectedCategory}
            variant="scrollable"
            textColor="inherit"
            indicatorColor="secondary"
            scrollButtons="auto"
          >
            <Tab value="all" label="全部" />
            {categories.map((category) => (
              <Tab
                key={category.id}
                value={category.id}
                label={category.name}
              />
            ))}
          </Tabs>
        )}
      </AppBar>
      <main>
        {children}
        <SpeedDial
          ariaLabel="Create Post"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {categories.map((category) => (
            <SpeedDialAction
              key={category.id}
              tooltipTitle={category.name}
              icon={<Grain />}
              tooltipOpen
            />
          ))}
        </SpeedDial>
      </main>
    </>
  );
};

export default Layout;
