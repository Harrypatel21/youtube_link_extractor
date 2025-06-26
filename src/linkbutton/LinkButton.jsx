import React, { useState } from 'react';

function LinkButton() {
    const [urls, setUrls] = useState([]);
    const [isExtracting, setIsExtracting] = useState(false);

    function extractLinksFromYouTube() {
        setIsExtracting(true);

        const allLinks = [];
        const linkElements = document.querySelectorAll('yt-channel-external-link-view-model');

        linkElements.forEach(element => {
            const linkAnchor = element.querySelector('a');
            const titleElement = element.querySelector('.yt-channel-external-link-view-model-wiz__title');

            if (linkAnchor && linkAnchor.href) {
                let finalUrl = linkAnchor.href;
                const linkText = titleElement ? titleElement.textContent.trim() : 'No text';

                if (finalUrl.includes('googleusercontent.com/youtube.com/')) {
                    try {
                        const url = new URL(finalUrl);
                        const redirectUrl = url.search_params.get('q');
                        if (redirectUrl) {
                            finalUrl = decodeURIComponent(redirectUrl);
                        }
                    } catch (error) {
                        console.warn('Error parsing redirect URL:', error);
                    }
                }

                allLinks.push({ url: finalUrl, text: linkText });
            }
        });

        const uniqueLinks = allLinks.filter((link, index, self) =>
            index === self.findIndex(l => l.url === link.url)
        );

        setUrls(uniqueLinks);
        console.log("Extracted links:", uniqueLinks);

        if (uniqueLinks.length > 0) {
            const linkText = uniqueLinks.map(link => `${link.text}: ${link.url}`).join('\n');
            navigator.clipboard.writeText(linkText).then(() => {
                showNotification(`Copied ${uniqueLinks.length} links to clipboard`);
            }).catch(err => {
                console.error('Failed to copy links:', err);
                showNotification('Could not copy links to clipboard.');
            });
        } else {
            showNotification('No links found.');
        }

        setIsExtracting(false);
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            transition: opacity 0.5s;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 500);
        }, 3000);
    }

    // The root element no longer needs custom styling, as the parent flex wrapper handles positioning.
    return React.createElement('div', null, 
        React.createElement('button',
            {
                className: "mt-1 cursor-pointer text-zinc-200 flex gap-2 items-center bg-black px-4 py-2 rounded-lg font-medium text-sm hover:bg-[#111] transition-all ease-in duration-200",
                onClick: extractLinksFromYouTube,
                disabled: isExtracting
            },
            isExtracting ? 'Extracting...' : `Get Links ${urls.length > 0 ? `(${urls.length})` : ''}`
        )
    );
}

export default LinkButton;