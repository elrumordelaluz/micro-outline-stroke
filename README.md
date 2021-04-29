<p align="center">
  <img alt="Outline Stroke" title="Outline Stroke" src="/logo.svg" width="450">
</p>

<p align="center">
  Public endpoint to process stroked <code>svg</code> into outlined version using <a href="https://github.com/elrumordelaluz/outline-stroke">svg-outline-stroke</a>
</p>

## Endpoint

`POST` https://outline-stroke.vercel.app/api/outline

## Params

`input` <small>[ required ]</small> `svg` stroked code to convert in outlines
`...rest?` <small>[ optionals ]</small> see [svg-outline-stroke params](https://github.com/elrumordelaluz/outline-stroke#params)

## Examples

Used [this tool](https://yoksel.github.io/url-encoder/) to `url-encode` the
`svg` code but you could pass regular `svg` code if you use for example [Postman](https://www.getpostman.com/)

```zsh
curl -d "input=%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cline x1='32' y1='16' x2='32' y2='48' fill='none' stroke='%23202020' stroke-miterlimit='10' stroke-width='2'/%3E%3Cline x1='48' y1='32' x2='16' y2='32' fill='none' stroke='%23202020' stroke-miterlimit='10' stroke-width='2'/%3E%3C/svg%3E" -X POST https://outline-stroke.vercel.app/api/outline
```
