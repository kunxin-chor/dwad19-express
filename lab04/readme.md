1. Make sure your terminal is in the correct directory (see the last forward slash onward)

2. Type in `npm init`

3. You will be asked  a lot of questions. Just keep pressing ENTER
until you see the `$` prompt

4. We need to install Express: `npm install express`

5. Install Node monitor with `npm install -g nodemon`. The `-g` to install to operating system instead of the project.
   * If you are install node monitor on your own computer, you only need do install once
   * But if using Gitpod, everytime you restart the workspace you have to reinstall `nodemon`

6. Create the `index.js` in the Node application folder

7. In the terminal, start server by typing `nodemon`

8. Open the browser to get the URL
   * On Gitpod: click on the `Ports` tab and click on the globe for Port 3000
   * Using your own computer: The web address will be `https://localhost:3000`  (replace 3000 with the port number that you are using) 

9. In the terminal, type in `npm install hbs` or `yarn add hbs`
(Note: to check if installation worked, look at the `package.json` file)

10. To be able to use static files (JS, images and CSS), create a `public` folder in the application folder

11. Add `app.use(express.static('public))` after the application is created

12. Create your .css or .js files in the `public` folder or put images there

13. Install wax-on with `npm install wax-on` at the terminal.  This will install wax-on that allow us to create layout files in our Express.

