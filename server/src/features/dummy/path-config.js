var pathConfigs = {
  '/': {
    view: 'index',
    title: 'Index',
    facade: '',
    operation: {},
    // inlineStyles: getFileContents(['/styles/core.css']),
    remoteStyles: [],
    remoteScripts: []
  },
  '/url-1': {
    view: 'url-1',
    title: 'URL 1',
    facade: '',
    operation: {},
    // inlineStyles: getFileContents(['/styles/core.css']),
    remoteStyles: [],
    remoteScripts: []
  },
  '/url-2': {
    view: 'url-2',
    title: 'URL 2',
    facade: '../facades/testFacade',
    operation: {},
    // inlineStyles: getFileContents(['/styles/core.css']),
    remoteStyles: [],
    remoteScripts: []
  }
};

module.exports = pathConfigs;
