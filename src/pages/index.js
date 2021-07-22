import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import LandingpageHeader from '../components/LandingpageHeader';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const title = siteConfig.title;
  const tagline = siteConfig.tagline
  return (
    <Layout
      title={title}
      description={tagline}>
      <LandingpageHeader />
      {/* <main>
        <HomepageFeatures />
      </main> */}
    </Layout>
  );
}
