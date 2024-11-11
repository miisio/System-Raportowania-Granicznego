// Wklej swój token webhooka Discorda poniżej
const discordWebhookUrl = "https://discord.com/api/webhooks/1305568093958963302/HOfEAIM7-p_HilV91rnyxqe56qFA-AZTHoVtZK05i_cOisLxVrgQYwiCjkCNrHgAHXJH";

// Funkcja dodająca zdarzenie do listy i wysyłająca powiadomienie na Discorda
function dodajZdarzenie() {
    // Pobieranie wartości z formularza
    const nazwaGracza = document.getElementById("nazwaGracza").value;
    const typZdarzenia = document.getElementById("typZdarzenia").value;
    const opis = document.getElementById("opis").value;

    // Tworzenie obiektu zdarzenia
    const zdarzenie = {
        nazwaGracza,
        typZdarzenia,
        opis,
        data: new Date().toLocaleString("pl-PL") // data i godzina w polskim formacie
    };

    // Wyświetlenie zdarzenia na stronie
    const zdarzeniaLista = document.getElementById("zdarzeniaLista");
    const listItem = document.createElement("li");
    listItem.textContent = `${zdarzenie.data} - ${zdarzenie.nazwaGracza} - ${zdarzenie.typZdarzenia.toUpperCase()}: ${zdarzenie.opis}`;
    zdarzeniaLista.appendChild(listItem);

    // Wysłanie danych do Discorda przez webhook
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

    // Czyszczenie formularza po dodaniu zdarzenia
    document.getElementById("zdarzenieForm").reset();
}
