;( function($, window) {
  /* *************** Methods for ghostExpander plugin
   * GhostExpander
   *
   * Given a container, adds a button after the container and when click expands to full height and collapses
   * to default height or to defined height by options.
   * test
   */
  // Methods for ghostExpander plugin
  // TODO: add a destroy method
  var methods = {
    init : function(options){
      var $this = $(this),
          defaults = {},
          obj = {},
          selector = $this.selector == '' ? '.' + $this.attr('class').split(' ').join('.') : $this.selector;
      if($this.attr('data-ghostexpander')){
        defaults = {
          'height':typeof $this.attr('data-ge-height') == 'undefined' ? 300 : $this.attr('data-ge-height'),
          'expandedHTML':typeof $this.attr('data-ge-expandedHTML') == 'undefined' ? '<small><strong>VIEW LESS</strong></small>' : $this.attr('data-ge-expandedHTML'),
          'collapsedHTML':typeof $this.attr('data-ge-collapsedHTML') == 'undefined' ? '<small><strong>VIEW MORE</strong></small>' : $this.attr('data-ge-collapsedHTML'),
          'overflowOverride':typeof $this.attr('data-ge-overflowOverride') == 'undefined' ? false : $this.attr('data-ge-overflowOverride'),
          'speed':typeof $this.attr('data-ge-speed') == 'undefined' ? 'fast' : $this.attr('data-ge-speed')};
      } else {
        defaults = {
          'height':typeof options.height == 'undefined' ? 300 : options.height,
          'expandedHTML':typeof options.expandedHTML == 'undefined' ? '<small><strong>VIEW LESS</strong></small>' : options.expandedHTML,
          'collapsedHTML':typeof options.collapsedHTML == 'undefined' ? '<small><strong>VIEW MORE</strong></small>' : options.collapsedHTML,
          'overflowOverride':typeof options.overflowOverride == 'undefined' ? false : options.overflowOverride,
          'speed':typeof options.speed == 'undefined' ? 'fast' : options.speed};
      }
      // Set the defaults data for the element that was called. Will be referred to later when called from multiple instances.
      this.data({'defaults': defaults, 'startheight':$this.height()});
      // Set height to the default if the contents are larger than what is default and add classes
      if($this.height() > defaults.height){
        $this.height(defaults.height)
          .addClass('mask-image-10')
          .after('<div class="clear"></div><div class="text-center"><button class="btn btn-link ghostExpanderButton" data-ghostexpand-parent="' + selector + '" type="button">' + defaults.collapsedHTML + '</button></div>');
        if(defaults.overflowOverride == true || defaults.overflowOverride == 'true'){
          $this.css({'overflow-x':'hidden', 'overflow-y':'scroll','padding-right':'5px'});
        }
      }
      // Click event for ghostexpander button, uses .data of parent
      $('.ghostExpanderButton[data-ghostexpand-parent="' + selector + '"]').on('click', function(){
        var me = $(this),
            parent = $(me.attr('data-ghostexpand-parent')),
            parentDefaults = parent.data('defaults');
        if(me.hasClass('show-less')){
          me.removeClass('show-less').html(parentDefaults.collapsedHTML);
          parent.addClass('mask-image-10')
            .animate({'height':parent.data('defaults').height}, parentDefaults.speed, function(e){
              if(defaults.overflowOverride == true || defaults.overflowOverride == 'true'){
                parent.css({'overflow-x':'hidden', 'overflow-y':'scroll'});
              }
            });
        } else {
          me.addClass('show-less').html(parentDefaults.expandedHTML);
          parent.removeClass('mask-image-10')
            .animate({'height':parent.data('startheight')}, parentDefaults.speed, function(e){
              // Do nothing?
            });
        }
      });
      return this;
    }
  }

  $.fn.ghostExpander = function(methodOrOptions) {
    if ( methods[methodOrOptions] ) {
        return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
        // Default to "init"
        return methods.init.apply( this, arguments );
    } else {
        $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.ghostExpander' );
    }
  }
}(jQuery, window));
