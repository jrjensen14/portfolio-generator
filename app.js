const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-template.js');

const promptUser = () => {
   return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your github username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }

    ]); 
};

// promptUser().then(answers => console.log(answers));

const promptProject = portfolioData => {
    console.log(`
=================
Add a New Project
=================    
`);

// If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
            portfolioData.projects = [];
    }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: projectName => {
                if (projectName) {
                    return true;
                } else {
                    console.log('Please enter projects name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a descritption of your project (Required)',
            validate: projectDescriptin => {
                if (projectDescriptin) {
                    return true;
                } else {
                    console.log('Please enter a descrition!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: githubLink => {
                if (githubLink) {
                    return true
                } else {
                    console.log('Please enter your GitHub link!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])       
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};
promptUser()
    // .then(answers => console.log(answers))
    .then(promptProject)
    .then(portfolioData => {
        // console.log(portfolioData);
        const pageHTML = generatePage(portfolioData);

        fs.writeFile('./index.html', pageHTML, err => {
            if (err) throw new Error(err);

            console.log('Portfolio complete! Check out index.html to see the output!');
        });
    });


// console.log(inquirer);




// const profileDataArgs = process.argv.slice(2);


// const [name, github] = profileDataArgs;

// const github = profileDataArgs[1];
// console.log(profileDataArgs);



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