# Podium Maths for the App Store

This folder wraps the web app (`../index.html`) in a native iOS shell using Capacitor.
It has not been built yet: building needs a Mac with Xcode, which the web version does not.

## What you need
- A Mac with Xcode installed (free from the Mac App Store).
- Node.js 18 or newer.
- An Apple Developer Program membership to publish (paid yearly to Apple).

## Build and run
```
cd ios-app
npm install
npm run copy
npx cap add ios      # first time only
npm run ios          # copies the web app in and opens Xcode
```
In Xcode: pick your team under Signing, choose a simulator or your phone, press Run.

## Before you submit
- Change `appId` in `capacitor.config.json` to an identifier you own.
- App icon: use `../icon-1024.png` in Xcode's asset catalogue.
- Apple rejects apps that are only a website in a wrapper with nothing native.
  Accounts with sync, notifications for streaks and in-app purchase for premium
  are the features that make this a real app in review.
- Subscriptions sold inside an iOS app must use Apple's in-app purchase.
