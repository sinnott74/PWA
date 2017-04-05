var pathConfigs = {
  '/users': {
    view: 'users',
    title: 'Users',
    facade: '../features/users/usersFacade',
    operation: {
      name: 'listAllUsers'
    },
    // inlineStyles: getFileContents(['/styles/core.css']),
    remoteStyles: [],
    remoteScripts: []
  },
  '/users/:id': {
    view: 'user',
    title: 'Users',
    facade: '../features/users/usersFacade',
    operation: {
      name: 'readByID',
      input: ['id']
    },
    // inlineStyles: getFileContents(['/styles/core.css']),
    remoteStyles: [],
    remoteScripts: []
  }
};

module.exports = pathConfigs;