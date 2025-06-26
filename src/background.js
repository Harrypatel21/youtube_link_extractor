// Simple background script for the extension
chrome.runtime.onInstalled.addListener(() => {
    console.log('YouTube Link Extractor installed');
  });
  
  // Optional: Handle messages from content script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'saveLinks') {
      // You can implement storage logic here if needed
      chrome.storage.local.set({ extractedLinks: request.links }, () => {
        sendResponse({ success: true });
      });
      return true; // Indicates async response
    }
  });