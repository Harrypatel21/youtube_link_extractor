# YouTube Channel Link & Lead Extractor

<p align="center">
  <img src="https://i.imgur.com/your-project-logo.png" alt="Project Logo" width="150">
</p>

<p align="center">
  <strong>A browser extension to instantly extract social links, emails, and channel data from YouTube pages and send it directly to a shared Google Sheet.</strong>
  <br><br>
  <img src="https://img.shields.io/badge/version-1.0.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
  <img src="https://img.shields.io/badge/chrome-v100+-orange" alt="Chrome Version">
</p>

---

This tool is designed for teams (sales, marketing, researchers) who need to quickly gather public contact information from YouTube channels. It injects a simple button onto a channel's "About" page, allowing users to scrape all relevant data with a single click and save it to a designated tab in a central Google Sheet.

## ✨ Key Features

- **One-Click Extraction:** Scrapes channel name, YouTube URL, email, and all social media links (Instagram, Twitter/X, LinkedIn, etc.) in a single action.
- **Direct Google Sheets Integration:** Sends extracted data directly to a pre-configured Google Sheet, acting as a lightweight, no-cost CRM.
- **Multi-User Support:** Allows multiple team members to send data to their own personal tabs within the same Google Sheet.
- **User-Assisted Email Scraping:** Automates clicking the "View email" button and waits for the user to solve the CAPTCHA before grabbing the revealed email.
- **Simple & Non-Intrusive UI:** Adds a clean "Get Links" button and a settings icon directly into the YouTube interface without being disruptive.

## 🚀 How It Works

The extension injects a button onto the YouTube channel's "About" page. The user sets their name (which corresponds to a tab in the Google Sheet), clicks the button, and the extension sends the scraped data to a Google Apps Script, which then populates the correct tab in the sheet.

![Demo GIF showing the extension in action](https://i.imgur.com/your-demo-gif.gif)
*<p align="center">(A short GIF showing the process: clicking the settings icon, setting the name, clicking "Get Links", and showing the data appear in the Google Sheet would be perfect here.)</p>*

## 🛠️ Installation & Setup Guide

Setting up this tool involves two main parts: deploying the backend Google Apps Script and installing the browser extension.

### Part 1: Backend Setup (Google Apps Script)

This script acts as the secure intermediary between the extension and your Google Sheet.

1.  **Create Your Google Sheet:**
    - Create a new Google Sheet.
    - Create separate tabs at the bottom and name them for each user (e.g., `John`, `Sarah`, `Admin`).
    - Set up the header columns in each sheet: `Channel Name`, `Email`, `Number`, `Instagram`, `LinkedIn`, `Twitter`, `YouTube`, `Website`, `Timestamp`.

2.  **Create the Apps Script:**
    - In your sheet, go to `Extensions` > `Apps Script`.
    - Paste the code from `google-apps-script/Code.gs` into the editor.
    - **Important:** Inside the script, replace `"YOUR_SPREADSHEET_ID_HERE"` with the actual ID from your sheet's URL.

3.  **Deploy the Script:**
    - Click the blue **Deploy** button > **New deployment**.
    - Click the **Gear icon** and select **Web app**.
    - Configure the settings:
      - **Execute as:** `Me ([your-email]@gmail.com)`
      - **Who has access:** `Anyone`
    - Click **Deploy**. Authorize the permissions when prompted (you may need to click "Advanced" > "Go to... (unsafe)").
    - **Copy the generated Web app URL.** This is your API endpoint.

### Part 2: Frontend Setup (Chrome Extension)

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure the API Endpoint:**
    - Open the file `src/linkbutton/LinkButton.js`.
    - Find the `sendToGoogleSheet` function.
    - Paste the **Web app URL** you copied from the Apps Script deployment into the `webAppUrl` constant.

4.  **Build the Extension:**
    ```bash
    npm run build
    ```
    This will create a `build` folder containing all the necessary extension files.

5.  **Load the Extension in Chrome:**
    - Open Chrome and navigate to `chrome://extensions`.
    - Enable **Developer mode** using the toggle in the top-right corner.
    - Click the **Load unpacked** button.
    - Select the `build` folder from your project directory.
    - The extension is now installed and active!

## ⚙️ Usage

1.  Navigate to any YouTube channel's "About" page.
2.  The "Get Links" button and a settings icon (⚙️) will appear next to the "Links" section.
3.  **First-Time Use:** Click the settings icon (⚙️) and enter your name. This name **must exactly match** your tab name in the Google Sheet. Click "Save".
4.  Click the **"Get Links"** button.
5.  If an email is available behind a CAPTCHA, the puzzle will appear. **You must solve it.**
6.  Once the process is complete, a success notification will appear, and the data will be in your designated tab in the Google Sheet.

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features or improvements, feel free to fork the repository, make your changes, and submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is distributed under the MIT License. See `LICENSE` for more information.
