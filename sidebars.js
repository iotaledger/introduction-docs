module.exports = {
  mySidebar: [{
    type: 'doc',
    id: 'welcome',
    label: 'Welcome'
  },
    {
      type: 'category',
      label: 'Explanations',
      items:
        [
          {
            type: 'doc',
            id: 'explanations/what_is_stardust',
            label: 'What is Stardust'
          },
          {
            type: 'category',
            label: 'Stardust Ledger Anatomy',
            items: [{
              type: 'doc',
              id: 'explanations/ledger/intro',
              label: `Introduction`
            }, {
              type: 'doc',
              id: 'explanations/ledger/simple_transfers',
              label: `Simple Transactions`
            }, {
              type: 'doc',
              id: 'explanations/ledger/alias',
              label: `Alias Transactions`
            }, {
              type: 'doc',
              id: 'explanations/ledger/foundry',
              label: `Native Tokens and Foundries`
            }, {
              type: 'doc',
              id: 'explanations/ledger/nft',
              label: `NFT Transactions`
            }
            ]
          },
          {
            type: 'doc',
            id: 'explanations/node_software',
            label: 'Node Software'
          }, {
          type: 'category',
          label: 'Libraries',
          items: [{
            type: 'doc',
            id: 'explanations/libraries/overview',
            label: 'Overview'
          }, {
            type: 'doc',
            id: 'explanations/libraries/client',
            label: 'Client Lib'
          }, {
            type: 'doc',
            id: 'explanations/libraries/wallet',
            label: 'Wallet Lib'
          },]
        },
          {
            type: 'doc',
            id: 'explanations/protocol_tip',
            label: 'Protocol TIPs'
          },
          {
            type: 'doc',
            id: 'explanations/faq',
            label: 'FAQ'
          },
        ]
    },
    {
      type: 'category',
      label: 'How Tos',
      items: [{
        type: 'doc',
        id: 'how_tos/overview',
        label: 'Overview'
      },
        {
          type: 'doc',
          id: 'how_tos/developer',
          label: 'Developer'
        },
        {
          type: 'doc',
          id: 'how_tos/exchange',
          label: 'Exchange'
        },
        {
          type: 'doc',
          id: 'how_tos/backup_security',
          label: 'Backup and Security'
        },
      ]
    },
    {
      type: 'category',
      label: 'Reference',
      items:
        [
          {
            type: 'category',
            label: 'Networks',
            items:
              [
                {
                  type: 'doc',
                  id: 'reference/networks/betanet',
                  label: 'Shimmer Beta'
                },
                {
                  type: 'doc',
                  id: 'reference/networks/shimmer',
                  label: 'Shimmer'
                },
              ]
          },
        ]
    },
    {
      type: 'category',
      label: 'Tutorials',
      items: [
        {
          type: 'doc',
          id: 'tutorials/one_click_private_tangle',
          label: 'Private Tangle'
        },]
    },
    {
      type: 'doc',
      id: 'resources',
      label: 'Resources'
    },
  ]
};
