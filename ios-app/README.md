# Podium Maths for the App Store

This folder wraps the web app (`../index.html`) in a native iOS shell using Capacitor.
It has not been built yet: building needs a Mac with Xcode.

## What the native build adds
The web app already checks for these plugins and uses them when they are present:
- **Haptics**: real taps on right and wrong answers (iPhone Safari cannot vibrate).
- **Local notifications**: a 7pm streak reminder on days you have not practised.
  iOS asks permission the first time.

## What you need
- A Mac with Xcode installed (free from the Mac App Store).
- Node.js 18 or newer.
- An Apple Developer Program membership (paid yearly). The account holder must be 18 or over.

## Build and run
```
cd ios-app
npm install
npm run copy
npx cap add ios      # first time only
npm run ios          # copies the web app in and opens Xcode
```
In Xcode: choose your team under Signing, pick a simulator or your phone, press Run.

## Store listing
- Screenshots at 1290 × 2796 (6.7-inch iPhone) are in `../store/appstore-1.png` to `appstore-5.png`.
- App icon: `../icon-1024.png`.
- Change `appId` in `capacitor.config.json` to an identifier you own first.

## Before you submit
- Apple rejects apps that are only a website in a wrapper. Haptics, reminders and in-app
  purchase are what make this a real app in review.
- Anything digital sold inside the app must use Apple's in-app purchase. RevenueCat's
  Capacitor plugin (`@revenuecat/purchases-capacitor`) is the usual way to add subscriptions.
- If the app is listed in the Kids category, Apple's extra rules apply (no third-party
  analytics or ads, and purchases behind a parental gate).
