# TipTap Contentful

why? this is because many web platforms didn't provide a way to customize css with css file,   
they only accept limited `<tag/>` and `inline style`,  
so I need the rich-text editor can provide inline style while copy and recognize the style when pasty.  
And I need this editor can be easily integrated in my blog & email project.  
the project must keep opensource and high customizable,  
there is not so much fit project for my requirement, 
so I need to try to build one.

Above all, this is an example repo with some opinionated changed extensions. Maybe can help you.

## Two parts might help you

1. `example/src/utils/editor.svelte.ts`: 
   this file contains all editor extensions and configurations.   
   `example` folder is a simple example project build with `vite` and `svelte`.  
   you can simply start up with command `pnpm dev`
2. `packages/tiptap-extension-*`: 
   these are extensions folder I have build or made some changes.  
   to see extension 
