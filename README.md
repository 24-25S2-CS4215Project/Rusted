# rusted

(you are on branch: `filbert`)

## testing and running

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
