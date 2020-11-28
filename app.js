const fs = require('fs');

const profileDataArgs = process.argv.slice(2);

const [name, github] = profileDataArgs;

// const github = profileDataArgs[1];
// console.log(profileDataArgs);

// const generatePage = (userName, githubName) => {
//     return `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <meta http-equiv="X-UA-Compativle" content="ie=edge">
//         <title>Portfolio Demo</title>
//     </head>

//     <body>
//         <h1>${name}</h1>
//         <h2><a href="http://github.com/${github}">Github</a></h2>
//     </body>
//     </html>
//     `;
// };

fs.writeFile('src', generatePage(name, github), err => {
    if (err) throw err;

    console.log('Portfolio complete! Check out index.html to see the output!');
});
//         Name: ${userName}
//         Github: ${githubName}
//     `;
// };
// console.log(name, github);
// console.log(generatePage(name, github));


// const printProfileData = profileDataArr => {
//     // This...
//     for (let i = 0; i < profileDataArr.length; i+= 1) {
//         console.log(profileDataArr[i]);
//     }
//     console.log('=================');

//     // Is the same as this...
//     profileDataArr.forEach(profileItem => console.log(profileItem));
// };
// printProfileData(profileDataArgs);