// Webhook URL Discorda
const discordWebhookUrl = "https://discord.com/api/webhooks/1305568093958963302/HOfEAIM7-p_HilV91rnyxqe56qFA-AZTHoVtZK05i_cOisLxVrgQYwiCjkCNrHgAHXJH";

// Mockowe dane logowania
const validUsername = "admin";
const validPassword = "granica123";

// Funkcja logowania
function zaloguj() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === validUsername && password === validPassword) {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
    } else {
        document.getElementById("loginError").textContent = "Nieprawidłowa nazwa użytkownika lub hasło.";
    }
}

// Funkcja dodająca zdarzenie do listy i wysyłająca powiadomienie na Discorda
function dodajZdarzenie() {
    const nazwaGracza = document.getElementById("nazwaGracza").value;
    const typZdarzenia = document.getElementById("typZdarzenia").value;
    const opis = document.getElementById("opis").value;

    const zdarzenie = {
        nazwaGracza,
        typZdarzenia,
        opis,
        data: new Date().toLocaleString("pl-PL")
    };

    const zdarzeniaLista = document.getElementById("zdarzeniaLista");
    const listItem = document.createElement("li");
    listItem.textContent = `${zdarzenie.data} - ${zdarzenie.nazwaGracza} - ${zdarzenie.typZdarzenia.toUpperCase()}: ${zdarzenie.opis}`;
    zdarzeniaLista.appendChild(listItem);

    fetch(discordWebhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: `**Nowe zdarzenie:** ${zdarzenie.typZdarzenia.toUpperCase()}\n**Gracz:** ${zdarzenie.nazwaGracza}\n**Opis:** ${zdarzenie.opis}\n**Data:** ${zdarzenie.data}`
        })
    }).then(response => {
        if (response.ok) {
            alert("Zdarzenie zostało wysłane na Discorda!");
        } else {
            alert("Błąd przy wysyłaniu zdarzenia na Discorda.");
        }
    }).catch(error => {
        console.error("Błąd:", error);
        alert("Wystąpił problem z wysłaniem zdarzenia na Discorda.");
    });

    document.getElementById("zdarzenieForm").reset();
}
