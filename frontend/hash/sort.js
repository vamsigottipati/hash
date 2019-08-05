const mainJSONObj = require('./emoji_json_files//messenger_emoji.json')
var fs = require("fs")
var jsonObj = mainJSONObj

// seperate all the object with skin_variations as a parameter

var skin_variations_objs = []
var plain_emoji_objs = []

var i = 0
var j = 0

while (i < jsonObj.length) {
    
    var keys = Object.keys(jsonObj[i])
    if (keys.includes('skin_variations')) {
        values_of_skin_var_obj = Object.values(jsonObj[i].skin_variations)
        for (let index = 0; index < values_of_skin_var_obj.length; index++) {
            if (values_of_skin_var_obj[index].has_img_messenger) {
                skin_variations_objs.push(values_of_skin_var_obj[index])
            }
        }
    }

    i++
}
i = 0

while (i < jsonObj.length) {
    
    var keys = Object.keys(jsonObj[i])
    if (!keys.includes('skin_variations')) {
        if (jsonObj[i].has_img_messenger) {
            plain_emoji_objs.push(jsonObj[i])
        }
    }

    i++
}
i = 0

var final_array = skin_variations_objs.concat(plain_emoji_objs)

// Categorise by categories

// flags

var flag_emoji = []

while (i < final_array.length) {
    
    if(final_array[i].category== "Flags") {
        flag_emoji.push(final_array[i])
    }

    i++
}
i = 0

// smilies

var smiley_emoji = []

while (i < final_array.length) {
    
    if(final_array[i].category== "Smileys & People") {
        smiley_emoji.push(final_array[i])
    }

    i++
}
i = 0

// activities

var activities_emoji = []

while (i < final_array.length) {
    
    if(final_array[i].category== "Activities") {
        activities_emoji.push(final_array[i])
    }

    i++
}
i = 0

// Objects

var objects_emoji = []

while (i < final_array.length) {
    
    if(final_array[i].category== "Objects") {
        objects_emoji.push(final_array[i])
    }

    i++
}
i = 0

// travel and places

var t_s_emoji = []

while (i < final_array.length) {
    
    if(final_array[i].category== "Travel & Places") {
        t_s_emoji.push(final_array[i])
    }

    i++
}
i = 0

// symbols

var symbols_emoji = []

while (i < final_array.length) {
    
    if(final_array[i].category== "Symbols") {
        symbols_emoji.push(final_array[i])
    }

    i++
}
i = 0

// animals and natures

var animals_emoji = []

while (i < final_array.length) {
    
    if(final_array[i].category== "Animals & Nature") {
        animals_emoji.push(final_array[i])
    }

    i++
}
i = 0

// food and dinks

var f_d_emoji = []

while (i < final_array.length) {
    
    if(final_array[i].category== "Food & Drink") {
        f_d_emoji.push(final_array[i])
    }

    i++
}
i = 0

// write files

fs.writeFile("./emoji_json_files//skin_variantions.json", JSON.stringify(plain_emoji_objs), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});

fs.writeFile("./emoji_json_files//plain.json", JSON.stringify(skin_variations_objs), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});

fs.writeFile("./emoji_json_files//all.json", JSON.stringify(final_array), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});

// category files


fs.writeFile("./emoji_json_files//objects.json", JSON.stringify(objects_emoji), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});

fs.writeFile("./emoji_json_files//smileys.json", JSON.stringify(smiley_emoji), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});

fs.writeFile("./emoji_json_files//flags.json", JSON.stringify(flag_emoji), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});

fs.writeFile("./emoji_json_files//activities.json", JSON.stringify(activities_emoji), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});

fs.writeFile("./emoji_json_files//travel.json", JSON.stringify(t_s_emoji), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});

fs.writeFile("./emoji_json_files//symbols.json", JSON.stringify(symbols_emoji), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});

fs.writeFile("./emoji_json_files//animals.json", JSON.stringify(animals_emoji), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});

fs.writeFile("./emoji_json_files//food.json", JSON.stringify(f_d_emoji), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});

//  create a file for easy usage in scss file

var scss_json_obj = []

for (let index = 0; index < final_array.length; index++) {
    var x = final_array[index].unified.toLowerCase()
    scss_json_obj.push(x)
}

console.log(scss_json_obj)

fs.writeFile("./emoji_json_files//scss.json", JSON.stringify(scss_json_obj), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});