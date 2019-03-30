import React from 'react';
import Helmet from 'react-helmet';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import Nav from './Nav';
import './all.sass';
import useSiteMetadata from './SiteMetadata';

const theme = {
  primary: '#DA071F',
  black: '#000',
  gray: '#535556',
  lightGray: '#9C9C9B',
  white: '#fff',
  darkGray: '#0E0D0D'
};

const StyledPage = styled.body`
  padding: 0 20px;
  background: ${theme.white};
  min-height: 100vh;

  &::before, &::after {
    content: "";
    display: block;
    position: fixed;
    left: 0;
    width: 100%;
    height: 20px;
    background-color: #fff;
    z-index: 1000;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }
`;

const PageContainer = styled.div`
  background: ${theme.darkGray};
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  /* background: url('/assets/images/desktop-large_home-bg.jpg') no-repeat center center; */
  background-size: cover;
`;

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <Helmet>
          <html lang="en" />
          <title>{title}</title>
          <meta name="description" content={description} />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/img/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            href="/img/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/img/favicon-16x16.png"
            sizes="16x16"
          />

          <link
            rel="mask-icon"
            href="/img/safari-pinned-tab.svg"
            color="#ff4400"
          />
          <meta name="theme-color" content="#fff" />

          <meta property="og:type" content="business.business" />
          <meta property="og:title" content={title} />
          <meta property="og:url" content="/" />
          <meta property="og:image" content="/img/og-image.jpg" />
        </Helmet>
        <PageContainer>
          <Nav />
          <div>{children}</div>
        </PageContainer>
      </StyledPage>
    </ThemeProvider>
  );
};

export default TemplateWrapper;
