now = new Date;
console.log('Starting translation (' + now.toLocaleString() + ')');

/* Create Progress Indicator */
var statusIndicator = document.createElement('div');
statusIndicator.style.cssText = 'position:fixed;top:5px;right:5px;font:18px sans-serif;color:white;border:0px solid;background-color:black;z-index:100000;';
document.body.appendChild(statusIndicator);

var i = 0, length = CardList.length;
var busy = false;

var process = setInterval(function() {
  if (!busy) {
    busy = true;
    var current = CardList[i];
    var text = '(' + (i+1) + '/' + length + ') '
    console.log(text + current["en_name"] + ' => ' + current["ja_name"]);
    statusIndicator.innerHTML = ' カードを和訳中: ' + text;
    findAndReplace(current["en_name"],current["ja_name"]);
    i++;

    if (i == length) {
      clearInterval(process);
      /* Close Progress Indicator */
      statusIndicator.parentNode.removeChild(statusIndicator);
    }

    busy = false
  }
}, 1)

now = new Date;
console.log('Complete translation (' + now.toLocaleString() + ')');


/** Code below came from http://james.padolsey.com/snippets/find-and-replace-text-with-javascript/ **/
function makeRegExp(str) {
  return new RegExp('\\b' + str.replace(new RegExp(':', 'g'), ':?').replace(new RegExp('\'', 'g'), '[\u0060\u2019\']?').replace(new RegExp('-', 'g'), '[\u0020-]?') + '[sS]?\\b', 'gi');
}

function findAndReplace(searchText, replacement, searchNode) {
  var regex = makeRegExp(searchText),
    childNodes = (searchNode || document.body).childNodes,
    cnLength = childNodes.length,
    excludes = 'html,head,style,title,link,meta,script,object,iframe,input,textarea,select';

  while (cnLength--) {
    var currentNode = childNodes[cnLength];
    if (currentNode.nodeType === 1 &&
      (',' + excludes + ',').indexOf(',' + currentNode.nodeName.toLowerCase() + ',') === -1) {
      arguments.callee(searchText, replacement, currentNode);
    }
    if (currentNode.nodeType !== 3 || !regex.test(currentNode.data) ) {
      continue;
    }
    var parent = currentNode.parentNode,
      frag = (function(){
        var html = currentNode.data.replace(regex, replacement),
          wrap = document.createElement('div'),
          frag = document.createDocumentFragment();
        wrap.innerHTML = html;
        while (wrap.firstChild) {
          frag.appendChild(wrap.firstChild);
        }
        return frag;
      })();
    parent.insertBefore(frag, currentNode);
    parent.removeChild(currentNode);
  }
}
