# Progressive Web Application Shell Architecture

[![Build Status](https://travis-ci.org/sinnott74/PWA.svg?branch=master)](https://travis-ci.org/sinnott74/PWA)


## Installation

Install a database. The project is configured to use Postgres, but MySQL & sqlite3 can used used by updating the projects knexfile.js

```sh
brew install postgresql
```

Install dependencies using npm:

```sh
$ npm install -g gulp nodemon && npm install
```

## Usage

### Production Build

```sh
$ gulp prod
```

### Development Build with Watch

```sh
$ gulp dev
```