module.exports = (x,y,callback) => { 
    if(x <= 0 || y <= 0){
        setTimeout(() => 
         callback(new Error("Dimension should be greater than zero l " + x  + "and B " + y),
         null) ,
         2000);
        console.log();
    
    }
    else {
        setTimeout(() => 
         callback(null,
         {perimeter: (x,y) =>(2*(x+y)),
            area :(x,y) => (x*y)}) ,
         2000);
        console.log();
    

    }

}





// perimeter =  (x,y) =>(2*(x+y)),
// area = (x,y) => (x*y)
