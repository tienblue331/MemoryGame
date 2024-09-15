// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        backFace: {
            default: null,
            type: cc.Node,
        },

        frontFace: {
            default: null,
            type: cc.Node,
        },

        frontImage: {
            default: null,
            type: cc.Sprite,
        }
    },

    index: 0,
    cardManager: null,

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    mouse_clicked() {
        this.frontFace.active = true;
        
        this.cardManager.checkCard(this);
    }

});
