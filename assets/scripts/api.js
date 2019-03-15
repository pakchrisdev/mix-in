
class API{
    getByName(name){
        return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
        .then(res=>res.json())
        .catch(err=>{
            console.log(err)
            ui.errorMessage('No results');
        });
    }
    getByIngredient(ingredient){
        return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then(res=>res.json())
        .catch(err=>{
            console.log(err)
            ui.errorMessage('No results');
        });
    }
    getRecipe(id){
        return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res=>res.json());
    }
    getCategories(){
        return fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`)
        .then(res=>res.json());
    }
    getByCategory(category){
        return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(res=>res.json());
    }
}