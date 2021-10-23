# Flappy-Bird-Clone
JavaScript game made using [Phaser](https://phaser.io/) framework.

## Usage
Running a Phaser game directly in a browser doesn't work, that's because Javascript is not allowed to load files from your local file system.  
To solve that we will have to use a webserver to play and test our game.

There are multiple ways to set up a local web server. Here's my favourite technique using the Terminal:
- Navigate to the project's directory
- Run

```
python -m http.server
```
_for python 3.x_

```
python -m SimpleHTTPServer
```
_for python 2.x_

- then open http://localhost:8000 in your browser

## Gameplay
![GIF of game](https://github.com/yousefelassal/Flappy-Bird-Clone/blob/0ba4893db98564ad5e10be9860719823b781edb8/Flappy-GIF.gif)
