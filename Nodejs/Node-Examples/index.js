var rect = {
    perimeter: (x,y) =>(2*(x+y)),
    area: (x,y) => (x*y)

};

function solveRect(l,b){
    console.log("Solving for reactangle with l " + l + "and b = " + b);

    if(l <= 0 || b <= 0){
        console.log("Dimension should be greater than zero l " + l  + "and B " + b);

        console.log("Area of the reacangle is :: " + rect.area(l,b));
        console.log("Area of the Perimeter is :: " + rect.perimeter(l,b));


    }
}

solveRect(2,4);
solveRect(3,5);
solveRect(0,5);
solveRect(-1,5);