const inquirer = require("inquirer");
const fs = require('fs');

const questions = [];

inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: ('What is your project title?')
    },
    {
        type: 'input',
        name: 'description',
        message: ('Please describe your project:')
    },
    {
        type: 'input',
        name: 'install',
        message: ('Please provide installation instructions:')
    },
    {
        type: 'input',
        name: 'usage',
        message: ('Please provide usage information:')
    },
    {
        type: 'input',
        name: 'contribution',
        message: ('Please provide contribution guidelines:')
    },
    {
        type: 'input',
        name: 'test',
        message: ('Please provide test instructions:')
    },
    {
        type: 'list',
        name: 'license',
        message: ('Which license would you like to use?'),
        choices: ['MIT', 'Apache', 'BSD', 'GNU', 'Creative Commons']
    },
    {
        type: 'input',
        name: 'username',
        message: ('What is your GitHub username?')
    },
    {
        type: 'input',
        name: 'email',
        message: ('What is your email address?')
    },
])
.then(answers => {
    // Get the license badge URL based on the selected license
    let licenseBadgeUrl;
    switch (answers.license) {
        case 'MIT':
            licenseBadgeUrl = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
            break;
        case 'Apache':
            licenseBadgeUrl = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
            break;
        case 'BSD':
            licenseBadgeUrl = '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)';
            break;
        case 'GNU':
            licenseBadgeUrl = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
            break;
        case 'Creative Commons':
            licenseBadgeUrl = '[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](https://creativecommons.org/publicdomain/zero/1.0/)';
            break;
        default:
            licenseBadgeUrl = '';
    }

    // Construct the markdown content with license badge
    const markdownContent = `
# ${answers.title}

${licenseBadgeUrl}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation
${answers.install}

## Usage
${answers.usage}

## Contribution
${answers.contribution}

## Tests
${answers.test}

## License
This project is licensed under the ${answers.license} license.

## Questions
For questions or inquiries, please contact:
- GitHub: [${answers.username}](https://github.com/${answers.username})
- Email: ${answers.email}
`;

    // Write the markdown content to a new readme.md file
    fs.writeFile('readme.md', markdownContent, (err) => {
        if (err) {
            console.error('Error writing to readme.md file:', err);
        } else {
            console.log('readme.md file created successfully!');
        }
    });
})
.catch(error => {
    console.error('Error occurred:', error);
});