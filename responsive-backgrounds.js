/**
 * Toggle background image by listening to media queries for a set of break points.
 * Requires window.matchMedia support, so IE 9 ain't supported.
 */
class ResponsiveBG {

	constructor(options) {
		if(typeof window.matchMedia !== 'function') {
			console.warn('ResponsiveBG - window.matchMedia support required.');
			return;
		}
		this.options = $.extend({
			$el: $('.bg-switch')
		}, options);
		this.$el = this.options.$el;
		this._saveInitialBackground();
		this._events();
	}

	_events() {
		for(var bp in this.options.breakpoints){

			// add label for reference in event
			this.options.breakpoints[bp].label = bp;

			// also update backgrounds first up
			if(this.options.breakpoints[bp].matches){
				this.updateBackgrounds(bp);
			}

			// apply matchMedia listeners
			this.options.breakpoints[bp].addListener((e) => {
				if(e.matches){
					// this addresses a browser quirk in FF (or Safari?)
					var curBp = (e.label) ? e.label : e.currentTarget.label;
					this.updateBackgrounds(curBp);
				}
			});
		}
	}

	_saveInitialBackground () {
		this.$el.each(function(index, item){
			var bgImg = window.getComputedStyle(item, null)['background-image'];
			if(bgImg){
				$(item).data('original-bg', bgImg);
			}
		});
	}

	updateBackgrounds (breakpointName){
		// must be a breakpoints key
		if(Object.keys(this.options.breakpoints).indexOf(breakpointName) !== -1){
			this.$el.each(function(index, item){
				// find BG image URL on element and update inline style
				var bg = $(item).data(`bg-${breakpointName}`);
				if(bg){
					// Insert initial BG as first BG to prevent blank panel while new image loads
					var bgPath = 'url(\''+ bg+ '\')';
					if($(item).data('original-bg')){
						bgPath = `url('${bg}'),${$(item).data('original-bg')}`;
					}
					$(item).css({
						'background-image': bgPath
					});
				}else{
					console.warn(`ResponsiveBG - Cannot find image for ${breakpointName} size.`);
				}
			});
		}else{
			console.warn(`ResponsiveBG - Invalid breakpoint name: ${breakpointName}`);
		}
	}
};
