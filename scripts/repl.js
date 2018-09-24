import { addAwaitOutsideToReplServer } from 'await-outside';
import enableReplHistory from 'repl.history';
import _repl from 'repl';
import os from 'os';
import libpath from 'path';
import fs from 'fs-extra';
import axios from 'axios';

export async function repl() {
  const instance = _repl.start({});

  addAwaitOutsideToReplServer(instance);
  enableReplHistory(instance, libpath.join(os.homedir(), '.node_history'));

  Object.defineProperties(instance.context, {
    exit: {
      get() {
        process.exit(0);
      },
      set() {},
      enumerable: false,
      configurable: false,
    },
    quit: {
      get() {
        process.exit(0);
      },
      set() {},
      enumerable: false,
      configurable: false,
    },
    clear: {
      get() {
        console.clear();
      },
      set() {},
      enumerable: false,
      configurable: false,
    },
  });
  Object.assign(instance.context, {
    libpath,
    fs,
    axios,
  });
}
