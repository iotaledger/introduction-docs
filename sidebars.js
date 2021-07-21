/**
 * * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  mySidebar: [{
      type: 'doc',
      id: 'welcome',
      label: 'Welcome'
    }, {
      type: 'doc',
      id: 'introduction/what_is_chrysalis',
      label: 'What is Chrysalis?'
    }, {
      type: 'doc',
      id: 'introduction/path_to_chrysalis',
      label: 'Path to Chrysalis'
    },
    {
      type: 'category',
      label: 'Firefly',
      items: [{
          type: 'doc',
          id: 'firefly/README',
          label: 'Introduction'
        },
        {
          type: 'doc',
          id: 'firefly/verify_download',
          label: 'Verify Download'
        },
      ]
    },
    {
      type: 'doc',
      id: 'node-software/node-software',
      label: 'Node Software'
    }, {
      type: 'category',
      label: 'Libraries',
      items: [{
        type: 'doc',
        id: 'libraries/overview',
        label: 'Overview'
      }, {
        type: 'doc',
        id: 'libraries/client',
        label: 'Client Lib'
      }, {
        type: 'doc',
        id: 'libraries/wallet',
        label: 'Wallet Lib'
      }, ]
    },
    {
      type: 'category',
      label: 'Guides',
      items: [{
          type: 'doc',
          id: 'guides/README',
          label: 'Overview'
        },
        {
          type: 'doc',
          id: 'guides/dev_guide',
          label: 'Developer'
        },
        {
          type: 'doc',
          id: 'guides/exchange_guide',
          label: 'Exchange'
        },
        {
          type: 'doc',
          id: 'guides/token_guide',
          label: 'Token Migration'
        },
        {
          type: 'doc',
          id: 'guides/migration-mechanism',
          label: 'Migration Mechanism'
        },
        {
          type: 'doc',
          id: 'guides/hub_guide',
          label: 'Hub Migration'
        },
        {
          type: 'doc',
          id: 'guides/backup_security',
          label: 'Backup and Security'
        },
        {
          type: 'doc',
          id: 'guides/snapshot_validation_bootstrapping',
          label: 'Chrysalis Snapshot Validation'
        },
      ]
    },
    {
      type: 'doc',
      id: 'mainnet',
      label: 'Mainnet'
    },
    {
      type: 'doc',
      id: 'testnet',
      label: 'Testnet'
    },
    {
      type: 'doc',
      id: 'tutorials/one-click-private-tangle',
      label: 'Private Tangle'
    },
    {
      type: 'doc',
      id: 'rfc',
      label: 'Protocol RFCs'
    },
    {
      type: 'doc',
      id: 'resources',
      label: 'Resources'
    },
    {
      type: 'doc',
      id: 'faq',
      label: 'FAQ'
    },

  ]
};