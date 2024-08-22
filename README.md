This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Design choices

I wanted to achieve a rather modern looking app which is why i pursued a rather minimal design approach.
Blog posts are little cards and their corresponding pages display the content and metadata in a rather primitive way, which in turn makes the posts
easier to read because of the lack of distractions (which aren't always ads).
I used the UI Library _Mantine_ and almost all of their components styles were left untouched.
Bootstrap is also hanging around, but just to make my life easier.
The in-app API might be a little bit overkill for this project, but, as soon as i heared about it, i had to implement it.

## Challenges

Implementing the UI Library _Mantine_ wasn't as straight-forward as i hoped. The same problem occured as i was implementing the in-app API.
Most of the issues were caused by directives such as ```"use client";``` and ```"use server";```.
A few CORS related issues did show up too, also caused by these previous directives and maybe the use of ```fetch()```.
But the biggest enemy i faced was: time. I did manage to create a finished product, but there were many features thrown overboard.

## Getting Started

The Dashboard does not require an account, it is freely accessible.

First, install all packages this project is dependent on:

```bash
npm i
```
Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
