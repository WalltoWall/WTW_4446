# Quick Start

**To develop locally**:

```sh
# Clone the project locally
#   PROJECT_CODE: project name/id (e.g. "HNB_4141")
git clone git@github.com:WalltoWall/<PROJECT_CODE>.git
cd <PROJECT_CODE>

# Check out your branch
#   INITIALS:    your lowercase initials (e.g. "aa")
#   BRANCH_NAME: the branch/feature you will work on (e.g. "development")
git checkout -b <INITIALS>/<BRANCH_NAME>

# Install the project dependencies
yarn install

# Start the development server
yarn develop
```

**To create a staging/preview URL for client review**

Create a Pull Request on GitHub to the `master` branch. A Netlify CI check will
appear with a preview link.

**To push to production**

Create and merge a pull request on GitHub to the `master` branch. You'll need
another developer to review the pull request before deploying.

## More detail, please.

The following instructions assume your development environment has been setup.
See [Development Environment][development-environment] for details.

### Clone the project locally

All projects are version controlled using Git and hosted on GitHub in private
repositories. Cloning a repository is the act of replicating the code from the
centeral server, GitHub in this case, to another machine, e.g. your computer.

Each project's repository is named after the project's code, usually of the form
`XXX_####` where `XXX` is a three-character shorthand for the client's name and
`####` is an set of numbers. For example, Hawaii National Bank's website is
located in a repository named `HNB_4141`.

To clone the project, run the following command where you will store the
project. Replace `<PROJECT_CODE>` with the project's code.

```sh
git clone git@github.com:WalltoWall/<PROJECT_CODE>.git
```

Once the project is cloned to your computer, let's move into the directory to
set us up for the next step.

```sh
cd <PROJECT_CODE>
```

### Create your own branch

The following primary branches have special uses:

- `master` - Production code pushed to the live site
- `development` - Development code to develop locally and create staging builds

All local development should happen on a branch of one of these branches,
usually `development`.

To keep each developer's code separate and easily auditable, your branches
should start with your initials followed by a "`/`".

For example, Angelo Ashmore's development branch would be `aa/development`.

### Install the project dependencies

This project is JavaScript-based so all dependencies are managed by [npm][npm].

Run the following command to install the project's dependencies.

```sh
yarn install
```

This will download and build all of the project's dependencies into the
`node_modules` folder in your project. This folder is ignored by Git so it must
be run any time the project is cloned.

This command may take a minute or two the first time it is run. Subsequent runs
will be quicker as dependencies are cached locally.

Now that the dependencies are installed, let's create our `.env` files to hold
API keys and sensitive data.

### Review `.env`

Most projects will need API keys and sensitive data to function. For example, a
secret token would be needed to talk to the content management system API, and
using Google Maps requires an API key to embed a map.

This type of data is centralized in the `.env` file as constants. The values in
the `.env` files become [environment variables][environment-variables] when the
project runs.

> If the project you're working on does not have a `.env` file in the root
> directory, the project likely does not require any special keys or secrets. If
> so, this section can be skipped.

Open the `.env` file in your text editor and review the values inside. The file
should look something like the following:

```sh
VARIABLE_NAME=variable-value
VARIABLE_NAME_2=variable-value-2
VARIABLE_NAME_N=variable-value-n
```

The variable name should describe the variable's purpose. If not, check the
project's `README.md` file in the root of the project for details.

If you are unsure what values to enter here, ask another developer working on
the project. Each project has its own requirements, so there is no
one-size-fits-all set of instructions for this section.

Note that these environment variables are only valid for your development
environment. When serving the site on Netlify, the environment variables defined
on Netlify will be used instead.

Once the environment variables are setup, we can start the project. Hell yeah,
finally!

### Start the development server

Starting the project to run locally is a single command.

```sh
yarn develop
```

A development server will start that runs the project locally. This is where
we'll will spend most of our time working on the project. As files are saved in
your text editor, the server detects the changes and updates the site in-place
without needing to refresh the page.

### Create a staging/preview URL

When your changes are ready for internal or client review, you can create a
staging/preview URL with your changes. This URL is separate from the production
server and is not publically viewable without having the URL.

This project uses a [continuous integration][continuous-integration] service to
automatically build and deploy staging/preview URLs when Pull Requests to the
`master` branch are created.

See the official GitHub documentation for details on creating a Pull Request:
[Creating a pull request][pull-request].

Your Pull Request page will include a Netlify CI check. You can retrieve the
staging/preview URL by clicking "Details".

### Deploy your changes

This project uses a [continuous integration][continuous-integration] service to
automatically build and deploy the site to production when commits are pushed to
the `master` branch.

The `master` branch is protected on GitHub since it deploys straight to
production. At least one other developer must review and approve the changes
before merging. This is done by creating a Pull Request on GitHub from your
branch to `master`.

See the official GitHub documentation for details on creating a Pull Request:
[Creating a pull request][pull-request].

[development-environment]: development-environment.md
[npm]: https://www.npmjs.com/
[environment-variables]: https://en.wikipedia.org/wiki/Environment_variable#Unix
[continuous-integration]: https://www.netlify.com/docs/continuous-deployment/
[pull-request]:
  https://help.github.com/articles/creating-a-pull-request/#creating-the-pull-request
