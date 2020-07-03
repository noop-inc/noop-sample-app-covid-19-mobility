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

## The Sample Application

## Noop Local Quick Start

#### Prerequisites for running Noop Local
In order to run the sample application in this repository with Noop Local, the following development tools are required: [Git](https://git-scm.com), [Docker](https://www.docker.com), [Node.js](https://nodejs.org/en/) (current LTS release recommended).

**Note**: We recommend running Noop Local on a device with a recent version of macOS installed. Windows is currently not supported.

#### Launch Sample Application in Noop Local Environment

1) Install Noop Local as a global package on your device: `npm install -g noop-local`

2) Confirm Noop Local has been properly installed by entering `noop` in a terminal window. This command should output the current version of Noop Local installed on your device (e.g. `noop-local v1.0.11`).

3) Confirm the Docker dameon on your device by entering `docker ps` into a terminal window.

4) Clone this repository onto your local device: `git clone https://github.com/noop-cloud/mobility-dashboard.git`

5) Open a terminal window in the root directory of the cloned repository, and enter `noop run`. This command will build, and thereafter run, all the defined Noop components in this repository.

When all the Noop components are running the Noop Dev Server can be accessed by pressing `o` (or by visiting [localnoop.app:1234](https://localnoop.app:1234) in a web browser) and the Noop Local Inspector can be accessed by pressing `i` (or by visiting [localhost:1235](http://localhost:1235) in a web browser). Press `q` to close all running Noop components.

## Noop Cloud Quick Start

#### Prerequisites for deploying on Noop Cloud

In order to launch this sample application on Noop Cloud the source code needs to be in "forked" into your own GitHub account. You can fork the repository by pressing the button labeled "Fork" on the upper-right hand side of the sample application's [GitHub Page](https://github.com/noop-cloud/mobility-dashboard). You also need to sign up for a [Noop Cloud](https://www.noop.app/) account and grant the [Noop Cloud GitHub App](https://github.com/apps/noop-cloud) access to your GitHub account.

#### Launch Sample Application on Noop Cloud

##### Coming Soon

## Noop Specific Tips and Tricks

#### Break down directives in Noopfiles to be as granular as possible, and place any directives involving frequently changing files as far down the in file's ordering as possible.

Since Noopfiles largely serves as an extension of Dockerfiles, many of [advantages of the Docker ecosystem](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) continue to be strengths when working with Noop. For instance, a component's container is cached after each directive in a Noopfile, so the ordering of your Noopfile can have a significant impact on build-times of your components.

Two great approaches for achiving speedy builds when working with Noop is to ensure lengthy steps occur as early as possible, and steps involving frequent changing files occur as late as possible.

#### Explore multi-stage builds and polyglot patterns within individual containers.

#### All Noop components can be exposed on the same port.

That's right, Noop's own internal route table will facilitate the communication between different components, so there is no need to explictly assign differnt ports to each of your components. All you need to make sure is that none of the locations defined in the `ROUTE` directives of your Noopfiles conflict with one another.

Addtionally, Noop provides a easy shorthand to allow any of your server-side componets to communicate with each other. Just use [http://localapp](http://localapp) - followed by the route pattern defined in your Noopfiles - and you are good to go!

## Addtional Resources

