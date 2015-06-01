module.exports = function() {
  return {
      restrict : 'E',
      scope: {},
      bindToController: true,
      controllerAs: 'state',
      controller: require('./ctrl'),
      template: `
          <h1>Angular HMR Test</h1>
          <p>THIS IS A derp {{pageIndexVar}}</p>
          <session-list
              sessions="sessions">
          </session-list>
      `
  };
};
