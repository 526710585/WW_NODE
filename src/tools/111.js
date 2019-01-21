


function AAA(callback){
    setTimeout(function(){
        var num = 10;
        num++
        callback(num)
    },0)
}


AAA(function(A){console.log(A)})

