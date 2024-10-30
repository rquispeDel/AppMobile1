import { Application } from '@nativescript/core';
import App from './components/App.vue';

Application.run({
  create: () => {
    return new App().$start();
  },
});