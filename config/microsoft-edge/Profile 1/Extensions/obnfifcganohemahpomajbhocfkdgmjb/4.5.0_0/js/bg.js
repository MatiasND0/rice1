chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'install') {
    chrome.tabs.create({
      active: true,
      url: 'https://www.adflyskipper.com/welcome',
    });
  }
});

chrome.runtime.setUninstallURL('https://www.adflyskipper.com/before-you-leave');
