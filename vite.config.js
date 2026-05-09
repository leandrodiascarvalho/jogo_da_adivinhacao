import { defineConfig } from "vite";

export default defineConfig({
root:".",
server:{
  port:3000,
  open:true,
},
assetsInclude: ['**/*.mp3', '**/*.png', '**/*.json'],
build:{
   outDir: 'dist',
    assetsInlineLimit: 0, //nao inline arquivos grandes
}


});