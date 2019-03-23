class UI{
    errorMessage(message){
        // console.log('ui message')
        const div = document.createElement('div');
        div.className = 'error-message';
        div.innerHTML = `<p>${message}</p>`;
        document.querySelector('.search-result').insertBefore(div, document.querySelector('.search-result .container'));
        setTimeout(()=>{ document.querySelector('.error-message').remove() }, 1500);
    }
    clearResults(){
        const searchResultContainer = document.querySelector('.search-result .container');
        searchResultContainer.innerHTML = '';
        if(document.querySelector('.search-form_input[type="text"]')) document.querySelector('.search-form_input[type="text"]').value = '';
    }
    displayWithIngredients(drinks){
        const searchResultContainer = document.querySelector('.search-result .container');
        drinks.forEach(drink=>{
            // console.log(drink)
            searchResultContainer.innerHTML += `
                <div class="search-results_drink-div">
                    <h3 class="search-results_drink-div_heading">${drink.strDrink}</h3>
                    <div class="search-results_drink-div_category">
                        <span class="category">${drink.strCategory}</span>
                        <span class="alcoholic">${drink.strAlcoholic.toUpperCase()}</span>
                    </div>
                    <img src="${drink.strDrinkThumb}" class="search-results_drink-div_image">
                    <p class="search-results_drink-div_instructions"><strong>Instructions</strong><br>${drink.strInstructions}</p>
                    <p class="search-results_drink-div_ingredients_heading"><strong>Ingredients</strong></p>
                    <ul class="search-results_drink-div_ingredients">
                        ${this.listIngredients(drink)}
                    </ul>
                    <div>
                        <a href="#" class="btn add-to-favorites" data-id="${drink.idDrink}">
                            <i class="fas fa-plus-circle"></i>
                            add to favorites
                        </a>
                    </div>
                </div>
            `;
        });
        this.inFavorites() // label favorites on load
    }
    listIngredients(drink){
        // console.log(drink)
        let ingredients = [];
        for(let i = 1; i<16; i++){
            const measurement = {};
            if(drink[`strIngredient${i}`] !== '' && drink[`strIngredient${i}`] !== null){
                measurement.ingredient = drink[`strIngredient${i}`];
                measurement.measure = drink[`strMeasure${i}`];
                ingredients.push(measurement);
            }
        }
        // console.log(ingredients)
        let template = '';
        ingredients.forEach(ingred=>{
            template += `<li>${ingred.ingredient} &mdash; ${ingred.measure}</li>`;
        });
        return template;
    }
    displayDrinks(drinks){
        // console.log(drinks)
        const searchResultContainer = document.querySelector('.search-result .container');
        drinks.forEach(drink=>{
            searchResultContainer.innerHTML += `
                <div class="search-results_drink-div">
                    <h3 class="search-results_drink-div_heading">${drink.strDrink}</h3>
                    <img src=${drink.strDrinkThumb} class="search-results_drink-div_image">
                    <a href="#" class="btn get-recipe" data-id-modal="${drink.idDrink}">get recipe</a>
                    <div>
                        <a href="#" class="btn add-to-favorites" data-id="${drink.idDrink}">
                            <i class="fas fa-plus-circle"></i>
                            add to favorites
                        </a>
                    </div>
                </div>
            `;
        });
        this.inFavorites() // label favorites on load
    }
    displayDrinkDetails(drink){
        console.log(drink)
        const modalTitle = document.querySelector('.modal-title');
        const modalCategoryDivCategory = document.querySelector('.modal-category-div_category');
        const modalCategoryDivAlcoholic = document.querySelector('.modal-category-div_alcoholic');
        const modalImg = document.querySelector('.modal-img');
        const modalInstructions = document.querySelector('.modal-instructions');
        const modalIngredients = document.querySelector('.modal-ingredients');

        modalTitle.textContent = drink.strDrink;
        modalCategoryDivCategory.textContent = drink.strCategory;
        modalCategoryDivAlcoholic.textContent = drink.strAlcoholic.toUpperCase();
        modalImg.setAttribute('src', drink.strDrinkThumb);
        modalInstructions.innerHTML = `<strong>Instruction: </strong>${drink.strInstructions}`;
        modalIngredients.innerHTML = this.listIngredients(drink);
    }
    insertCategories(){
        const categories = api.getCategories()
        .then(category=>{
            console.log(category.drinks)
            const option1 = document.createElement('option');
            option1.innerHTML = `&mdash; Select &mdash;`;
            option1.value = '';
            document.querySelector('.search-by-category').appendChild(option1);
            category.drinks.forEach(cat=>{
                const option = document.createElement('option');
                option.textContent = cat.strCategory;
                option.value = cat.strCategory.split(' ').join('_');
                document.querySelector('.search-by-category').appendChild(option);
            });
        });
    }
    displayFavorites(favorites){
        const favoritesContainer = document.querySelector('.favorites-container');
        favorites.forEach(fav=>{
            const div = document.createElement('div');
            div.className = 'favorite-div';
            div.innerHTML = `
                <h3>${fav.name}</h3>
                <img src="${fav.img}">
                <a href="#" class="btn get-recipe" data-id-modal="${fav.id}">get recipe</a>
                <a href="#" class="btn remove-from-favorites" data-id="${fav.id}"><i class="fas fa-minus-circle"></i> remove</a>
            `;
            favoritesContainer.appendChild(div);
        })
    }
    removeFromFavorite(drink){
        drink.remove();
    }
    inFavorites(){
        const favs = ls.getFromLS();
        favs.forEach(fav=>{
            const id = fav.id;
            const favDrink = document.querySelector(`[data-id="${id}"]`);
            if(favDrink){
                favDrink.classList.add('added');
                favDrink.innerHTML = `<i class="fas fa-minus-circle"></i> remove from favorites`;
            }
        });
    }
}