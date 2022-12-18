<p align="center">
  <h1 align="center">Galaxy-Quest! 🛸</h1>
  <p align="center">
    A game built with Phaser.JS!
   <br />
    <a href="https://kisokumar.github.io/galaxy-quest/" target="_blank">Play It!</a>
    .
    <a href="https://github.com/Kisokumar/galaxy-quest/issues">Report Bug</a>
    ·
    <a href="https://github.com/Kisokumar/galaxy-quest/issues">Request Feature</a>
  </p>
</p>

## 🚀 About

<p>  Collect stars for fuel and ammo, shoot the meteors and avoid getting hit by them.</p>

<!-- ---
## 👩‍👩‍👧‍👧 Demo

![](https://github.com/kisokumar/galaxy-quest/demo.gif) -->
---

<details open="open">
  <summary><h2 style="display: inline-block"> ⚙️ Installation </h2></summary>

Make sure you have `node`, `git` and `npm` installed before beginning.

> 📜 Install Dependencies:

```
git clone https://github.com/Kisokumar/galaxy-quest
cd galaxy-quest

npm i
```

</details>

---

<details open="open">
  <summary><h2 style="display: inline-block"> 💻 Usage (devserver & deployment)
</h2></summary>

Make sure you have completed installation in the section above.

> 📜 Run a devserver :

```
npm run dev
```
> 📜 Build locally & preview:
```
npm run build
npm run preview
```


> 📜 Script to build & deploy (github pages):

```
#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:username/repo.git main:gh-pages

cd -

```
> Source for the script above: [Vite Docs](https://vitejs.dev/guide/static-deploy.html)
</details>