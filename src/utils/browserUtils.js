const utils = {
  isMobile: () => {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw(n|u)|c55\/|capi|ccwa|cdm|cell|chtm|cldc|cmd|co(mp|nd)|craw|da(it|ll|ng)|dbte|dcs|devi|dica|dmob|do(c|p)o|ds(12|d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(|_)|g1 u|g560|gene|gf5|gmo|go(\.w|od)|gr(ad|un)|haie|hcit|hd(m|p|t)|hei|hi(pt|ta)|hp( i|ip)|hsc|ht(c(| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i(20|go|ma)|i230|iac( ||\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|[a-w])|libw|lynx|m1w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|mcr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|([1-8]|c))|phil|pire|pl(ay|uc)|pn2|po(ck|rt|se)|prox|psio|ptg|qaa|qc(07|12|21|32|60|[2-7]|i)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h|oo|p)|sdk\/|se(c(|0|1)|47|mc|nd|ri)|sgh|shar|sie(|m)|sk0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h|v|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl|tdg|tel(i|m)|tim|tmo|to(pl|sh)|ts(70|m|m3|m5)|tx9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas|your|zeto|zte/i.test(
          a.substr(0, 4)
        )
      )
        check = true;

      if (/\(macintosh; intel mac os x 10_15\)/i.test(a)) {
        check = true;
      }
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  },
  isIOs: () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
  isAndroid: () => /android/i.test(navigator.userAgent),
  isQQBrowser: () => /QQBrowser/i.test(navigator.userAgent),
  isUCBrowser: () => /UBrowser/i.test(navigator.userAgent),
  isIE: () => !!document.documentMode,
  isEdge: () => !utils.isIE() && !!window.StyleMedia,
  isChrome: () => {
    if (utils.isIOs()) {
      const ua = navigator.userAgent;
      if (/chrome/i.test(ua)) {
        return true;
      }
      return /crios/i.test(ua);
    }
    return !!window.chrome && !!window.chrome.webstore;
  },
  isFirefox: () => typeof InstallTrigger !== "undefined",
  isWeixin: () => /weixin|micromessenger/i.test(navigator.userAgent),
  isSogou: () => /metasr/i.test(navigator.userAgent),
  isSony: () =>
    /401SO|402SO|501SO|502SO|601SO|602SO|701SO|D200✕|D21✕✕|D2202|D2203|D2206|D2212|D2243|D2302|D2303|D2305|D2306|D240✕|D2502|D2533|D510✕|D5303|D5306|D5322|D5788|D58✕✕|D65✕✕|D6563|D6603|D6616|D6633|D6643|D6646|D6653|D6683|D6708|E2003|E2006|E2033|E2043|E2053|E2104|E2105|E2114|E2115|E2124|E2303|E2306|E2312|E2333|E2353|E2363|E5303|E5306|E5333|E5343|E5353|E5363|E5506|E5533|E5553|E5563|E5603|E5606|E5633|E5643|E5653|E5663|E58✕✕|E6533|E6553|E6583|E6603|E6633|E6653|E6683|E6833|E6853|E6883|F3111|F3112|F3113|F3115|F3116|F3211|F3212|F3213|F3215|F3216|F3311|F3313|F5121|F5122|F5321|F8131|F8132|F8331|F8332|G2199|G2299|G3112|G3116|G3121|G3123|G3125|G3212|G3221|G3223|G3226|G3311|G3312|G3313|G3412|G3416|G3421|G3423|G3426|G8141|G8142|G8231|G8232|G8341|G8342|G8343|G8441|H3113|H3123|H3133|H3213|H3223|H3311|H3321|H4113|H4133|H4213|H4233|H4311|H4331|L50t|L50u|L50w|L55t|L55u|M50w|S50h|S55t|S55u|S55w|SO-01G|SO-01H|SO-01J|SO-01K|SO-02G|SO-02H|SO-02J|SO-02K|SO-03F|SO-03G|SO-03H|SO-03J|SO-04F|SO-04G|SO-04H|SO-04J|SOL25|SOL26|SOV31|SOV32|SOV33|SOV34|SOV35|SOV36|XM50h|XM50t/i.test(
      navigator.userAgent
    ),
  isChrome64: () => /Chrome\/64/i.test(navigator.userAgent),
  isIOsChrome7X: () =>
    utils.isIOs() && /crios\/7[0-9]/i.test(navigator.userAgent),
  isSamsung: () =>
    /samsung/i.test(navigator.userAgent) ||
    /android.*SM-/i.test(navigator.userAgent),
  isSafari: () => {
    const ua = navigator.userAgent;
    if (/safari/i.test(ua)) {
      if (/chrome/i.test(ua)) {
        return false;
      }
      if (/crios/i.test(ua)) {
        return false;
      }
      return !/fxios/i.test(ua);
    }
    return false;
  },
};
export default utils;
