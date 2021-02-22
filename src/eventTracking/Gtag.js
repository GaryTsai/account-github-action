import _isArray from 'lodash/isArray';

const DATA_LAYER = 'GdataLayer';
const TRACKER_ID = 'UA-189058769-1';
function Gtag() {
  try {
    const dl = window[DATA_LAYER] || [];
    if (!dl) {
      return;
    }
    if (!_isArray(dl)) {
      return;
    }
    dl.push(arguments);
  } catch (err) {
    console.log(err);
  }
}
export default class GTAG {
  constructor() {
    this.trackerId = TRACKER_ID;
    (async () => {
      if (this.isGtagLoaded()) {
        return;
      }
      await this._loadScript();
      this._init();
    })();
  }

  isGtagLoaded = () => this.isScriptLoaded('googletagmanager.com/gtag/js');

  isScriptLoaded = query => {
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      const src = scripts[i].src;
      if (!src) {
        continue;
      }
      if (src.indexOf(query) !== -1) {
        return true;
      }
    }
    return false;
  };

  _loadScript = async () => {
    window[DATA_LAYER] = window[DATA_LAYER] || [];
    return (function(i, s, o, g, r, a, m) {
      a = s.createElement(o);
      (m = s.getElementsByTagName(o)[0]);
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(window, document, 'script', 'https://www.googletagmanager.com/gtag/js?id=' + TRACKER_ID + '&l=' + DATA_LAYER);
  };

  _init = () => {
    Gtag('js', new Date());
  }

  pageview = page_path => this.event('pageview', page_path);

  event = (event_category, event_action, event_label, value) => {
    console.log(this.trackerId);
    Gtag('event', event_action, {
      event_category,
      event_label,
      value,
      send_to: this.trackerId,
    });
  };

}
