// see https://developer.chrome.com/extensions/options

// Saves options to chrome.storage
function saveOptions() {
  // @ts-ignore
  const devMode = document.getElementById('devMode').checked;
  chrome.storage.sync.get('__config', ({ __config = {} }) => {
    chrome.storage.sync.set(
      {
        __config: { ...__config, devMode, api: {} },
      },
      () => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.textContent = 'My congratulations! Saved!';
        setTimeout(() => {
          status.textContent = '';
        }, 750);
      }
    );
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  // Use default value color = 'red' and developerMode = true.
  chrome.storage.sync.get('__config', ({ __config = { api: {} } }) => {
    // @ts-ignore
    document.getElementById('devMode').checked = __config.devMode;
  });
}

function clearOptions() {
  chrome.storage.sync.remove('__config', () => {
    // Update status to let user know options were saved.
    const status = document.getElementById('status');
    status.textContent = 'My congratulations! Cleared!';
    setTimeout(() => {
      status.textContent = '';
    }, 750);
    restoreOptions();
  });
}

function reset() {
  chrome.storage.sync.clear(() => {
    // Update status to let user know options were saved.
    const status = document.getElementById('status');
    status.textContent = 'My congratulations! All data cleared';
    setTimeout(() => {
      status.textContent = '';
    }, 750);
    restoreOptions();
  });
}

function init() {
  restoreOptions();

  document.getElementById('save').addEventListener('click', saveOptions);
  document.getElementById('clear').addEventListener('click', clearOptions);
  document.getElementById('reset').addEventListener('click', reset);
}

window.addEventListener('DOMContentLoaded', init);
