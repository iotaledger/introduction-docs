const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Chrysalis',
  tagline: 'Official IOTA Chrysalis Software',
  url: 'https://chrysalis.docs.iota.org/',
  baseUrl: '/chrysalis-docs/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/img/logo/favicon.ico',
  organizationName: 'iotaledger', // Usually your GitHub org/user name.
  projectName: 'Chrysalis', // Usually your repo name.
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Material+Icons',
  ],
  themeConfig: {
    navbar: {
      title: 'Chrysalis',
      logo: {
        alt: 'IOTA',
        src: 'img/logo/Logo_Swirl_Dark.png',
      },
      items: [{
          type: 'doc',
          docId: 'welcome',
          position: 'left',
          label: 'Documentation',
        },
        //        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/iotaledger/chrysalis-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [{
          title: 'Documentation',
          items: [{
              label: 'Welcome',
              to: '/welcome',
            },
            {
              to: 'introduction/what_is_chrysalis',
              label: 'What is Chrysalis?'
            },
            {
              to: 'introduction/path_to_chrysalis',
              label: 'Path to Chrysalis'
            },
            {
              to: 'firefly/',
              label: 'Firefly'
            },
            {
              to: 'node_software/',
              label: 'Node Software'
            },
            {
              to: 'libraries/',
              label: 'Libraries'
            },
            {
              to: 'guides/',
              label: 'Guides'
            },
            {
              to: 'mainnet/',
              label: 'Mainnet'
            },
            {
              to: 'testnet/',
              label: 'Testnet'
            },
            {
              to: 'one-click-private-tangle',
              label: 'Private Tangle'
            },
            {
              to: 'rfc',
              label: 'Protocol RFCs'
            },
            {
              to: 'resources',
              label: 'Resources'
            },
            {
              to: 'faq',
              label: 'FAQ'
            },
          ],
        },
        {
          title: 'Community',
          items: [{
            label: 'Discord',
            href: 'https://discord.iota.org/',
          }, ],
        },
        {
          title: 'Contribute',
          items: [{
            label: 'GitHub',
            href: 'https://github.com/iotaledger/chrysalis-docs',
          }, ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} IOTA Foundation, Built with Docusaurus.`,
    },
    prism: {
      additionalLanguages: ['rust'],
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          // Please change this to your repo.
          editUrl: 'https://github.com/iotaledger/chrysalis-docs/tree/main/docs',
        },
        theme: {
          customCss: require.resolve('./src/css/iota.css'),
        },
      },
    ],
  ],
};