---
title: Home
description: 'Website and person presentation'
---

## About me

Hello, I'm Alessio - student of the Computer Science track of
Mathematical Engineering at the Polytechnic University of Milan, with a
specialization in Programming and Neural Networks.

## About this website

This personal website is a fork of a website I built for a Polimi course project, which was built entirely from scratch using [Nuxt.js v2](https://nuxtjs.org/) (all code, no fancy UI frameworks).

To change it, I took all its code and removed the unnecessary pages, components and plugins. I then added the nice [Vuetify](https://vuetifyjs.com/) to use some of its ready components and styling system to make it all more robust. I also added the [Content module](https://content.nuxtjs.org/), a headless CMS which lets me write posts and pages directly in Markdown (.md) files - the module will automatically fetch them and dynamically load pages, sections and their content, without rebuilding anything.

In the future, when the world catches up, it will probably be hosted on my very personal web3 domain (which I already own). For now, let's use GitHub Pages. A website built with Nuxt is usually intended to be dynamic and work on SSR but that's not possible with GH Pages. Best thing is to add a GitHub Action (thanks GH team!) to automatically build and deploy the static website when a new push to master happens. (So in the current implementation, even if I just edit one .md file, the whole website will be rebuilt because only the static version can be displayed here.)

**It's entirely OPEN SOURCE, you can check more technical details in its [GitHub Repo](https://github.com/TheFacc/thefacc.github.io)!**

### Current status - Feb 2023

Nuxt Content is used for Homepage and Learn sections, the only ones present. Other sections are WIP. I'm currently filling content taken from past Polimi courses. [C++](/learn/cpp) and [Deep Learning](/learn/deep-learning) are up, next is Audio Signals.
