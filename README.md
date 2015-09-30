# Responsive Backgrounds
This is a small utility module for swapping out background images based on different window widths.

It's useful when working with CMS/dynamically generated HTML. It also lets you have images with different aspect ratios for different screens sizes, e.g. portrait for mobile and landscape for desktop.

It utilizes [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) and is written in ES6/ES2015, compiled with [Babel](http://babeljs.io/). An ES5 version is compiled to `dist`

## Usage

### Add data attributes to element

    <section class="rsp-bg" style="background-image: url('img/small.jpg');"
     data-bg-small="img/small.jpg"
     data-bg-medium="img/medium.jpg"
     data-bg-large="img/large.jpg">
    </section>

### Instantiate class

    new ResponsiveBG({
        $el: $('.rsp-bg'),
        breakpoints: {
            small: window.matchMedia('all and (max-width: 767px)'),
            medium: window.matchMedia('all and (min-width:768px ) and (max-width: 1440px)'),
            large: window.matchMedia('all and (min-width: 1441px)')
        }
    });

### Options

- `$el` should be the jQuery object you want to target.
- `breakpoints` a hash of MediaQueryList's, the keys should correspond to the data attribute names on `$el`, e.g. `data-bg-query-name`

Have a look at `index.html` as an example.

## Browser Support
Evergreen browsers, IE10 and up.

## Dependencies
- [jQuery](https://jquery.com/)

## Dev Dependencies
- [Babel](http://babeljs.io/)
