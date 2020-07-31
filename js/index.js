var obj = {
    $wrapper: $('.wrapper'),
    $btn: $('.slider-btn'),
    $slider: $('.slider-img'),
    len: $('.slider-img').length,
    nowIndex: 0,
    lastIndex: undefined,
    flag: true,
    timer: null,
    init: function () {
        if (this.len > 1) {
            this.createDom();
            this.bindEvent();
            // this.createTimer();
        };
    },
    createDom: function () {
        var str = '',
            strBtn = '';
        for (var i = 0; i < this.len; i++) {
            if (i == 0) {
                str += '<li class="active"></li>';
            } else {
                str += '<li></li>';
            }
        }
        str = '<div class="slider-circle"><ul>' + str + '</ul></div>';
        strBtn = '<div class="slider-btn">\
                      <span class="left-btn"></span>\
                      <span class="right-btn"></span>\
                  </div>';
        this.$wrapper.append(strBtn).append(str)
    },
    bindEvent: function () {
        var that = this;
        $('.left-btn').add($('.right-btn')).add($('.slider-circle li')).on('click', function () {
            if ($(this).attr('class') == 'left-btn') {
                that.toFun('left');
            } else if ($(this).attr('class') == 'right-btn') {
                that.toFun('right');
            } else {
                var value = $(this).index();
                that.toFun(value);
            }
        });
        this.$slider.on('in', function () {
            $(this).delay(300).fadeIn(300)
                   .find($('.title')).delay(300).slideDown().end()
                   .find($('.image')).delay(300).animate({width: 300, height: 300}, function(){
                       that.flag = true;
                   });
        });
        this.$slider.on('out', function () {
            $(this).fadeOut(300)
                   .find($('.title')).slideUp().end()
                   .find($('.image')).animate({width: 0, height: 0})
        })
    },
    getIndex: function (direction) {
        this.lastIndex = this.nowIndex;
        if (direction == "left") {
            this.nowIndex = this.nowIndex == 0 ? this.len - 1 : this.nowIndex - 1;
        } else if (direction == "right") {
            this.nowIndex = this.nowIndex == this.len - 1 ? 0 : this.nowIndex + 1;
        } else {
            this.nowIndex = direction;
        }
    },
    changeSliderCircle: function () {
        $('.slider-circle li').removeClass('active');
        $('.slider-circle li').eq(this.nowIndex).addClass('active');
    },
    toFun: function (direction) {
        if (this.flag) {
            this.getIndex(direction);
            if(this.nowIndex != this.lastIndex){
                this.flag = false;
                this.$slider.eq(this.lastIndex).trigger('out');
                this.$slider.eq(this.nowIndex).trigger('in');
                this.changeSliderCircle();
                this.createTimer();
            }
        }
    },
    createTimer: function() {
        clearTimeout(this.timer);
        var that = this;
        this.timer = setTimeout(function() {
            that.toFun('right');
        },3000)
    }
}

obj.init();