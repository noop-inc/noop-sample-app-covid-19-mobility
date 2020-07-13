# Noop Full-Stack Sample Application (Node.js, Vue.js, Express.js, DynamoDB, Python)

### Table of Contents
- [What is Noop?](#what-is-noop)
- [The Sample Application](#the-sample-application)
- [Noop Local Quick Start](#noop-local-quick-start)
    * [Prerequisites for running Noop Local](#prerequisites-for-running-noop-local)
    * [Launch Sample Application in Noop Local Environment](#launch-sample-application-in-noop-local-environment)
- [Noop Cloud Quick Start](#noop-cloud-quick-start)
    * [Prerequisites for deploying on Noop Cloud](#prerequisites-for-deploying-on-noop-cloud)
    * [Launch Sample Application on Noop Cloud](#launch-sample-application-on-noop-cloud)

## What is Noop?
Noop is a platform which makes it easy to develop, build, run, and deploy your applications. In essence, Noop streamlines setting up and maintaining a cloud-based infrastructure for your application. All you need to do is provide a Noopfile(s) to explain the configuration of your application, and Noop will take care of the rest.

Noop currently supports two distinct runtime environments, Noop Local and Noop Cloud. Noop Local helps facilitates the local development of Noop applications, while Noop Cloud is a PaaS (Platform as a Service) provider for deploying Noop applications. The guide below will help you get familiar with both Noop Local and Noop Cloud by way of a sample application.

With that said - let's get started!

## The Sample Application
The sample application included in this repository has been built from the ground up for Noop. To an end-user, this application provides a queryable data visualization dashboard utilizing mobility data released during the COVID-19 pandemic.

The four subdirectories located at the root of this repository each feature the source code for an individual Noop component. Each component is defined by a `Noopfile` located at its own root level. The Noopfiles in this repository also defines a **DynamoDB database resource**, `mobilityDB`, which serves as a dependency accessible to the application's components.

The sample application's Noop components include:
1) [`client`](./client), a Vue.js **service component**, which manages the client-side user interface.
2) [`data`](./data), a Python **service component**, which processes raw data files into a seed data file.
3) [`seedTask`](./seed_task), a Node.js **task component**, which checks valid entries in `mobilityDB`, and seeds data if needed.
4) [`server`](./server), an Express.js **service component**, which facilitates communication between `mobilityDB` and `client`.

While examining the source code of the sample application will be helpful for familiarizing yourself with Noop specific development practices, interacting directly with the source code is not necessary to proceed with the steps below.

## Noop Local Quick Start
[Noop Local](https://github.com/noop-cloud/noop-local) is a local development server, which assists with running a Noop application on your local machine. Features include a command line interface for interacting with a Noop application, and auto-reloading of individual components upon changes to source code.

#### Prerequisites for running Noop Local
In order to run the sample application with Noop Local, the following development tools are required: [Git](https://git-scm.com), [Docker](https://www.docker.com), [Node.js](https://nodejs.org/en/) (current LTS release recommended).

#### Launch Sample Application in Noop Local Environment
1) Install the Noop Local as a global NPM package: `npm install -g noop-local`. You can confirm Noop Local has been properly installed by entering `noop` in a terminal window. This command will output the current version of Noop Local installed on your local machine (e.g. `noop-local v1.0.13`).

2) Run docker on your local machine. You can confirm Confirm the Docker daemon is running on your local machine by entering `docker ps` into a terminal window.

3) Clone this repository onto your local machine: `git clone https://github.com/noop-cloud/mobility-dashboard.git`. Note, Noop Local requires a `.git` folder to identify a valid Noop application. If you download the source code in this repository instead of cloning it, you will need to initialize a git repo in the project's root directory, `git init`, for Noop Local to function properly. 

4) Open a terminal window in the root directory of the cloned repository, and enter `noop run`. This command will build, and thereafter run, all the defined Noop components in this repository.

When all the Noop components are running, you can access the Noop Dev Server by pressing `o` (or by visiting [localnoop.app:1234](https://localnoop.app:1234) in a web browser) and the Noop Local Inspector by pressing `i` (or by visiting [localhost:1235](http://localhost:1235) in a web browser). You can press `q` to close all running Noop components.

## Noop Cloud Quick Start
[Noop Cloud](https://www.noop.app) is a PaaS provider designed for hosting and managing Noop applications. Noop Cloud strives to supply an elegant solution for setting up and deploying an application, while retaining a robust set of configuration options.

#### Prerequisites for deploying on Noop Cloud
In order to launch the sample application on Noop Cloud, the source code within this repository needs to be in "forked" or cloned into your own GitHub account. You also need to sign up for a [Noop Cloud](https://www.noop.app/) account to grant Noop Cloud access to the Noop application.

#### Launch Sample Application on Noop Cloud
###### COMING SOON