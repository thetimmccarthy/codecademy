const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this._field = field;
   }

   get field() {
       return this._field;
   }

    print() {
        for (let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(''));
        };

        
    }

    playGame() {
        let i = 0;
        let j = 0;
        let foundHat = false;
        let move;
        while(!foundHat) {
            this.print();
            move = prompt('Which way?').toLowerCase();
            if (move === 'r') {
                if(typeof this.field[i][j+1] === 'undefined') {
                    // make sure you're handling this correctly
                    console.log('Outside of the board, Loser!');
                    break;
                } else {
                    j++;
                    if(this.field[i][j] === hole) {
                        console.log('You fell in a hole, Loser!')
                        break;
                    } else if (this.field[i][j] === hat) {
                        console.log('Winner!');
                        foundHat = true;
                        break;
                    } else {
                        this.field[i][j] = pathCharacter;
                    }
                

                } 
                

            } else if (move === 'l') {
                if(typeof this.field[i][j-1] === 'undefined') {
                    // make sure you're handling this correctly
                    console.log('Outside of the board, Loser!');
                    break;
                } else {
                    j--;
                    if(this.field[i][j] === hole) {
                        console.log('You fell in a hole, Loser!')
                        break;
                    } else if (this.field[i][j] === hat) {
                        console.log('Winner!');
                        foundHat = true;
                        break;
                    } else {
                        this.field[i][j] = pathCharacter;
                    }
                

                } 
            } else if (move === 'u') {
                try {
                    i--;
                    if(this.field[i][j] === hole) {
                        console.log('You fell in a hole, Loser!')
                        break;
                    } else if (this.field[i][j] === hat) {
                        console.log('Winner!');
                        foundHat = true;
                        break;
                    } else {
                        this.field[i][j] = pathCharacter;
                    }
                } catch {
                    console.log('Outside of the board, Loser!');
                    break;
                }
            } else if (move === 'd') {
                try {
                    i++;
                    if(this.field[i][j] === hole) {
                        console.log('You fell in a hole, Loser!')
                        break;
                    } else if (this.field[i][j] === hat) {
                        console.log('Winner!');
                        foundHat = true;
                        break;
                    } else {
                        this.field[i][j] = pathCharacter;
                    }
                } catch {
                    console.log('Outside of the board, Loser!');
                    break;
                }
            }   



        


        }
        
}

    static generateField(height, width) { 
        let field = []
        let choices = [fieldCharacter, fieldCharacter, hole];  
        let hatY = Math.floor(Math.random() * (width - 1));
        let hatX = Math.floor(Math.random() * (height - 1));


        for (let i = 0; i < height; i++) {
            let rows = []
            for (let j = 0; j < width; j++) {
                let choice = Math.floor(Math.random() * 3);
                
                rows.push(choices[choice]);
            }

            
            field.push(rows);
        }
        
        field[hatX][hatY] = hat;
        if(hatX === 0 && hatY === 0) {
            field[height - 1][width - 1] = pathCharacter;
        } else {
            field[0][0] = pathCharacter;
        }
        return field;
    }
    

}

let newField = Field.generateField(5,5);

const myField = new Field(newField);

myField.playGame();

