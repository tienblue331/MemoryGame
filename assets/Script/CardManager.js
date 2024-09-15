// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var Card = require('./Card');

cc.Class({
    extends: cc.Component,

    properties: {
        cardPrefab: {
            default: null,
            type: cc.Prefab,
        },

        cardImages: {
            default: [],
            type: cc.SpriteFrame,
        },

        restartBtn: {
            default: null,
            type: cc.Button,
        }
    },

    card1: null,
    card2: null,

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.restartBtn.node.active = false;
        this.init();
    },

    init() {
        //let numbers = [...Array(12).keys()].map(num => num % 6)
        var numbers = [];
        for(let i=0; i<12; i++) {
            numbers.push(i%6);
        }

        var randomArray = [];
        while (numbers.length > 0) {
            const randomIndex = Math.floor(Math.random() * numbers.length); // Generate a random index between 0 and numbers.length
            randomArray.push(numbers[randomIndex]); // Add the number at the random index to the randomArray
            numbers.splice(randomIndex, 1); // Remove the number at the random index from the numbers array
        }

        for (var i = 0; i < 12; i++) {

            // Instantiate the prefab
            var cardNode = cc.instantiate(this.cardPrefab);  
            cardNode.parent = this.node;

            var card = cardNode.getComponent(Card);
            {
                card.index = randomArray[i];
                card.frontImage.spriteFrame = this.cardImages[card.index];
                card.frontFace.active = false;
                card.cardManager = this;
            }

            var col = Math.floor(i / 4);
            var row = i % 4;
            cardNode.setPosition(-300 + 200 * row, -140 + 140 * col);
            //this.node.addChild(cardNode);
        }
    },

    restart() {
        this.node.removeChild(this.card1.node);
        this.node.removeChild(this.card2.node);

        this.card1 = null;
        this.card2 = null;

        this.restartBtn.node.active = false;

        this.init();
    },

    checkCard(card) {
        if(this.card1 == card) return;

        if(this.node.children.length == 2) {
            this.card2 = card;
            this.restartBtn.node.active = true;
            return;
        }

        if(this.card1 == null) {
            this.card1 = card;
            return;
        }

        if(this.card2 == null) {
            this.card2 = card;
            return;
        }

        if(this.card1.index == this.card2.index) {

            this.node.removeChild(this.card1.node);
            this.node.removeChild(this.card2.node);

            this.card1 = card;
            this.card2 = null;
        }
        else {
            this.card1.frontFace.active = false;
            this.card2.frontFace.active = false;
                        
            this.card1 = card;
            this.card2 = null;
        }
    }

    // update (dt) {},
});
