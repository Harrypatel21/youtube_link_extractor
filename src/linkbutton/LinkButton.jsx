import React, { useState } from 'react';

// New function to send data to our Google Apps Script
async function sendToGoogleSheet(data) {
    // !!! IMPORTANT: Paste your own Google Apps Script Web App URL here !!!
    const webAppUrl = 'https://script.google.com/macros/s/AKfycbyMjckNkRku9eon8T82d2KVKWb-oo0z4zlgjksMwJJvwu4ZOKwLMHYP88-GE5iHYaia/exec'; 

    try {
        const response = await fetch(webAppUrl, {
            method: 'POST',
            mode: 'no-cors', // Important for sending from a browser to Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        console.log("Successfully sent data to Google Sheet.");
        return true;
    } catch (error) {
        console.error('Error sending data to Google Sheet:', error);
        return false;
    }
}


function LinkButton() {
    const [isExtracting, setIsExtracting] = useState(false);
    const [message, setMessage] = useState('Get Links');


    function extractLinksFromYouTube() {
        setIsExtracting(true);
        setMessage('Extracting...');

        // 1. Get the Channel Name
        const channelNameElement = document.querySelector('yt-formatted-string#text.ytd-channel-name');
        const channelName = channelNameElement ? channelNameElement.textContent.trim() : 'Unknown Channel';

        // 2. Extract all links
        const linkElements = document.querySelectorAll('yt-channel-external-link-view-model');
        const allLinks = [];

        linkElements.forEach(element => {
            const linkAnchor = element.querySelector('a');
            if (linkAnchor && linkAnchor.href) {
                let finalUrl = linkAnchor.href;
                if (finalUrl.includes('googleusercontent.com/youtube.com/')) {
                    try {
                        const url = new URL(finalUrl);
                        const redirectUrl = url.searchParams.get('q');
                        if (redirectUrl) {
                            finalUrl = decodeURIComponent(redirectUrl);
                        }
                    } catch (error) {
                        console.warn('Error parsing redirect URL:', error);
                    }
                }
                allLinks.push(finalUrl);
            }
        });
        
        // 3. Organize the data to match Google Sheet columns
        const sheetData = {
            channelName: channelName,
            youtube: window.location.href, // The current channel URL
            instagram: allLinks.find(link => link.includes('instagram.com')) || '',
            twitter: allLinks.find(link => link.includes('twitter.com') || link.includes('x.com')) || '',
            linkedin: allLinks.find(link => link.includes('linkedin.com')) || '',
            email: allLinks.find(link => link.startsWith('mailto:')) || ''
        };
        
        console.log("Organized Data:", sheetData);

        // 4. Send the data to the Google Sheet
        sendToGoogleSheet(sheetData).then(success => {
            if (success) {
                showNotification(`Links for ${channelName} sent to Google Sheet!`);
                setMessage('Sent!');
            } else {
                showNotification('Error: Failed to send links.');
                setMessage('Error!');
            }
            setIsExtracting(false);
            // Reset button text after a delay
            setTimeout(() => setMessage('Get Links'), 2000);
        });
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
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    return React.createElement('div', null, 
        React.createElement('button',
            {
                className: "mt-1 cursor-pointer text-zinc-200 flex gap-2 items-center bg-black px-4 py-2 rounded-lg font-medium text-sm hover:bg-[#111] transition-all ease-in duration-200",
                onClick: extractLinksFromYouTube,
                disabled: isExtracting
            },
            message
        )
    );
}

export default LinkButton;