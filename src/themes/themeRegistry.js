import React from 'react';

const themeRegistry = {
  burobig: {
    Home: React.lazy(() => import('./burobig/BurobigHome')),
    Header: React.lazy(() => import('./burobig/BurobigHeader')),
    Footer: React.lazy(() => import('./burobig/BurobigFooter')),
  },
  capilon: {
    Home: React.lazy(() => import('./capilon/CapilonHome')),
    Header: React.lazy(() => import('./capilon/CapilonHeader')),
    Footer: React.lazy(() => import('./capilon/CapilonFooter')),
  },
  burckaplama: {
    Home: React.lazy(() => import('./burckaplama/BurcKaplamaHome')),
    Header: React.lazy(() => import('./burckaplama/BurcKaplamaHeader')),
    Footer: React.lazy(() => import('./burckaplama/BurcKaplamaFooter')),
  },
  coreweb: {
    Home: React.lazy(() => import('./coreweb/CoreWebHome')),
    Header: React.lazy(() => import('./coreweb/CoreWebHeader')),
    Footer: React.lazy(() => import('./coreweb/CoreWebFooter')),
  }
};

export default themeRegistry;
