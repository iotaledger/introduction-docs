const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Chrysalis',
  tagline: '',
  url: 'https://chrysalis.docs.iota.org/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/logo/favicon.ico',
  organizationName: 'iotaledger', // Usually your GitHub org/user name.
  projectName: 'chrysalis', // Usually your repo name.
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Material+Icons',
    'http://v2202102141633143571.bestsrv.de/assets/css/styles.c88dfa6b.css', //replace this URL
  ],
  themeConfig: {
    navbar: {
      title: 'Chrysalis Documentation',
      logo: {
        alt: 'IOTA',
        src: 'static/img/logo/Logo_Swirl_Dark.png',
      },
      items: [{
          type: 'doc',
          docId: 'introduction/welcome',
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
              to: '/',
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
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};