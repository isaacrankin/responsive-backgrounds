/**
 * Toggle background image by listening to media queries for a set of break points.
 * Requires window.matchMedia support, so IE 9 ain't supported.
 */
class ResponsiveBackgrounds {

  constructor(options) {
    if (typeof window.matchMedia !== 'function') {
      console.warn('ResponsiveBackgrounds - window.matchMedia support is required.');
      return;
    }
    this.breakpoints = options.breakpoints;
    this.elements = this._saveInitialBackground(options.elements);
    this._events();
  }

  /**
   * Create the event listener's for media queries
   *
   * @private
   */
  _events() {
    let bps = this.breakpoints;

    for (var bp in bps) {

      // remove and skip invalid breakpoints
      if (Object.prototype.toString.call(bps[bp]) !== '[object MediaQueryList]') {
        console.warn(`ResponsiveBackgrounds - Invalid breakpoint ${bp}.`);
        delete bps[bp];
        continue;
      }

      // add label for reference in event
      bps[bp].label = bp;

      // also update backgrounds first up
      if (bps[bp].matches) {
        this._updateBackgrounds(this.elements, this.breakpoints, bp);
      }

      // apply matchMedia listeners
      bps[bp].addListener((e) => {
        if (e.matches) {
          // this addresses a browser quirk in Safari
          let curBp = (e.label) ? e.label : e.currentTarget.label;
          this._updateBackgrounds(this.elements, this.breakpoints, curBp);
        }
      });
    }
  }

  /**
   * Save the original background image on the element directly using HTMLElement.dataset
   *
   * @param elements {HTMLCollection}
   * @returns {Array}
   * @private
   */
  _saveInitialBackground(elements) {
    let els = [];
    for (let i = 0, l = elements.length; i < l; i++) {
      let bg = window.getComputedStyle(elements[i], null)['background-image'];
      if (bg) {
        elements[i].dataset.originalImage = bg;
      }
      els.push(elements[i]);
    }
    return els;
  }

  /**
   * Update the elements background images
   *
   * @param elements {Array}
   * @param breakpoints {Object}
   * @param breakpointName {String}
   * @private
   */
  _updateBackgrounds(elements, breakpoints, breakpointName) {

    // find and validate breakpoint
    let currentBp = breakpoints[breakpointName],

      // data attributes are automatically camelCased - so 'data-bg-small' becomes 'bgSmall'
      bpNameUc = breakpointName.charAt(0).toUpperCase() + breakpointName.slice(1);

    if (currentBp) {

      // loop over elements
      elements.map((val) => {
        let origBg = val.dataset.originalImage,
          newBg = val.dataset['bg' + bpNameUc];

        if(newBg) {
          // set multiple backgrounds if original bg is set
          // the original image will be visible while the new image loads
          val.style['background-image'] = (origBg) ? `${origBg}, url('${newBg}')` : `url('${newBg}')`;
        } else {
          console.warn(`ResponsiveBackgrounds - Cannot find image for ${breakpointName} size.`);
        }

      });
    } else {
      console.warn(`ResponsiveBackgrounds - Invalid breakpoint name: ${breakpointName}`);
    }
  }
}
