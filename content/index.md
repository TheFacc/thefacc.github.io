---
title: Home
description: 'Website and person presentation'
---

## About me

Hello, I'm Alessio - student of the Computer Science track of
Mathematical Engineering at the Polytechnic University of Milan, with a
specialization in Programming and Neural Networks.

## About this website

This personal website is a fork of a website I built for a Polimi course project, which was built entirely from scratch using Nuxt.js v2 (all code, no fancy UI frameworks).

To change it, I took all its code and removed the unnecessary pages, components and plugins. I then added the nice Vuetify to use some of its ready components and styling system to make it all more robust. I also added the Content module, a headless CMS which lets me write posts and pages directly in Markdown (.md) files - the module will automatically fetch them and dynamically load pages, sections and their content, without rebuilding anything.

In the future, when the world catches up, it will probably be hosted on my very personal web3 domain (which I already own). For now, let's use GitHub Pages.

**Current status**

Content is currently used for Homepage and Learn sections. Other sections are WIP. A website built with Nuxt is intended to work on SSR but that's not possible with GitHub Pages. Best thing is to add a GitHub Action (thanks GH team) to automatically build and deploy the static website when a new push to master happens. (So in the current implementation, even if I just edit one .md file, the whole website will be rebuilt because only the static version can be displayed here.)
