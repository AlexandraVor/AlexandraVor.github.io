  class Bot {
    constructor(chips, turn){
        this.chips = chips;
        this.turn = turn;
    }
    
    doTurn(){
        let getVector = () => {
            let r = Math.floor(Math.random() * 2);
            if(r==0) return -1;
            return 1; 
        }
        let v = getVector();
        let sheep = this.chips.find(c => !c.isWolf);
        if(this.turn == 'sheep'){ //ходы овцы
            
            let i = sheep.i;
            let j = sheep.j;

            // вверх и влево
            if(sheep.possibleTurn(this.chips, i - 1, j + v)){
                sheep.i = i - 1;
                sheep.j = j + v;
                return;
            }
            //вверх и вправо
            if(sheep.possibleTurn(this.chips, i - 1, j - v)){
                sheep.i = i - 1;
                sheep.j = j - v;
                return;
            }
             //вниз и вправо
            if(sheep.possibleTurn(this.chips, i + 1, j + v)){
                sheep.i = i + 1;
                sheep.j = j + v;
                return;
            }
            //вниз и влево
            if(sheep.possibleTurn(this.chips, i + 1, j - v)){
                sheep.i = i + 1;
                sheep.j = j - v;
                return;
            }
           
        } else { // условие игры волков 
            let wolfs = this.chips.filter(c => c.isWolf).sort((a, b) => {
                let distanceA = Math.abs(sheep.i - a.i) + Math.abs(sheep.j - a.j);
                let distanceB = Math.abs(sheep.i - b.i) + Math.abs(sheep.j - b.j);
                return distanceA - distanceB;
            });

            for(let wolf of wolfs){
                let i = wolf.i;
                let j = wolf.j;
                if(wolf.possibleTurn(this.chips, i + 1, j + v)){
                    wolf.i = i + 1;
                    wolf.j = j + v;
                    return;
                }
                if(wolf.possibleTurn(this.chips, i + 1, j - v)){
                    wolf.i = i + 1;
                    wolf.j = j - v;
                    return;
                }
            }
        }
    }
}