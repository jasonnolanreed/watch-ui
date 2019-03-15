# About this Repo:

* Represents only the front end for GoodWatchBadWatch.com
* Is stored in GitHub (public) to make use of free static hosting
* Consumes an API (watch-api repo on BitBucket), which is hosted on Heroku
* Is built on bleeding edge web technologies and strives not to make heavy use of frameworks or libraries

# About GitHub Pages

GitHub Pages hosts this web app as a static site for free. Because there are no build steps, we can deploy as is and serve the entire project without modification.
Name.com has a "GitHub Pages" DNS Records template, but it's outdated and won't allow for HTTPS on GHP. Instead, refer to https://help.github.com/articles/troubleshooting-custom-domains/#https-errors for the correct IP addresses.

# Initial project setup

* Only `npm install` is needed
* Postinstall moves necessary node_modules files into /vendor

# Development flow

* No build tools are used!

```
# Simple server
python -m SimpleHTTPServer
```

# Deployment to GitHub Pages

On GitHub, the repo is configured to always publish the latest from the master branch. This means work should probably be done in feature branches and only merged to master when it's ready to go live.

```
git push origin master
```