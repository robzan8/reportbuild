const config = require('./protractor.conf').config;

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: [
      '--no-sandbox',
      '--allow-insecure-localhost',
      '--homepage=about:blank',
      '--no-first-run',
      '--headless',
      '--disable-software-rasterizer',
      '--disable-gpu',
      '--disable-translate',
      '--disable-extensions',
      '--disable-setuid-sandbox',
      '--remote-debugging-port=9876'
    ]
  }
};
config.chromeDriver = '/usr/bin/chromedriver';

exports.config = config;
