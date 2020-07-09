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
- [Noop Specific Tips and Tricks](#noop-specific-tips-and-tricks)
- [Addtional Resources](#addtional-resources)

## What is Noop?
Noop is a platform which makes it easy to develop, build, run, and deploy your applications. In essence, Noop streamlines setting up and maintaining a cloud-based infrastructure for your application. All you need to do is provide a file (Noopfile) to explain the configuration of your application, and Noop takes care of the rest.

A Noopfile is configuration file that lives in your source code. It describes the structure of your applications in terms of components (which can be thought of as running code), resources (which can be thought of as database services), and the relationships between each other. Anytime a new version of your application is deployed, connected resources retain their preexisting state.

If you have used Docker before you might find some aspects of Noopfiles familiar. In fact, the presentation of Noopfiles largely serve as a syntactical extension of the standards utilized within Dockerfiles. Therefore, existing Docker applications often require minimal alterations to accommodate Noop.

Noop currently supports two distinct runtime environments, Noop Local and Noop Cloud. Noop Local helps facilitates the local development of Noop applications, while Noop Cloud is a PaaS (Platform as a Service) provider for deploying Noop applications.

This guide will help you get started running and deploying with Noop by way of a sample application. By using both Noop Local and Noop Cloud with a sample application, you will be able to quickly gain an understanding of how components, resources, and Noopfiles all work together.

With that said - let's get started!

## The Sample Application
The source code in this repository features a full-stack application built from the ground up for Noop. To an end-user, the application provides a queryable dashboard utilizing mobility data released during the COVID-19 pandemic.

The four subdirectories located at the root of this repository each feature the source code for an individual Noop component. Each component is defined by a `Noopfile` located at its own root level. The Noopfiles in this repository also define a **DynamoDB resource**, `mobilityDB`, which serves as a database dependency that is accessible by server-side components.

The sample application's Noop components include:
1) [`client`](./client), a Vue.js **service component**, which manages the client-side user interface.
2) [`data`](./data), a Python **service component**, which processes raw data files into a seed data file.
3) [`seedTask`](./seed_task), a Node.js **task component**, which checks valid entries in `mobilityDB`, and seeds data if needed.
4) [`server`](./server), an Express.js **service component**, which facilitates communication between `mobilityDB` and `client`.

## Noop Local Quick Start

#### Prerequisites for running Noop Local
In order to run the sample application in this repository with Noop Local, the following development tools are required: [Git](https://git-scm.com), [Docker](https://www.docker.com), [Node.js](https://nodejs.org/en/) (current LTS release recommended).

**Note**: We recommend using Noop Local on a local machine running a recent version of macOS. A Unix-like operating system is required.

#### Launch Sample Application in Noop Local Environment
1) Install Noop Local as a global package on your local machine: `npm install -g noop-local`

2) Confirm Noop Local has been properly installed by entering `noop` in a terminal window. This command will output the current version of Noop Local installed on your local machine (e.g. `noop-local v1.0.11`).

3) Confirm the Docker daemon is running on your local machine by entering `docker ps` into a terminal window.

4) Clone this repository onto your local machine: `git clone https://github.com/noop-cloud/mobility-dashboard.git`

5) Open a terminal window in the root directory of the cloned repository, and enter `noop run`. This command will build, and thereafter run, all the defined Noop components in this repository.

When all the Noop components are running the Noop Dev Server can be accessed by pressing `o` (or by visiting [localnoop.app:1234](https://localnoop.app:1234) in a web browser) and the Noop Local Inspector can be accessed by pressing `i` (or by visiting [localhost:1235](http://localhost:1235) in a web browser). Press `q` to close all running Noop components.

## Noop Cloud Quick Start

#### Prerequisites for deploying on Noop Cloud

In order to launch the sample application on Noop Cloud, the source code in this repository needs to be in "forked" or cloned into your own GitHub account. You also need to sign up for a [Noop Cloud](https://www.noop.app/) account and grant the Noop Cloud access to your GitHub repositories as apart of the registration process.

#### Launch Sample Application on Noop Cloud

## Noop Specific Tips and Tricks

#### Break down directives in Noopfiles to be as granular as possible, and be intentional with ordering.

Since Noopfiles largely serves as an extension of Dockerfiles, many of [advantages of the Docker ecosystem](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) continue to be strengths when working with Noop. For instance, a component's container is cached after each directive in a Noopfile, so the ordering of your Noopfile can have a significant impact on build-times of your components.

Two great approaches for achieving speedy builds when working with Noop is to ensure lengthy steps occur as early as possible, and steps involving frequent changing files occur as late as possible.

#### Explore multi-stage builds and polyglot patterns within individual containers.

#### Feel free to expose all your Noop components on the same port.

That's right, Noop's own internal route table will facilitate communication between different components, so there is no need to explicitly assign different ports to each of your components. All you need to make sure is that none of the locations defined in the `ROUTE` directives of your Noopfiles conflict with one another.

Additionally, Noop provides an easy shorthand to allow any of your server-side components to communicate with each other. Just use [http://localapp](http://localapp) - followed by the route pattern defined in your Noopfiles - and you are good to go!

## Additional Resources