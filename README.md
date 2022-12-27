<p align="center">
  <img src="https://user-images.githubusercontent.com/107879472/209590770-e3c32322-1485-434a-88d3-c8a81b6f1502.png" title="Text To Image - Responsive Website">
</p>

# Text To Image
A web page that transforms text into image (using the *DALL-E* API).

https://user-images.githubusercontent.com/107879472/209592426-40330e9f-e024-4a9f-80ce-76dc685b531e.mp4

## Built With
- HTML
- CSS/Bootstrap
- JS/jQuery
> **Note:** It uses LocalStorage (JS) with the value in JSON. Thus, in each session, the user keeps his or her creations.

## How To Use
On line 17 of the ./js/script.js file enter your API Key.
```js
headers: {
	'Content-Type': 'application/json',
	'Authorization': 'Bearer YOUR_API_KEY' // https://beta.openai.com/account/api-keys
},
```
