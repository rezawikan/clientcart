let hasScrollbar = function() {
  // The Modern solution
  if (typeof window.innerWidth === 'number') {
    return window.innerWidth > document.documentElement.clientWidth;
  }

  // rootElem for quirksmode
  let rootElem = document.documentElement || document.body;

  // Check overflow style property on body for fauxscrollbars
  let overflowStyle;

  if (typeof rootElem.currentStyle !== 'undefined') {
    overflowStyle = rootElem.currentStyle.overflow;
  }

  overflowStyle = overflowStyle || window.getComputedStyle(rootElem, '').overflow;

  // Also need to check the Y axis overflow
  let overflowYStyle;

  if (typeof rootElem.currentStyle !== 'undefined') {
    overflowYStyle = rootElem.currentStyle.overflowY;
  }

  overflowYStyle = overflowYStyle || window.getComputedStyle(rootElem, '').overflowY;

  let contentOverflows = rootElem.scrollHeight > rootElem.clientHeight;
  let overflowShown = /^(visible|auto)$/.test(overflowStyle) || /^(visible|auto)$/.test(overflowYStyle);
  let alwaysShowScroll = overflowStyle === 'scroll' || overflowYStyle === 'scroll';

  return (contentOverflows && overflowShown) || (alwaysShowScroll);
};

if (hasScrollbar()) {
  document.body.classList.add('hasScrollbar')
}


let empty = document.getElementsByClassName('a[href="#"]');

if (empty.length) {
  empty.addEventListener('click', function(e) {
    e.preventDefault();
  });
}
