import { success, error, defaultModules } from '@pnotify/core';

import * as PNotifyMobile from '@pnotify/mobile';

defaultModules.set(PNotifyMobile, {});

import { defaults } from '@pnotify/core';
defaults.delay = 3000;

export { onFetchError, onFetchSuccess };

function onFetchError(message) {
  error({
    title: 'Oh No! Error!',
    text: `${message}`,
  });
}

function onFetchSuccess(message) {
  success({
    title: 'Success!',
    text: `${message}`,
  });
}
