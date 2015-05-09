# Cuando Llega Web

Web version of [Cuando llega mvil Andrid App]( https://play.google.com/store/apps/details?id=com.samsoft.cuandollega)

## Dependecy

* Node.js
* npm
* grunt (grunt-cli)
* bower

`npm intall grunt-cli grunt bower`

## Development

`git clone https://github.com/p4bl1t0/cuandollega-web.git cuandollega-web`

`cd cuandollega-web`

`bower clean`

`bower install`

`npm intall`

`grunt serve`


## Build


Run `grunt build` for building and `grunt serve` for preview.


## Testing

Running `grunt test` will run the unit tests with karma.

## Deploy

For deploying into gh-pages

`git subtree push --prefix dist origin gh-pages`
