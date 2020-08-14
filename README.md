# Noop Sample Application | COVID-19 Mobility Dashboard

### Table of Contents

- [What is Noop?](#what-is-noop)
- [The Sample Application](#the-sample-application)
- [Noop Local Quick Start](#noop-local-quick-start)
  - [Prerequisites for running Noop Local](#prerequisites-for-running-noop-local)
  - [Launch Sample Application in Noop Local Environment](#launch-sample-application-in-noop-local-environment)
- [Noop Cloud Quick Start](#noop-cloud-quick-start)
  - [Prerequisites for deploying on Noop Cloud](#prerequisites-for-deploying-on-noop-cloud)
  - [Launch Sample Application on Noop Cloud](#launch-sample-application-on-noop-cloud)

## What is Noop?

Noop is a platform which makes it easy to develop, build, run, and deploy your applications. In essence, Noop streamlines setting up and maintaining a cloud-based infrastructure for hosting your application. All you need to do is provide a Noopfile(s) to explain the configuration of your application, and Noop will take care of the rest.

Noop currently provides two distinct runtime environments, Noop Local and Noop Cloud. Noop Local helps facilitate local development of Noop applications, while Noop Cloud is a platform to run Noop applications in the cloud.

With that said - let's get started!

## The Sample Application

To an end-user, the sample application featured in this repository delivers a data visualization dashboard offering insight into mobility during the COVID-19 pandemic. Moreover, the application serves as away to illustrate how simple it is to create complex relationships between disparate portions of a project using the **Noop App Model</**.

Source code for the sample application is divided into four subdirectories at the root of the project. These four subdirectories each contain source code for an individual Noop component. Each component is defined by a **Noopfile** located at its own root level. The sample application's Noopfiles also define a **DynamoDB database resource**, `mobilityDB`, which serves as a dependency accessible to the application's components.

The sample application's Noop components include:

1. `client`, a Vue.js **service component**, which manages the client-side user interface.

2. `data`, a Python **service component**, which processes raw data files into a seed data file.

3. `seedTask`, a Node.js **task component**, which checks valid entries in `mobilityDB`, and seeds data if needed.

4. `server`, an Express.js **service component**, which facilitates communication between `mobilityDB` and `client`.

[![Noop App Model](https://www.noop.app/img/docs/quickstart-noop-app-model.png)](https://www.noop.app/img/docs/quickstart-noop-app-model.png)

Examining the source code of the sample application will be helpful for familiarizing yourself with Noop specific development practices. Otherwise interacting directly with the source code is not necessary to proceed with running it on Noop.

## Noop Local Quick Start

[Noop Local](https://github.com/noop-cloud/noop-local) is a local development server, which assists with running a Noop application on your local machine. Features include a command line interface for interacting with a Noop application, and auto-reloading of individual components upon changes to source code.

#### Prerequisites for running Noop Local

In order to run the sample application with Noop Local, the following development tools are required: [Git](https://git-scm.com), [Docker](https://www.docker.com), [Node.js](https://nodejs.org/en/) (current LTS release recommended).

**Windows Specific Instructions**

A GNU/Linux environment is required to run Noop Local on a Windows machine. This can be achieved by using [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/about). Refer to Microsoft's [installation guide for WSL 2](https://docs.microsoft.com/en-us/windows/wsl/install-win10) along with Docker's [setup guide for using Docker with WSL 2](https://docs.docker.com/docker-for-windows/wsl/) to o create a development environment compatible with Noop Local.

#### Launch Sample Application in Noop Local Environment

**1) Install Noop Local**

If Noop Local has yet to be be installed on your local machine, run `npm install -g noop-local` into a terminal window. You can confirm Noop Local has been properly installed by entering `noop` into a terminal window. This command will output the current version of Noop Local installed on your local machine (e.g. `noop-local v1.0.15`).

**2) Git Clone the Sample Application**

Clone the sample application's git repository onto your local machine by running `git clone https://github.com/noop-cloud/noop-sample-app-covid-19-mobility.git`.

Note: Noop Local searches for a `.git` folder to identify a root of a Noop application. If you download the source code of the sample application instead of cloning its git repository, you will need to initialize a git repo in the project's root directory with `git init` for Noop Local to function properly.

**3) Run Docker**

Make sure Docker is running on your local machine. You can confirm by entering `docker ps` into your terminal window.

**4) Run Noop Local**

Open a terminal window in the root directory of the sample application, and enter `noop run`. This command will build, and thereafter run, all the defined Noop components.

When all the Noop components are running, you can access your application endpoint by pressing `o` (or by visiting [localnoop.app:1234](https://localnoop.app:1234) in a web browser) and the `Noop Local Inspector` by pressing `i` (or by visiting [localhost:1235](http://localhost:1235) in a web browser). You can press `q` to close all running Noop components.

## Noop Cloud Quick Start

[Noop Cloud](https://noop.app) is a PaaS provider designed for hosting and managing Noop applications. Noop Cloud strives to streamline the process of setting up and deploying your application, while also retaining a robust set of configuration options.

#### Prerequisites for deploying on Noop Cloud

In order to launch the sample application on Noop Cloud, the source code within this repository needs to be "forked" or cloned into your own GitHub account. You also need to sign up for a [Noop Cloud](https://noop.app/) account to grant Noop Cloud access to the Noop application.

#### Launch Sample Application on Noop Cloud

**1) Create App**

Visit [Noop Cloud](https://noop.app/), and click on the **Applications** icon in the left-hand sidebar. Then click **Create New App**, and select the repository that contains the sample application's source code. Click **Go to App** to continue.

**2) Create Build**

Select the "Builds" tab. Under the **Initiate Manual Build** section enter in a **Git Reference** (e.g. `master`) to create a build of the sample application. Click **Build** and you will be directed to this specific Build's page. Wait for your build status to be listed as **Completed** before launching an environment.

**3) Launch Environment**

Return to the management page for the application, select the **Environment** tab, and click **Launch Environment**. On the **Launch an Environment** page, select a region, cluster, domain and endpoint for the environment. Click **Save** and then **Go to Environment**.

**4) Launch Resource**

Click **Resources** on the Environments page. Under the **Launch a New Resource** section click **DynamoDB Table**. Enter values into the fields to match the DynamoDB resource defined within the sample application's Noopfiles. Use the table below as a reference:

| Field         | Value      |
| ------------- | ---------- |
| Resource Name | mobilityDB |
| hashKeyName   | name       |
| hashKeyType   | S          |
| rangeKeyName  | type       |
| rangeKeyType  | S          |

Click "Launch" to continue. You should see **mobilityDB** show up instantly in the `Resources` section.

**5) Deploy Build**

Now click **Deploy Changes** on the Environments page. Under the **Build** section, select the build matching the git reference used to create the build in Step 3. Then on the right-hand side of the page under the **Deploy Changes** section click **Deploy**. You will be directed to the **Deployment Workflow** page.

When for the status of your deploy to be listed as **Completed**, the sample application will be available at the selected endpoint for your environment. You can find the endpoint on **Endpoints** card on your environment's page.

## Additional Resource

Now that you've gotten hands-on experience with Noop Local and Noop Cloud, you're ready to start using Noop on your own! Visit the documentation at [noop.app/learn](https://noop.app/learn) to learn how to create your own Noop application.

If you have any questions, concerns or feedback, contact us through email. You can reach us at hello@noop.app.
