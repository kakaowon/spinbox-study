/**
 * Created by won on 2017. 1. 14..
 */
function Spinbox($context) {
    this.MAX_VALUE = 100;
    this.MIN_VALUE = 0;
    this.$input = $context.find('.__value');
    this.value = parseInt(this.$input.val(), 10);
    this.attachEvents($context);
}

/*
 1. 증가버튼을 클릭하면 인풋박스의 값이 +1된다.
 2. 감소버튼을 클릭하면 인풋박스의 값이 -1된다.
 3. 인풋박스의 값 최대값 : 100
 4. 인풋박스의 값 최소값 : 0
 5. 사용자가 키 입력 방어 처리
 */
Spinbox.prototype = {
    attachEvents: function($context) {
        // this = spinbox
        $context.on('click', 'button', this.onClickButtons.bind(this)); // this = spinbox
        $context.on('blur', '.__value', this.onBlurInput.bind(this)); // this = spinbox
    },

    onBlurInput : function(e){
        var inputValue = $(e.target).val();

        if (this.isMoreThanMaxValue(inputValue) || this.isLessThanMinValue(inputValue)) {
            alert("입력은 " + this.MIN_VALUE + "~" + this.MAX_VALUE + "사이의 숫자만 입력가능합니다.");
            this.updateValue(this.value);

        } else {
            this.updateValue(inputValue);
        }
    },

    onClickButtons: function(e) {
        if ($(e.target).hasClass('__increment')) {
            this.increase();
        } else {
            this.decrease();
        }
    },

    increase: function() {
        if (this.isMoreThanMaxValue(this.value)) {
            alert("더이상 증가할 수 없습니다.");
            return;
        }
        this.updateValue(this.value + 1);

    },

    decrease: function() {
        if (this.isLessThanMinValue(this.value)) {
            alert("더이상 감소할 수 없습니다.");
            return;
        } 
        this.updateValue(this.value - 1);
    },

    isLessThanMinValue : function(value) {
        return value <= this.MIN_VALUE
    },

    isMoreThanMaxValue : function(value) {
        return value >= this.MAX_VALUE
    },

    updateValue : function(newValue){
        this.value = parseInt(newValue, 10);
        this.$input.val(this.value);
    }
};