/* eslint-env node */
'use strict';

const fs = require('fs');
const path = require('path');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-what-input',

  included(app) {
    this._super.included.apply(this,arguments);
    this.options = app.options;
  },

  contentFor(type, config) {
    if (type === 'body-footer') {
      const whatInputPath = path.dirname(require.resolve('what-input'));
      let filePath = '';

      if (this.options.minifyJS.enabled === true) {
        filePath = path.join(whatInputPath, 'what-input.min.js');
      } else {
        filePath = path.join(whatInputPath, 'what-input.js');
      }
      const fileContent = fs.readFileSync(filePath, 'utf8');

      return `<script>${fileContent}</script>`;
    }
  },
};
