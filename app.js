document.getElementById('fileInput').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0, img.width, img.height);
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: "dontInvert",
                });
                if (code) {
                    document.getElementById('qrContent').textContent = `QR Code content: ${code.data}`;
                    // Save the decoded QR content for later use
                    document.getElementById('submit').dataset.qrContent = code.data;
                } else {
                    document.getElementById('qrContent').textContent = "QR Code not found.";
                }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('submit').addEventListener('click', function() {
    const qrContent = this.dataset.qrContent;
    if (!qrContent) {
        alert('Please upload and decode a QR code first.');
        return;
    }
    fetch('http://localhost:3000/chatgpt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: qrContent }),
    })
    .then(response => response.json())
    .then(data => {
        // Check if choices exist and have at least one item
        if (data.choices && data.choices.length > 0) {
            document.getElementById('response').textContent = `ChatGPT response: ${data.choices[0].text}`;
        } else {
            // Handle the case where the expected data is not present
            console.error('Received data:', data);
            document.getElementById('response').textContent = 'No response data found.';
        }
    })
    .catch(error => console.error('Error:', error));    
});
