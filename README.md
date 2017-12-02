# micro-outline-stroke

> Public endpoint to process stroked `svg` into outlined version using
> [svg-outline-stroke](https://github.com/elrumordelaluz/outline-stroke)

## Endpoint

`POST` https://micro-outline-stroke.now.sh/

## Params

* **`input`** (required): should be a `String` with `svg` code or url pointed to
  an `svg` file
* **`width`**: width to scale output
* **`height`**: height to scale output

## Examples

1. `svg` code as input

  Used [this tool](https://yoksel.github.io/url-encoder/) to `url-encode` the
  `svg` code.

  ```zsh
  curl -d "input=%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cline x1='32' y1='16' x2='32' y2='48' fill='none' stroke='%23202020' stroke-miterlimit='10' stroke-width='2'/%3E%3Cline x1='48' y1='32' x2='16' y2='32' fill='none' stroke='%23202020' stroke-miterlimit='10' stroke-width='2'/%3E%3C/svg%3E" -X POST https://micro-outline-stroke.now.sh/
  ```
  
1. `url` as input

  ```zsh
  curl -d "input=https://s3-us-west-2.amazonaws.com/s.cdpn.io/46176/food_2-line-48.svg" -X POST https://micro-outline-stroke.now.sh/
  ```
1. scaling the output

  ```zsh
  curl -d "input=https://s3-us-west-2.amazonaws.com/s.cdpn.io/46176/food_2-line-48.svg&width=1000&height=1000" -X POST https://micro-outline-stroke.now.sh/
  ```
