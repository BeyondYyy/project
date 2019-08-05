;(function($){
    "user strict"
    $.fn.banner = function(options){
        var that = this;
        // console.log(this)
        var ban = {};
        ban.list = options.list === false ? false : true;
        ban.autoPlay = options.autoPlay === false ? false : true;
        ban.delayTime = options.delayTime || 2000;
        ban.moveTime = options.moveTime || 300;
        if(options.index >= options.imgs.length-1){
            ban.index = options.imgs.length-1;
        }else if(options.index >= 0 && options.index <= options.imgs.length -1){
            ban.index = options.index;
        }else{
            ban.index = 0;
        }
        ban.iPrev = 0;
        ban.init = function(){
            if(!ban.list) return;
            this.ul = $("<ul>");
            var str = "";
            for(var i = 0;i < options.imgs.length;i++){
                str += `<li>${i+1}</li>`
            }
            // console.log(str);
            this.ul.html(str);
            that.append(this.ul);
            this.ul.css({
                width:"20%",
                height:"25px",
                position:"absolute",
                right:0,
                bottom:"10px",
                display:"flex",
                padding:0,
                margin:0
            }).children().css({
                listStyle:"none",
                lineHeight:"25px",
                // flex:1,
                backgroundColor:"rgba(200,200,200,0.6)",
                width:"25px",
                textAlign:"center",
                // borderLeft:"1px #fff solid",
                // borderRigth:"1px #fff solid"
                borderRadius:"50%",
                marginLeft:"4px"
            }).eq(ban.index).css({
                backgroundColor:"blue",
                color:"#fff"
            })
            this.listActive();
        }

        ban.listActive = function(){
            var _this = this;
            this.ul.children("li").click(function(){
                if($(this).index() > _this.index){
                    // console.log("向左");
                    _this.listMove(1,$(this).index());
                }
                if($(this).index() < _this.index){
                    // console.log("向右");
                    _this.listMove(-1,$(this).index());
                }
                _this.index = $(this).index();

                _this.ul.children("li").css({
                    backgroundColor:"rgba(200,200,200,0.6)",
                    color:""
                }).eq(_this.index).css({
                    backgroundColor:"blue",
                    color:"#fff"
                })
            })
        }    
        ban.listMove = function(type,iNow){
            //走:this.index
            //进来:iNow
            options.imgs.eq(this.index).css({
                left:0
            }).stop().animate({
                left:-options.imgs.eq(0).width() * type
            },this.moveTime).end().eq(iNow).css({
                left:options.imgs.eq(0).width() * type
            }).stop().animate({
                left:0
            },this.moveTime)
        }

        ban.btnActive  = function(){
            if(!(options.left != undefined && options.left.length > 0 && options.right != undefined && options.right.length > 0))
            return;
            var _this = this;
            options.left.on("click",this.leftClick.bind(this));
            options.right.on("click",this.rightClick.bind(this));
        }
        
        ban.leftClick = function(){
            if(this.index == 0){
                this.index = options.imgs.length - 1;
                this.iPrev = 0
            }else{
                this.index--;
                this.iPrev = this.index + 1;
            }
            this.btnMove(1);         
        }
        
        ban.rightClick = function(){
            if(this.index == options.imgs.length - 1){
                this.index = 0;
                this.iPrev = options.imgs.length - 1;
            }else{
                this.index++;
                this.iPrev = this.index - 1;
            }
            this.btnMove(-1);           
        }


        ban.btnMove = function(type){
            // 要走的：this.iPrev
            // 要进来：this.index
            options.imgs.eq(this.iPrev).css({
                left:0
            }).stop().animate({
                left:options.imgs.eq(0).width() * type
            },this.moveTime).end().eq(this.index).css({
                left:-options.imgs.eq(0).width() * type
            }).stop().animate({
                left:0
            },this.moveTime)

            if(!this.list) return
            this.ul.children("li").css({
                backgroundColor:"rgba(200,200,200,0.6)",
                color:""
            }).eq(this.index).css({
                backgroundColor:"blue",
                color:"#fff"
            })
        }
        
        ban.autoActive = function(){
            if(!ban.autoPlay) return;
            var _this = this;
            this.t = setInterval(()=>{
                this.rightClick();
            },this.delayTime);

            that.hover(function(){
                clearInterval(_this.t);
            },function(){
                _this.t = setInterval(()=>{
                    _this.rightClick();
                },_this.delayTime)
            })
        }

        ban.init();
        ban.btnActive();
        ban.autoActive();
    }
})(jQuery);