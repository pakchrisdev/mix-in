class UI{
    printAlert(mess, cls){
        const div = document.createElement('div');
        div.className = 'alert';
        div.innerHTML = `
            <p class="warning">${mess}</p>
        `;
    }
}