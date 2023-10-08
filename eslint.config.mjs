import antfu from '@antfu/eslint-config'

export default antfu({}, {
  rules: {
    'curly': [
      'error',
      'all',
    ],
    'style/no-tabs': [1],
  },
})
