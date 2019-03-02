const ui = new UI();
const api = new API();


function eventListeners(){
    document.addEventListener('DOMContentLoaded', documentReady);
    const search = document.querySelector('.search');
    if(search) search.addEventListener('submit', getDrinks);

    const results = document.querySelector('.search-results-contain');
    if(results) results.addEventListener('click', resultsAction);

    const modalClose = document.querySelector('.modal-close');
    if(modalClose) modalClose.addEventListener('click', ()=>{
        document.getElementById('modal').classList.remove('modal-visible');
    });
}
eventListeners();


function getDrinks(e){
    e.preventDefault();
    const search = document.querySelector('.search-by').value;
    // console.log(search)
    if(search === '') ui.printAlert('Please enter text', 'warning');

    else{
        let serverResp;
        const type = document.querySelector('.search').dataset.type;
        switch(type){
            case 'name': serverResp = api.getDrinkByName(search);
            break;
            case 'ingredient': serverResp = api.getDrinksByIngredient(search);
            break;
            case 'category': serverResp = api.getDrinksByCategory(search);
            break;
        }
        // api.getDrinkByName(search)
        ui.clearResults();

        serverResp
        .then(drink=>{
            if(drink.drinks.drinks === null) ui.printAlert('No results present', 'warning');
            else{
                // console.log(drink.drinks.drinks)
                if(type === 'name') ui.displayDrinksWithIngredients(drink.drinks.drinks);
                else ui.displayDrinks(drink.drinks.drinks);
                // if(type === 'ingredient') ui.displayDrinks(drink.drinks.drinks);
            }
        })
        .catch(err=>{
            console.log(err)
            ui.printAlert('No results present', 'warning');
        });
    }
}
function resultsAction(e){
    e.preventDefault();
    if(e.target.classList.contains('get-recipe')){
        console.log(e.target.dataset.id)
        api.getSingleRecipe(e.target.dataset.id)
        .then(rec=>{
            // console.log(rec.drinks.drinks[0])
            ui.displayDrinkRecipe(rec.drinks.drinks[0]);
        });
    }
}
function documentReady(){
    const select = document.querySelector('.search-by-type-input');
    if(select) ui.displayOptions();
}