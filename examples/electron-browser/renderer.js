const DEFAULT_URL = 'https://www.google.com';
const addressInput = document.getElementById('address');
const statusText = document.getElementById('status');
const backButton = document.getElementById('back');
const forwardButton = document.getElementById('forward');
const reloadButton = document.getElementById('reload');
const homeButton = document.getElementById('home');
const browserForm = document.getElementById('browser-form');
const webview = document.getElementById('browser');

function formatUrl(rawUrl) {
  if (!rawUrl) {
    return DEFAULT_URL;
  }

  try {
    return new URL(rawUrl).toString();
  } catch (error) {
    return `https://${rawUrl}`;
  }
}

function updateNavigationState() {
  const currentUrl = webview.getURL();
  addressInput.value = currentUrl || DEFAULT_URL;
  backButton.disabled = !webview.canGoBack();
  forwardButton.disabled = !webview.canGoForward();
  statusText.textContent = webview.isLoading() ? '加载中…' : '已完成';
}

browserForm.addEventListener('submit', (event) => {
  event.preventDefault();
  webview.loadURL(formatUrl(addressInput.value));
});

backButton.addEventListener('click', () => {
  if (webview.canGoBack()) {
    webview.goBack();
  }
});

forwardButton.addEventListener('click', () => {
  if (webview.canGoForward()) {
    webview.goForward();
  }
});

reloadButton.addEventListener('click', () => webview.reload());
homeButton.addEventListener('click', () => webview.loadURL(DEFAULT_URL));

webview.addEventListener('did-start-loading', updateNavigationState);
webview.addEventListener('did-stop-loading', updateNavigationState);
webview.addEventListener('did-navigate', updateNavigationState);
webview.addEventListener('did-navigate-in-page', updateNavigationState);

webview.addEventListener('dom-ready', () => {
  webview.loadURL(formatUrl(addressInput.value));
});
