console.log("Welcome to Holberton School, what is your name?");
stdin(function(input) {
    console.log(`Your name is: ${input}`);
    console.log("This important software is now closing");
    process.exit();
});