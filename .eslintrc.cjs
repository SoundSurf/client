module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/order': [
      'error',
      {
        'groups': [
          'type',
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'unknown'
        ],
        'pathGroups': [
          {
            'pattern': 'react*',
            'group': 'external',
            'position': 'before'
          },
          {
            'pattern': '@hooks/*',
            'group': 'internal',
            'position': 'after'
          },
          {
            'pattern': '@pages/*',
            'group': 'internal',
            'position': 'after'
          },
          {
            'pattern': '@components/*',
            'group': 'internal',
            'position': 'after'
          }
        ],
        'pathGroupsExcludedImportTypes': ['@tanstack*'],
        'alphabetize': {
          'order': 'asc'
        }
      }
    ]
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src']
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
      }
    }
  }
};
