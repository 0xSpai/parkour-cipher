const custom_alphabet = {
    'a': '_____', 'b': '[]___', 'c': '___[]', 'd': '_[]__',
    'e': '__[]_', 'f': '[][]_', 'g': '_[][]', 'h': '[]_[]',
    'i': '[]_L_', 'j': '_[]L_', 'k': '_L[]_', 'l': '_L__',
    'm': '__L_', 'n': 'L___', 'o': '___L', 'p': '[]_H_',
    'q': '_[]H_', 'r': '_H[]_', 's': '_H__', 't': '__H_',
    'u': 'H___', 'v': '___H', 'w': '[]L__', 'x': '__L[]',
    'y': '[]H__', 'z': '__H[]', ' ': '_[_]_'
};

// Reverse mapping
const reverse_alphabet = Object.fromEntries(
    Object.entries(custom_alphabet).map(([k, v]) => [v, k])
);

let currentMode = 'encode';

function encode(text) {
    return text.toLowerCase().split('').map(char => 
        custom_alphabet[char] || char // Use char if not found
    ).join('');
}

function decode(encoded_text) {
    let decoded = "", buffer = "";

    for (let i = 0; i < encoded_text.length; i++) {
        buffer += encoded_text[i]; // Add char to buffer

        // Match buffer to reverse alphabet
        for (let len = Math.min(buffer.length, 6); len > 0; len--) {
            let substring = buffer.slice(-len);
            if (reverse_alphabet[substring]) {
                decoded += reverse_alphabet[substring]; // Decode
                buffer = buffer.slice(0, -len); // Remove matched
                break;
            }
        }
    }

    if (buffer.length > 0) {
        return "Invalid cipher";
    }

    return decoded; // Return the decoded string
}

function updateButtonStates(activeButton) {
    const encodeBtn = document.getElementById('encodeBtn');
    const decodeBtn = document.getElementById('decodeBtn');
    
    const baseClass = "flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
    const activeClass = "flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
    
    encodeBtn.className = activeButton === 'encode' ? activeClass : baseClass;
    decodeBtn.className = activeButton === 'decode' ? activeClass : baseClass;
}

function updateOutput() {
    const inputText = document.getElementById('inputText').value;
    const outputContainer = document.getElementById('outputContainer');
    const outputText = currentMode === 'encode' ? encode(inputText) : decode(inputText);

    document.getElementById('outputText').innerText = outputText;
    outputContainer.classList.add('animate-fade');
    setTimeout(() => outputContainer.classList.remove('animate-fade'), 300);
}

document.getElementById('inputText').addEventListener('input', updateOutput);

function encodeText() {
    currentMode = 'encode';
    updateButtonStates('encode');
    updateOutput();
}

function decodeText() {
    currentMode = 'decode';
    updateButtonStates('decode');
    updateOutput();
}

// Init states and output
updateButtonStates('encode');
updateOutput();
