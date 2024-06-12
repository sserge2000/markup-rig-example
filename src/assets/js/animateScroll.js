(function(window, $) {
    const $wrapper = $(document);

    const fixedTopSelector = '.js-animate-scroll__fixed-top'
    const linkSelector = '.js-animate-scroll__link';
    const blockSelector = '.js-animate-scroll__block';

    window.initAnimateScroll = function() {
        $wrapper.find(linkSelector).click(handleLinkItemClick);
    }

    function handleLinkItemClick(event) {
        const $linkItem = $(event.currentTarget);
        const pageBlockIndex = $linkItem.attr('data-index');
        const $pageBlock = $wrapper.find(blockSelector + `[data-index=${pageBlockIndex}]`);
        const fixedTopHeight = $wrapper.find(fixedTopSelector)[0].scrollHeight;
        const freeSpaceHeightBeforeTarget = fixedTopHeight + 50;
        var offset = $pageBlock.offset().top - freeSpaceHeightBeforeTarget;
        $('html, body').animate(
            {
                scrollTop: offset,
            },
            300
        )
    }

})(window, jQuery);


