# Development Environment

This project is heavily JavaScript-based. It uses [Node.js][node], a JavaScript runtime environment, to run and build it. We'll need to install a few thing on our machine to work on this project.

Due to the architecture of this project, we will not be installing or using a database on our machine. Instead, this project uses a hosted service to provide content management system (CMS) functionality. This means less work for us!

The following setup only needs to happen on new machines once. Installation instructions need to be followed in the order they appear in this document.

## Overview

We'll be installing the following software:

- Xcode Command Line Tools
- [Homebrew][homebrew]
- [Node.js][node] via [`n`][n]
- [Yarn][yarn]
- [Git][git]

Some of these may already be installed on your computer, so we'll check if we can skip some steps in each section.

## Install Xcode Command Line Tools

> If Xcode Command Line Tools is already installed, you will be notified during the installation. Perform this section to ensure it is installed.

In order to install any dependencies, we'll need to first install Xcode Command Line Tools. Luckily, Apple makes this very easy.

In Terminal, run the following command:

```sh
xcode-select --install
```

When the popup opens asking to install the command line developer tools, click **Install**. The installation will take some time.

Once the installation complete, we can move on.

## Install Homebrew

> To check if Homebrew is already installed, run the following command in Terminal:
>
> ```sh
> which brew
> ```
>
> If it outputs `/usr/local/bin/brew`, you can skip this section.

Assuming we're on a Mac, install [Homebrew][homebrew], the most widely used package manager for macOS.

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

You may get a few prompts during the installation. If it asks to install something, install it.

Once it's done installing, verify Homebrew installed successfully by checking where it's located on your computer.

```sh
which brew
```

If it outputs `/usr/local/bin/brew`, you're good to go!

## Install Node.js

> To check if `n` and Node.js are already installed, run the following command in Terminal:
>
> ```sh
> which n
> ```
>
> If it outputs `/usr/local/bin/n`, check if Node.js is installed:
>
> ```sh
> which node
> ```
>
> If it outputs `/usr/local/bin/node`, you can skip this section.

This project is heavily JavaScript based so it uses [Node.js][node], a JavaScript runtime environment, to run and build it.

Using a version manager to install Node is the recommended approach. [`n`][n] is a good one. We'll use Homebrew to install it.

```sh
brew install n
```

Once `n` is installed, use it to install and activate the latest version of Node.js.

```sh
n latest
```

Once it's done installing, verify Node.js installed successfully by checking where it's located on your computer.

```sh
which node
```

If it outputs `/usr/local/bin/node`, you're good to go!

## Install Yarn

> To check if Yarn is already installed, run the following command in Terminal:
>
> ```sh
> which yarn
> ```
>
> If it outputs `/usr/local/bin/yarn`, you can skip this section.

Using Homebrew again, install [Yarn][yarn], a JavaScript package manager used to install our project's dependencies.

```sh
brew install yarn --without-node
```

The `--without-node` option ensures Homebrew doesn't install Node.js again since we already did so with `n`.

Once it's done installing, verify Yarn installed successfully by checking where it's located on your computer.

```sh
which yarn
```

If it outputs `/usr/local/bin/yarn`, you're good to go!

## Install Git

This project's code is version controlled using [Git][git] and hosted on [GitHub][github]. Assuming we're on a Mac, `git` is already installed, but it's an older version. Let's get the latest version using Homebrew.

```sh
brew install git
```

Once it's done installing, verify Git installed successfully by checking where it's located on your computer.

```sh
which git
```

If it outputs `/usr/local/bin/git`, you're good to go!

## Wrap Up

Congratulations, your computer is now setup to work on this project!

[homebrew]: https://brew.sh/
[node]: https://nodejs.org/en/
[n]: https://nodejs.org/en/
[yarn]: https://yarnpkg.com/
[git]: https://git-scm.com/
[github]: https://github.com/
