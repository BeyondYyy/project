

var oB = document.querySelector(".p2 #b")
console.log(oB)
oB.onclick = function(){
    this.value = random(1000,9999);
}















function random(a,b){
    return Math.round(Math.random() * (a -b) + b)
}

