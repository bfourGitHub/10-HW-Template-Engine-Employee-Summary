const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");

const employeeList = [];


// Ask user for manager info
function askUserForManagerInfo() {

    lineBreak ();
    console.log("Welcome to your Software Engineering Team Generator!");
    console.log("Respond to the following prompts to create, expand and manage your team!");
    console.log("A team roster will then be generated and stored in your OUTPUT folder.");
    lineBreak ();

    return inquirer.prompt([
        {
            message: "Please enter manager's name.",
            name: "name",
            type: "input"
        },
        {
            message: "Please enter manager's id.",
            name: "id",
            type: "input"
        },
        {
            message: "Please enter manager's email.",
            name: "email",
            type: "input"
        },
        {
            message: "Please enter manager's office number.",
            name: "officeNumber",
            type: "input"
        }
    ]).then(( managerData ) => {

        //
        const newManager = new Manager( managerData.name, managerData.id, managerData.email, managerData.officeNumber)
        
        employeeList.push( newManager );

        lineBreak ();

        askUserForEmployeeType();
    });

}

// Ask user for next employee type
function askUserForEmployeeType() {

    return inquirer.prompt([
        {
            message: "Would you like to add a new employee?",
            name: "employeeType",
            type: "list",
            choices: ["Engineer", "Intern", "None"]
        }
    ]).then(( newEmployeeChoiceData ) => {

        switch ( newEmployeeChoiceData.employeeType ) {
            case "Engineer":
                askUserForEngineerInfo();
                break;
            case "Intern":
                askUserForInternInfo();
                break;
            case "None":
                createHtmlFile();

                break;

        }
        // Use SWITCH CASE to loop between options
        // If they selected a new Engineer    
        // ELSE if the user selected a new Intern
        // ELSE  if they dont choose a new employee    

    });
}

// Ask user for engineer info
function askUserForEngineerInfo() {

    return inquirer.prompt([
        {
            message: "Please enter the new engineer's name.",
            name: "name",
            type: "input"
        },
        {
            message: "Please enter the new engineer's id.",
            name: "id",
            type: "input"
        },
        {
            message: "Please enter the new engineer's email address.",
            name: "email",
            type: "input"
        },
        {
            message: "Please enter the new engineer's GitHub username.",
            name: "github",
            type: "input"
        },
    ]).then(( engineerData ) => {

        const newEngineer = new Engineer( engineerData.name, engineerData.id, engineerData.email, engineerData.github)
        
        employeeList.push( newEngineer );

        lineBreak ();

        askUserForEmployeeType();

    });
}

// Ask user for intern info
function askUserForInternInfo() {

    return inquirer.prompt([
        {
            message: "Please enter the new intern's name.",
            name: "name",
            type: "input"
        },
        {
            message: "Please enter the new intern's id.",
            name: "id",
            type: "input"
        },
        {
            message: "Please enter the new intern's email address.",
            name: "email",
            type: "input"
        },
        {
            message: "Please enter the new intern's school.",
            name: "school",
            type: "input"
        },
    ]).then(( internData ) => {

        const newIntern = new Intern( internData.name, internData.id, internData.email, internData.school)
        
        employeeList.push( newIntern );

        lineBreak ();

        askUserForEmployeeType();

    });
}

function createHtmlFile() {

    lineBreak ();
    const htmlContent = render( employeeList );

    // Use the FS module to create the output file
    fs.writeFile(outputPath, htmlContent , function (err) {
        if (err) throw err;
        console.log("Success! Your team roster has been generated.");
      });

};

function lineBreak() {
    console.log(`=======================================================`);
};


askUserForManagerInfo();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
