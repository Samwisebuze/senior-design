# UI Specification

## Splash Page

![Splash Page][splashPage]

**A** - This page is a place holder for the static splash page. Click this link to go to the Login Page.

## Sign In

![Sign in Page][login]

- **A** - Input for registered user email.
- **B** - Protected Input for use password.
- **C** - Sign in action button, submits login.
- **D** - Forgot password link to recover account. Links to a forgot password page.
- **E** - Sign up link for new users that dont have login information yet.

## Sign Up

![User Registration Page][signup]

- **A** - Input for new user email.
- **B** - Protected Input for new password.
- **C** - Sign up action button, submits registration.
- **D** - Sign in link, for users who novigated to register on accident.

## After Login

![Home Page][homePage]

- **A** - Log Out Action link.
- **B** - Host component try, click here to grab a new host to place on the network canvas(E).
- **C** - Router component try, click here to grab a new router to place on the network canvas(E).
- **D** - Switch component try, click here to grab a new switch to place on the network canvas(E).
- **E** - The network canvas, for placing network components(B,C,D) to build a network. See the Create Network section for linking nodes.
- **F** - Create Network Action button. Takes the current set on network components (B,C,D) on the network canvas(E) and creates a live network. See Creat Network and Inspect Nodes for the next UI.
- **G** - Delete Network Action Button. Clears a previously configure network schmea from the network canvas(E).

## Create Network

![Network Creation Pge][createNetwork]

- **A** - Host Node Component. The draggabble node can be place on the canvas and wired to any othe network components In slot. By clicking ont the Out slot, you can get a wire to then connect other nodes.
- **B** - Router Node Component. The draggabble node can be place on the canvas and wired to any othe network components In slot. By clicking ont the Out slot, you can get a wire to then connect other nodes.
- **C** - Switch Node Component. The draggabble node can be place on the canvas and wired to any othe network components In slot. By clicking ont the Out slot, you can get a wire to then connect other nodes.
- **D** - Inspect Host Action Button. Triggers the Node Inspection popup for selecting a Host to access via WebSSH.

## Inspect Nodes

![Node Inspection Popup][inspectNode]

- **A** - Inspect Host Action Button. Triggers the Node Inspection popup for selecting a Host to access via WebSSH.
- **B**- Host selection Toggles. Radio Toggle buttons that let users select which host they want to access via WebSSH.
- **C** - Cancel Popup Link. Cancels the Inspect Host popup workflow.
- **D** - Inspect Host Go Link. Starts a WebSSH terminal seesion with the slected(B) host.

## SSH Terminal

![Web SSH Unix Terminal][WebSSH]

- **A** - Web SSH Terminal. A fully featued(depending on the hosts image) bash terminal. Capable of running basic shell programs like ping and nmap. Tis allows the user to configure and test the host internally while it is runnning. Opened in a new tab and can be terminated using the exit shell command.


[splashPage]: img/UISpec_SplashPage.svg
[login]: img/UISpec_SignIn.svg
[signup]: img/UISpec_SignUp.svg
[homePage]: img/UISpec_AfterSignIn.svg
[createNetwork]: img/UISpec_CreateNetwork.svg
[inspectNode]: img/UISpec_SelectNodeSSH.svg
[WebSSH]: img/UISpec_SSHTerminal.svg
