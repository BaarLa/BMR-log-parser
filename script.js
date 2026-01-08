document.getElementById("parseBtn").addEventListener("click", () => {
    const html = document.getElementById("htmlInput").value;
    const player1 = document.getElementById("player1").value;
    const player2 = document.getElementById("player2").value;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const chatOutput = document.getElementById("chatOutput");
    chatOutput.innerHTML = "";

    // Get all dialogue blocks and combat logs
    const dialogues = doc.querySelectorAll("#dialog .dialog_box, #combat_log li");
    
    dialogues.forEach(item => {
        let player = item.classList.contains("curious") ? player1 :
                     item.classList.contains("cunning") ? player2 : "System";

        let content = item.textContent.trim();

        // Determine type: OOC, Emote, or regular IC
        let type = "ic";
        if (item.querySelector(".ooc") || content.startsWith("Yay, victory")) type = "ooc";
        if (item.querySelector(".emote")) type = "emote";

        const div = document.createElement("div");
        div.className = type;
        div.innerHTML = `<strong>${player}:</strong> ${content}`;
        chatOutput.appendChild(div);
    });
});
