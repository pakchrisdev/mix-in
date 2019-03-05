class LS{
    getFromLS(){
        let drinks;
        if(localStorage.getItem('drinks') === null) drinks = [];
        else drinks = JSON.parse(localStorage.getItem('drinks'));
        return drinks;
    }
    saveToLS(drink){
        const drinks = this.getFromLS();
        drinks.push(drink);
        localStorage.setItem('drinks', JSON.stringify(drinks));

    }
    removeFromLS(id){
        const drinks = this.getFromLS();
        drinks.forEach((drink,i)=>{
            if(id === drink.id){
                drinks.splice(i,1);
            }
            localStorage.setItem('drinks', JSON.stringify(drinks));
        });
    }
}