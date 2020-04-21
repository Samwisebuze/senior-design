# Assessments: Final Self-Assessments (Spring)

## Korey Huskonen

My primary contribution to Virtuoso is the Virtual Network Creation Engine (VNCE), the component responsible for creating and configuring the actual “virtual devices” on the server. Developing the VNCE, which I dubbed Containeroso, provided ample opportunity to build upon the skills I mentioned in the fall, mainly applied networking and software containerization. Containeroso is ultimately a Python Flask app that manages the lifecycle of Docker containers and networks. Building it required drawing on my knowledge of graph theory (from classes like Discrete Structures), networking and iptables (from Cyber Defense), and API design (from Software Engineering). The major success of Containeroso is that it only uses Docker to emulate entire virtual networks, which makes the creation and teardown of these networks easy and artifact-free. However, it took a significant amount of research before I arrived at this Docker-only solution, because while Docker’s built-in networking features are robust, they are not suited for emulating networks of arbitrary complexity. For example, you cannot connect two “Docker networks” together, and route traffic across their domains. But Containeroso can. 

Our group accomplished what we set out to build: an app that lets you create and interact with virtual networks from an easy-to-use, intuitive web interface. It’s simple, it works, and it can be used to teach networking fundamentals. Throughout this process, I’ve had the opportunity to learn from my knowledgeable peers about modern web app design and best practices. I’ve learned that working with a group on a large software project requires discipline and frequent communication. I’ve also learned that while modern programming tools like Git and Docker enable you to develop independently and easily integrate different team members’ code modules, this process is still not trivial. Each of us made valuable contributions to the project, and I enjoyed working with this team. 

## Samuel Buzas

TODO

## Nick Rook

TODO

## Noah Bass

My individual contributions for project Virtuoso included many technical and non-technical aspects. Technically, I contributed architecture considerations and discussion towards each of the microservices during the design of the project to ensure our microservice strategy was well-planned before implementation. I also contributed code towards several of the microservices in various languages (ex: Python and JavaScript), including the Web SSH service, the Authentication Service, and the API Gateway, as well as integrated with other microservices. Non-technically, I contributed towards the project management of Virtuoso to organize tasks, consider task dependencies, and ensure tasks were on track.

From my initial assessment last Fall, I applied my back-end software engineering skills in helping the build the various microservices, including Node.js, Python, MongoDB, and Docker, as well as designing back-end APIs and working with data. Through this project, I learned about the proper way to design architectures for applications, how to solve problems with microservices, and how to implement independent microservices that work together to perform a specific task. The competencies I built for myself in the project included knowing how to go about building well-planned and well-structured applications and knowing how and when to make decisions when planning and building complex software. My successes in the project included designing and building out various independent microservices for Virtuoso that work together, as well as leading project management for the development of Virtuoso. My obstacles included learning how to simulate interaction with code and microservices that haven’t yet been written, but will exist in the future, as well as learning how to go about testing microservices that were written independently, but should work together to accomplish a shared task.

---

[⭠ Previous Page](07a-initial-self-assessments.md) | [Next Page ⭢](#)
