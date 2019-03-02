class API{
    async getDrinkByName(name){
        const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        const drinks = await resp.json();
        return { drinks };
    }
    async getDrinksByIngredient(ing){
        const re = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ing}`);
        const drinks = await re.json();
        return { drinks };
    }
    async getSingleRecipe(id){
        const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const drinks = await resp.json();
        return { drinks };
    }
    async getOptions(){
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const options = await response.json();
        return { options };
    }
    async getDrinksByCategory(category){
        const re = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        const drinks = await re.json();
        return { drinks };
    }
}