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
    for (var bp in this.breakpoints) {

      // remove and skip invalid breakpoints
      if (this.breakpoints[bp].constructor.name !== 'MediaQueryList') {
        console.warn(`ResponsiveBackgrounds - Invalid breakpoint ${bp}.`);
        delete this.breakpoints[bp];
        continue;
      }

      // add label for reference in event
      this.breakpoints[bp].label = bp;

      // also update backgrounds first up
      if (this.breakpoints[bp].matches) {
        this._updateBackgrounds(this.elements, bp);
      }

      // apply matchMedia listeners
      this.breakpoints[bp].addListener((e) => {
        if (e.matches) {
          // this addresses a browser quirk in FF (or Safari?)
          var curBp = (e.label) ? e.label : e.currentTarget.label;
          this._updateBackgrounds(this.elements, curBp);
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
   * @param breakpointName {Object}
   * @private
   */
  _updateBackgrounds(elements, breakpointName) {

    // find and validate breakpoint
    let currentBp = this.breakpoints[breakpointName],

      // data attributes are automatically camelCased - so 'data-bg-small' becomes 'bgSmall'
      bpNameUc = breakpointName.charAt(0).toUpperCase() + breakpointName.slice(1);

    if (currentBp && currentBp.constructor.name === 'MediaQueryList') {

      // loop over elements
      elements.map((val) => {
        let origBg = val.dataset.originalImage,
          newBg = val.dataset['bg' + bpNameUc];

        if(newBg) {
          // set multiple backgrounds if original bg is set
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
