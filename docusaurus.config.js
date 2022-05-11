const path = require('path');

module.exports = {
    title: 'Chrysalis Documentation',
    url: '/',
    baseUrl: '/',
    themes: ['@docusaurus/theme-classic'],
    plugins: [
        [
            '@docusaurus/plugin-content-docs',
            {
                id: 'chrysalis-docs',
                path: path.resolve(__dirname, 'docs'),
                routeBasePath: 'chrysalis-docs',
                sidebarPath: path.resolve(__dirname, 'sidebars.js'),
                editUrl: 'https://github.com/iotaledger/chrysalis-docs/edit/main',
                remarkPlugins: [require('remark-code-import'), require('remark-import-partial'), require('remark-remove-comments')],
            }
        ],
    ],
    staticDirectories: [path.resolve(__dirname, 'static')],
};