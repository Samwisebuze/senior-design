# Project Description

### Project Problem Statement

Primary school educators want to teach networking and security fundamentals to students in their classrooms. However, there is no quick or practical way to emulate networks and the interactions between network nodes.

### Project Background Description

Teachers currently need to use VirtualBox or other VM software. These tools require a large capital investment, create resource allocation issues, and impose a large learning curve to basic literacy. These issues are prohibitive to teaching using local hardware. One alternative is to use cloud VMs from cloud providers like AWS, but this kind of solution is not feasible at a classroom scale due to the cost of running multiple VMs via small scale computing. 

### Inadequacy of Current Solutions

Limited solutions exist today that are easily accessible to educators. Current tooling uses outdated technology, highly complex user interfaces, and non-web based solutions.

### Background Skills and Interest

- UI/UX Design Tooling
  - React
  - Figma
- Modern API Design
  - GraphQL 
  - RESTful
- Security
- Elasticsearch
  - Kibana
  - Logstash
- Virtualization/Containerization
  - Docker
  - Linux Virtual Machines
- Languages
  - Node.js/Typescript
  - C#/.NET
  - Python
  - Swift
  - C/C++
- Project Management
- Modern Software Practices
  - CI/CD
  - TDD
  - BDD

### Problem Approach

We're building an “Orchestrator as a Service” that will allow high school students to… 

- Create virtual devices by dragging and dropping OS images onto a network diagram
- Graphically build networks by adding connections
- Configure devices via the command line and GUI 
- Visualize network communications with Kibana

… all from a single web platform.

We will create a unified web-based user interface that allows teachers and students to manage virtual networks. The back-end will be able to run on commodity hardware using containerization for nodes. We plan to use Cyber@UC's servers to offer local area high school teachers a free and accessible way to have their students create and manage virtual networks. We will design an API to connect these systems and provide an orchestration system to manage the containers.


[Previous Page](01-project-abstract.md) | [Next Page](03-user-stories-and-design-diagrams.md)
