// HTML should have two input fields with IDs 'player1_name' and 'player2_name' and a button to trigger parsing

function parseLogs() {
    const player1 = document.getElementById('player1_name').value.trim() || 'Player 1';
    const player2 = document.getElementById('player2_name').value.trim() || 'Player 2';

    let messages = [];

    document.querySelectorAll('.dialog_box').forEach((box, boxIndex) => {
        box.querySelectorAll('div > span.timestamp').forEach(ts => {
            const contentEl = ts.parentElement.querySelector('.content');
            if (!contentEl) return;

            let charClass = boxIndex === 0 ? player1 : player2;
            let text = contentEl.innerText.trim();

            // Determine type
            let type = 'IC';
            if (contentEl.classList.contains('ooc') || /OOC/i.test(text)) type = 'OOC';
            else if (contentEl.classList.contains('emote') || /\/me/.test(text)) type = 'EMOTE';

            messages.push({
                time: ts.textContent.trim(),
                character: charClass,
                content: text,
                type: type
            });
        });
    });

    // Sort messages by time
    messages.sort((a, b) => {
        let tA = a.time.split(':').map(Number);
        let tB = b.time.split(':').map(Number);
        let secondsA = tA[0]*3600 + tA[1]*60 + tA[2];
        let secondsB = tB[0]*3600 + tB[1]*60 + tB[2];
        return secondsA - secondsB;
    });

    // Output results
    const output = document.getElementById('output');
    output.innerHTML = '';
    messages.forEach(msg => {
        let prefix = msg.type === 'IC' ? '' : msg.type + ': ';
        let div = document.createElement('div');
        div.textContent = `${msg.character}: ${msg.time} ${prefix}${msg.content}`;
        output.appendChild(div);
    });
}