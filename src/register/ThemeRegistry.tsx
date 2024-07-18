'use client';

import * as React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ReactNode } from 'react';
import { baselightTheme } from '@/app/utils/theme/DefaultColors';

const cache = createCache({ key: 'css', prepend: true });

type Props = {
  children: ReactNode;
};

const ThemeRegistry = ({ children }: Props) => {
  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={baselightTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
};

export default ThemeRegistry;