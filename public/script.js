document.getElementById('inputForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = document.getElementById('userInput').value;
    document.getElementById('output').innerText = `You entered: ${userInput}`;
});
