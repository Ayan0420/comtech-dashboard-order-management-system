console.log('Hello World!');

// [Section] Arrays

    // Arrays are used to store multiple related values in a single variable.
    // They are declared using square brackets ([]) also known as "Array Literals"

    /*
    Syntax:
        let/const arrayName = [elementA, elementB, elementC,... ];
    */
    let grades = [98.5, 94.3, 89.2, 90.1];
    let computerBrands = ['Acer', 'Asus', 'Lenovo', 'Redfox', 'Gateway', 'Toshiba', 'Fujitsu'];
    
    //Possible use of an array but is not recommended
    let mixedArr = [12, 'Asus', null, undefined, {}];

    console.log(grades);
    console.log(computerBrands);
    console.log(mixedArr);

            //Alternative way to write arrays

            let myTasks = [
                'drink html',
                'eat javascript',
                'inhale css',
                'bake sass'
            ]

            console.log(myTasks);

            let city1 = 'Tokyo';
            let city2 = 'Manila';
            let city3 = 'Jakarta';

            let cities = [city1, city2, city3];
            console.log(cities);

// [section] Length Property

        // The .length property allows us to get the set of total number of items in an array.

            console.log(myTasks.length);
            console.log(cities.length);

            let blankArr = [];
            console.log(blankArr.length);

            // Length property can also be used in strings
                let fullName = 'Sir Carlo';
                console.log(fullName.length);
            
                myTasks.length = myTasks.length-1
                console.log(myTasks.length);
                console.log(myTasks);