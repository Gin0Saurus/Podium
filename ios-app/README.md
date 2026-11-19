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
  analytics or ads, and purchases behind a parental gate). List it under **Education** instead.

## Podium Maths Plus (the subscription)
The paywall, free limits and purchase code are already in `../index.html`. **Nothing is locked
until you add your RevenueCat key**, so the app stays fully free until you switch this on.

**Free:** 3 practice sets a day, mini mock papers, the starter lessons, Mistake Bank, daily
challenge, duels, flashcards, sprint, Remember and the predicted score.
**Plus:** unlimited practice, full and "last ten" mock papers, Hard only drills, every lesson.

Suggested prices: **£3.99 a month** or **£24.99 a year with a 7-day free trial**. Prices and the
trial are set in App Store Connect; the app shows whatever the store returns.

### Switching it on (about an hour, once)
1. **Apple Developer Program**: join and accept the **Paid Apps agreement** in App Store Connect
   (Business section), with bank and tax details. Without it, purchases never load. The account
   holder must be 18 or over, so if that is not you, a parent sets this up and gets the payouts.
2. **App Store Connect**: create the app (bundle ID = `appId` in `capacitor.config.json`), then
   Subscriptions → create a group "Podium Maths Plus" with two products:
   `podium_plus_monthly` and `podium_plus_yearly` (add the 7-day free trial as an introductory
   offer on the yearly one).
3. **RevenueCat** (free until you earn $2.5k a month): create a project and an Apple app, then
   - Entitlement with identifier **`plus`**, attached to both products.
   - Offering **default** (marked current) with the **Annual** and **Monthly** packages.
   - Copy the **public Apple SDK key** (starts `appl_`).
4. In `../index.html`, find `const PLUS = {` and paste the key into `rcKey`.
5. In Xcode: Signing & Capabilities → **+ Capability → In-App Purchase**.
6. Build, then test with a **Sandbox tester** (App Store Connect → Users and Access → Sandbox).
   Check: buy yearly, buy monthly, cancel the Apple sheet (no error should show), Restore purchases.
7. When the app is live, put its App Store link in `appStoreUrl`. From then on the website
   shows the same free limits and sends people to the iPhone app to upgrade.

### App Review checklist for subscriptions
- Privacy Policy URL in App Store Connect: `https://gin0saurus.github.io/Podium/privacy.html`
  (`../privacy.html` in this repo; check the link opens once GitHub Pages has published it).
- Terms of Use: the paywall links to Apple's standard EULA. Add the same link to the App
  Store description, or Apple may reject the build.
- The paywall already shows price, length, auto-renew wording, Restore purchases, Terms and
  Privacy, which are the things reviewers check.
- Upload a screenshot of the paywall with the subscription products for review.
