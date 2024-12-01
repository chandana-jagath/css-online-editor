// Initialize CodeMirror editors
const htmlEditor = CodeMirror(document.getElementById('htmlEditor'), {
    mode: 'htmlmixed',
    lineNumbers: true,
    theme: 'default',
});

const cssEditor = CodeMirror(document.getElementById('cssEditor'), {
    mode: 'css',
    lineNumbers: true,
    theme: 'default',
});

// Run Code Button
document.getElementById('runBtn').addEventListener('click', () => {
    const htmlCode = htmlEditor.getValue();
    const cssCode = cssEditor.getValue();

    const output = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <style>${cssCode}</style>
        </head>
        <body>
            ${htmlCode}
        </body>
        </html>
    `;

    const iframe = document.getElementById('output');
    iframe.contentDocument.open();
    iframe.contentDocument.write(output);
    iframe.contentDocument.close();
});

// Save Code Button
document.getElementById('saveCode').addEventListener('click', () => {
    const code = {
        html: htmlEditor.getValue(),
        css: cssEditor.getValue(),
    };
    localStorage.setItem('savedCode', JSON.stringify(code));
    alert('Code saved!');
});

// Load Code Button
document.getElementById('loadCode').addEventListener('click', () => {
    const savedCode = JSON.parse(localStorage.getItem('savedCode'));
    if (savedCode) {
        htmlEditor.setValue(savedCode.html);
        cssEditor.setValue(savedCode.css);
    } else {
        alert('No saved code found!');
    }
});

// Export Code Button
document.getElementById('exportCode').addEventListener('click', () => {
    const htmlCode = htmlEditor.getValue();
    const cssCode = cssEditor.getValue();

    const htmlBlob = new Blob([htmlCode], { type: 'text/html' });
    const htmlLink = document.createElement('a');
    htmlLink.href = URL.createObjectURL(htmlBlob);
    htmlLink.download = 'index.html';
    htmlLink.click();

    const cssBlob = new Blob([cssCode], { type: 'text/css' });
    const cssLink = document.createElement('a');
    cssLink.href = URL.createObjectURL(cssBlob);
    cssLink.download = 'styles.css';
    cssLink.click();
});

// Theme Toggle Button
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// Auto-Save Code
setInterval(() => {
    const code = {
        html: htmlEditor.getValue(),
        css: cssEditor.getValue(),
    };
    localStorage.setItem('autoSavedCode', JSON.stringify(code));
}, 5000);

// Load Auto-Saved Code
window.addEventListener('DOMContentLoaded', () => {
    const autoSavedCode = JSON.parse(localStorage.getItem('autoSavedCode'));
    if (autoSavedCode) {
        htmlEditor.setValue(autoSavedCode.html);
        cssEditor.setValue(autoSavedCode.css);
    }
});

const themeToggleBtn = document.querySelector('.theme-toggle-button');

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggleBtn.classList.toggle('light-theme');
});