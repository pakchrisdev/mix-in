const ui = new UI();
const api = new API();
const ls = new LS();

function eventListeners(){
    document.addEventListener('DOMContentLoaded', documentReady);
    const searchForm = document.querySelector('.search-form');
    if(searchForm) searchForm.addEventListener('submit', getDrinks);

    const searchResultContainer = document.querySelector('.search-result .container');
    if(searchResultContainer) searchResultContainer.addEventListener('click', resultsDivAction);
}
eventListeners();

function getDrinks(e){
    e.preventDefault();
    const searchInput = document.querySelector('.search-form_input');
    if(searchInput.value === '') ui.errorMessage('Please enter a term.');
    else{
        let searchType;
        const type = document.querySelector('[data-search-type]').dataset.searchType;
        switch(type){
            case 'name': searchType = api.getByName(searchInput.value);
            break;
            case 'ingredient' : searchType = api.getByIngredient(searchInput.value);
            break;
            case 'category': searchType = api.getByCategory(searchInput.value);
            break;
        }
        ui.clearResults(); // clears previous search results

        searchType.then(data=>{
            if(data.drinks === null) ui.errorMessage('No results found.');
            // console.log(data)
            if(type === 'name') ui.displayWithIngredients(data.drinks);
            else ui.displayDrinks(data.drinks);
        });
    }
}
function resultsDivAction(e){
    e.preventDefault();

    const closeModal = document.querySelector('.close-modal');
    if(closeModal) closeModal.addEventListener('click', ()=>{ document.querySelector('.modal').classList.remove('active') });
    
    if(e.target.classList.contains('get-recipe')){
        api.getRecipe(e.target.dataset.idModal)
        .then(recipe=>{
            // console.log(recipe.drinks[0])
            ui.displayDrinkDetails(recipe.drinks[0]);
            document.querySelector('.modal').classList.add('active');
        });
    }

    if(e.target.classList.contains('add-to-favorites')){
        if(e.target.classList.contains('added')){
            e.target.classList.remove('added');
            e.target.innerHTML = `<i class="fas fa-plus-circle"></i> add to favorites`;
            ls.removeFromLS(e.target.dataset.id); // remove from LS
        } else{
            e.target.classList.add('added');
            e.target.innerHTML = `<i class="fas fa-minus-circle"></i> remove from favorites`;
            // console.log(e.target.parentElement.querySelector('[data-id]').dataset.id)
            const drink = e.target.parentElement;
            const drinkInfo = {
                id: drink.querySelector('[data-id]').dataset.id,
                name: drink.querySelector('.search-results_drink-div_heading').textContent,
                img: drink.querySelector('.search-results_drink-div_image').src,
            };
            console.log(drinkInfo)
            ls.saveToLS(drinkInfo);
        }
    }
}
function documentReady(){
    ui.inFavorites() // label favorites on load

    const searchByCategory = document.querySelector('.search-by-category');
    if(searchByCategory) ui.insertCategories();

    const favoritesContainer = document.querySelector('.favorites-container');
    if(favoritesContainer){
        const favs = ls.getFromLS();
        ui.displayFavorites(favs);

        favoritesContainer.addEventListener('click', e=>{
            e.preventDefault();
            if(e.target.classList.contains('get-recipe')){
                api.getRecipe(e.target.dataset.idModal)
                .then(recipe=>{
                    ui.displayDrinkDetails(recipe.drinks[0]);
                    document.querySelector('.modal').classList.add('active');
                });
            }
            const closeModal = document.querySelector('.close-modal');
            if(closeModal) closeModal.addEventListener('click', ()=>{ document.querySelector('.modal').classList.remove('active') });

            if(e.target.classList.contains('remove-from-favorites')){
                console.log(e.target.dataset.id)
                ui.removeFromFavorite(e.target.parentElement);
                ls.removeFromLS(e.target.dataset.id)
            }
        })
    }
}