import React from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Typography, Container } from '@material-ui/core';

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Ecommerce site</title>
      </Head>
      <AppBar position='static'>
        <Toolbar>
          <Typography>Ecommerce Site</Typography>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
      <footer>
          <Typography>
              All rights reserved
          </Typography>
      </footer>
    </div>
  );
}
