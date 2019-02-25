const ui = new UI();


function eventListeners(){
    const searchByName = document.querySelector('.search-by-name');
    if(searchByName) searchByName.addEventListener('submit', getDrinks);
}
eventListeners();


function getDrinks(e){
    e.preventDefault();
    const search = document.querySelector('.search-by-name-input').value;
    // console.log(search)
    if(search === '') ui.printAlert('Please enter text', 'warning');
}