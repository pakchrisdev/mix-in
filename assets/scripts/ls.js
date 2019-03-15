class LS{
    getFromLS(){
        let favorites;
        if(localStorage.getItem('favorites') === null) return favorites = [];
        else return favorites = JSON.parse(localStorage.getItem('favorites'));
    }
    saveToLS(fav){
        const favs = this.getFromLS();
        favs.push(fav);
        localStorage.setItem('favorites', JSON.stringify(favs));
    }
    removeFromLS(id){
        const favs = this.getFromLS();
        favs.forEach((fav,i)=>{
            if(id === fav.id) favs.splice(i,1);
        });
        localStorage.setItem('favorites', JSON.stringify(favs))
    }
}