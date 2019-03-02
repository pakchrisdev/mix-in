class UI{
    printAlert(mess, cls){
        const div = document.createElement('div');
        div.className = 'alert';
        div.innerHTML = `<p class="warning">${mess}</p>`;
        const searchSection = document.querySelector('.search-section');
        const form = document.querySelector('.search-section form');
        // const searchHeading = document.querySelector('.search-heading');
        searchSection.insertBefore(div, form);
        setTimeout(()=>{document.querySelector('.alert').remove()}, 1500);
    }
    displayDrinksWithIngredients(drinks){
        const resultsContain = document.querySelector('.search-results-contain');
        drinks.forEach(drink=>{
            resultsContain.innerHTML += `
                <div class="drink-div">
                    <h3 class="drink-div-title">${drink.strDrink}</h3>
                    <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" class="drink-div-img">
                    <div class="drink-div-instructions">
                        <h4>Instructions</h4>
                        <p>${drink.strInstructions}</p>
                    </div>
                    <div class="drink-div-ingredients">
                    <h4>Ingredients</h4>
                        <ul>
                            ${this.displayIngredients(drink)}
                        </ul>
                    </div>
                </div>
            `;
            // console.log(drink)
        });

    }
    displayIngredients(drink){
        // console.log(drink)
        const ingredients = [];
        for(let i=1; i<=15; i++){
            const measure = {};
            if(drink[`strIngredient${i}`] !== ''){
                measure.ingredient = drink[`strIngredient${i}`];
                measure.measure = drink[`strMeasure${i}`];
                ingredients.push(measure)
            }
        }
        let ingredTemp = '';
        ingredients.forEach(ingred=>{
            ingredTemp += `
                <li>${ingred.ingredient} &rArr; ${ingred.measure}</li>
            `;
        })
        return ingredTemp;
    }
    displayDrinks(drinks){
        const resultsContain = document.querySelector('.search-results-contain');
        drinks.forEach(drink=>{
            // console.log(drink)
            resultsContain.innerHTML += `
                <div class="drink-div">
                    <h3 class="drink-div-title">${drink.strDrink}</h3>
                    <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" class="drink-div-img">
                    <a href="#" class="btn get-recipe" data-id="${drink.idDrink}" data-toggle="modal" data-target="#modal">get recipe</a>
                </div>
            `;
        });
    }
    displayDrinkRecipe(drink){
        const modal = document.getElementById('modal');
        const modalTitle = document.querySelector('.modal-title');
        const modalImg = document.querySelector('.modal-img');
        const modalInstructions = document.querySelector('.modal-instructions');
        const modalIngredients = document.querySelector('.modal-ingredients');
        modalTitle.textContent = drink.strDrink;
        modalImg.setAttribute('src',drink.strDrinkThumb);
        modalInstructions.textContent = drink.strInstructions;
        modalIngredients.innerHTML = this.displayIngredients(drink);
        modal.classList.add('modal-visible')
    }
    displayOptions(){
        const optionsList = api.getOptions()
        .then(options=>{
            const list = options.options.drinks;
            // console.log(list)
            const option1 = document.createElement('option');
            const searchTag = document.querySelector('.search-by-type-input');
            option1.textContent = 'Make Selection';
            option1.value = '';
            searchTag.appendChild(option1);
            list.forEach(option=>{
                const opt = document.createElement('option');
                opt.textContent = option.strCategory;
                opt.value = option.strCategory.split(' ').join('_');
                searchTag.appendChild(opt);
            });
        });
    }
    clearResults(){
        const resultsDiv = document.querySelector('.search-results-contain');
        resultsDiv.innerHTML = '';
    }
}