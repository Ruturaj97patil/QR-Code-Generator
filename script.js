const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

// Deferred prompt variable
let deferredPrompt;

// Function to show the install button
function showInstallButton() {
    const installButton = document.getElementById('install-button');
    installButton.style.display = 'block';

    installButton.addEventListener('click', () => {
        // Trigger the deferred prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }

            // Reset the deferred prompt
            deferredPrompt = null;
        });
    });
}

const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;

    if (url === '') {
        alert('Please Enter A URL');
    } else {
        showSpinner();
        setTimeout(() => {
            hideSpinner();
            generateQRCode(url, size);

            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src;
                createSaveBtn(saveUrl);

                // Check if the deferred prompt is available
                if (deferredPrompt) {
                    // Show the install button
                    showInstallButton();
                }
            }, 50);
        }, 1000);
    }
};

const generateQRCode = (url, size) => {
    const qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size,
    });
};

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
};

const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
};

const clearUI = () => {
    qr.innerHTML = '';
    const saveLink = document.getElementById('save-link');
    if (saveLink) {
        saveLink.remove();
    }
};

const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
    link.href = saveUrl;
    link.download = 'qrcode';
    link.innerHTML = 'Save Image';
    document.getElementById('generated').appendChild(link);
};

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);

// Register the beforeinstallprompt event listener
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default prompt
    event.preventDefault();
    // Store the event for later use
    deferredPrompt = event;
});
