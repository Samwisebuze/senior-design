# Virtuoso: Test Plans

## Overview of Test Plan

Virtuoso is a complex distributed system and will require sufficient test coverage to ensure general functionality. Testing requirements will vary based on the purpose of individual services and how critical they are to the system. In general, we will require services to have their own unit tests to validate changes and enable quality assurance in the build process. We also plan on implementing integration testing that will let us validate that a running version of the system is operating as intended. This will require the implementation of some testing harnesses that make pre-scripted calls to running services and validate that their responses meet some contractual requirements. Finally, we will need to have observable systems that allow us to view their current health. This will require distributed tracing, smart health checks, traffic control tools, and smoke tests.

## Example Test Cases

### Network Service Tests

- **ID**: NDUT - Network Domain Unit Test Cases
- **Purpose**: Test normal use cases that do not depend on outside resources.
- **Description**: Test actions for adding, updating, and removing a device to a network.
- **Inputs**: Faked Device Objects and a fake network to connect to.
- **Expected Outputs**: Confirm methods function properly and that state changed as expected.

---------

- **ID**: NDPT - Network Domain Persistence Tests
- **Purpose**: Test the Mongoose persistence system to validate the configurations.
- **Description**: Test the mongoose persistence models to confirm that pre/post hooks fire and that data is properly persisted.
- **Inputs**: Valid and Invalid network data models.
- **Expected Outputs**: Passing test when valid models can be retrieved properly with correct data. Passing tests when invalid objects throw exceptions as expected.

----------

- **ID**: NSACT - Network API Contract Tests 
- **Purpose**: Validate API responses for normal and abnormal cases.
- **Description**: Perform normal actions and validate that response codes and headers are appropriate. Perform invalid/corrupted actions and confirm that the response codes are correct and headers are set appropriately.
- **Inputs**: HTTPS requests, using basic authentication, to perform CRUD operations.
- **Expected Outputs**: HTTP responses with correct status codes, headers, and message bodies for the expected test case.

### Container Service Tests

- **ID**: CSACT - Container Service  API Contract Test
- **Purpose**: Validate API can start and stop containers with appropriate status codes.
- **Description**: Perform use cases to start and stop a simple container network. Validate that the container has started and that it has stopped.
- **Inputs**: HTTP Requests
- **Expected Outputs**: HTTP response with valid proper status codes and runtime information.

---------

- **ID**: CDCT - Container Docker  Contract Test
- **Purpose**: Validate usage of Docker API and functionality of start/stopping/ updating containers.
- **Description**: Perform requests to a local Docker instance to start, update, and stop a container. Ensure that required docker API endpoints meet their documented requirements. Trigger container start, change a the running container in some way and stop the container gracefully.
- **Inputs**: HTTP Requests
Expected Outputs: HTTP responses and runtime information


### Web SSH Tests

- **ID**: WSUT - Web SSH Service Unit Tests
- **Purpose**: Validate internal business logic operations and test value edge cases
- **Description**: Perform unit tests to validate how each module handles different states. Validate both expected and unexpected states to ensure that code is well rounded in case of errors.
- **Inputs**: Fake objects and Mocked services
- **Expected Outputs**: Pass/Fail based on test assertions


### Frontend Web Service Tests

- **ID**: FWSUT - Frontend Web Service Unit Tests
- **Purpose**: Validate individual web components and their functionality/display
- **Description**: Validate each React component with different states and input props. Validate both expected and unexpected props to ensure that code behaves in a consistent and intended way.
- **Inputs**: Javascript objects representing potential props
- **Expected Outputs**: Pass/Fail based on test assertions

---------

- **ID**: FWSIT - Frontend Web Service Integration Tests
- **Purpose**: Validate high level web components and pages and their integrated performance
- **Description**: Validate each web page renders properly and responds to user interaction. Nothing should be mocked out aside from API calls as this is the most valuable test case.
- **Inputs**: Mock API responses
- **Expected Outputs**: Pass/Fail based on test assertions. Successful render of page

### General Tests

- **ID**: FSST - Full System Startup Test
- **Purpose**: Smoke test to confirm that service containers can be started
- **Description**: Test each services deployment to a psuedo-production environment. Make sure that service containers can be started along with their required services.
- **Inputs**: Production Like Deployment Environment and DockerCompose
- **Outputs**: Console Logs which will need to wither be manually or automatically validated.


## Test Attribute Matrix

|Test Identifier | Normal / Abnormal | Blackbox / Whitebox | Functional / Performance | Unit / Integration |
| --- | --- | --- | --- | --- | 
|NDUT| Normal|Whitebox|Functional|Unit|
|NDPT|Normal|Blackbox|Functional| Unit|
|NSACT|Normal|Blackbox|Functional|Integration|
|CSACT|Normal|Blackbox|Functional|Integration|
|CDCT|Normal|Blackbox|Functional|Integration|
|WSUT|Normal|Blackbox|Functional|Unit|
|FWSUT|Normal|Blackbox|Functional|Unit|
|FWSIT|Normal|Blackbox|Functional|Integration|
|FSST|Normal|Blackbox|Functional|Integration|


---

[⭠ Previous Page](01-project-description.md) | [Next Page ⭢](04-user-manual.md)
