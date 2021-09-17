function throttle(delay, noTrailing, callback, debounceMode) {
  let timeoutID
  let lastExec = 0
  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback
    callback = noTrailing
    noTrailing = undefined
  }

  function wrapper(...args) {
    const self = this
    const elapsed = Number(new Date()) - lastExec

    function exec() {
      lastExec = Number(new Date())
      callback.apply(self, args)
    }

    function clear() {
      timeoutID = undefined
    }

    if (debounceMode && !timeoutID) {
      exec()
    }

    if (timeoutID) {
      clearTimeout(timeoutID)
    }

    if (debounceMode === undefined && elapsed > delay) {
      exec()
    } else if (noTrailing !== true) {
      timeoutID = setTimeout(
        debounceMode ? clear : exec,
        debounceMode === undefined ? delay - elapsed : delay
      )
    }
  }

  return wrapper
}

function debounce(delay, atBegin, callback) {
  return callback === undefined
    ? throttle(delay, atBegin, false)
    : throttle(delay, callback, atBegin !== false)
}

function blackListReg(list,url){
  let bool = false;
  let len = Array.isArray(list)?list.length:0
  for(let i=0;i<len;i++){
      if(url.indexOf(list[i])!==-1){
      // if(new RegExp(`^([a-z|A-Z])+?://([^/?#]+[.])?(${list[i]})?(/.*)?$`).test(url)){
          bool = true;
          break;
      }
  }

  return bool;
}

module.exports = {
  throttle,
  debounce,
  blackListReg
}
