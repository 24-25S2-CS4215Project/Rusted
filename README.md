# Rusted

(you are on branch: `main`)


## About

*The project serves for the term project of the module CS4215, Programming Language Implementation.*

We introduce Rusted, a minimalist subset of the Rust programming language that focuses
specifically on demonstrating its ownership system. By restricting the grammar to only function decla-
rations and essential expressions, this project presents Rust’s core memory management principles in a
more accessible and comprehensible format.

This simplified implementation strips away syntactic complexity while preserving the fundamental
concepts that make Rust unique: ownership, borrowing, and lifetimes. Since peripheral language features
are largely eliminated, one can focus on how Rust’s ownership model prevents memory safety issues
without garbage collection while ensuring thread safety.

The project includes a parser (generated), type checker along with ownership/borrowing checker, and vir-
tual machine that faithfully implement Rust’s ownership rules in this constrained context. This distillation
serves as both an educational tool for understanding Rust’s innovative approach to memory management
and a foundation for exploring potential extensions to the ownership model in future programming
language research.


## testing and running locally

**for the sake of reproducibility: DO NOT USE NPM! use yarn build/test instead.**

just run `yarn build`.

to run the tests in `tests/*`, do `yarn test`.

to execute a specific file (that may not use jest), do `yarn run tsx path/to/your/file.ts`

## testing and running with source academy

upon pushing to the `filbert` branch, a github actions workflow is run to build and deploy the github pages
(can make changes in `.github/workflows/build-deploy.yml` in the `main` branch)

the task builds and hosts our package as a javascript file `index.js` that can be found at:
https://24-25s2-cs4215project.github.io/Rusted/index.js

then go to https://sourceacademy.org/playground
click the dropdown menu -> settings

![settings](docs/img/settings1.png)

go to feature flags

![flags](docs/img/settings2.png)

set `conductor.enable` to `true`
and `conductor.evaluator.url` to our github pages `index.js` url (see above)

![configs](docs/img/settings3.png)

now you can just paste your rust code into the sourceacademy playground (ignore the language settings) and run

![success](docs/img/settings4.png)
