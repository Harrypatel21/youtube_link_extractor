import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import LinkButton from './linkbutton/LinkButton';
import './index.css';

function injectButton() {
    // Find the original "Links" heading
    const linksHeading = document.querySelector('#links-section > yt-attributed-string.subheadline');

    // Proceed only if the heading is found and our wrapper hasn't been injected yet
    if (linksHeading && !document.getElementById('__youtube_link_extractor_wrapper')) {

        // 1. Create a flex wrapper to hold the heading and the button
        const flexWrapper = document.createElement('div');
        flexWrapper.id = '__youtube_link_extractor_wrapper'; // ID for the wrapper to prevent re-injection
        flexWrapper.style.display = 'flex';
        flexWrapper.style.alignItems = 'center';
        flexWrapper.style.gap = '12px'; // Adds space between the heading and the button

        // 2. Insert the new wrapper right before the original heading
        linksHeading.before(flexWrapper);

        // 3. Move the original heading inside the flex wrapper
        flexWrapper.appendChild(linksHeading);

        // 4. Create the container for our React button
        const buttonRootContainer = document.createElement('div');
        buttonRootContainer.id = '__youtube_link_extractor_container';

        // 5. Add the button's container to the flex wrapper, right after the heading
        flexWrapper.appendChild(buttonRootContainer);

        // 6. Render the React button into its container
        createRoot(buttonRootContainer).render(
            React.createElement(StrictMode, null,
                React.createElement(LinkButton, null)
            )
        );
    }
}

// Use MutationObserver to detect when the links section is added to the DOM
const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // Check for the heading on any DOM change
            injectButton();
        }
    }
});

// Start observing the document body for changes
observer.observe(document.body, { childList: true, subtree: true });

// Initial check in case the element is already on the page at load time
injectButton();