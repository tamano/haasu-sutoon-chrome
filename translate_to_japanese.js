now = new Date;
console.log('Starting translation (' + now.toLocaleString() + ')');

count = CardList.length;
i = 0;

for (id in CardList) {
  i++;
  console.log('(' + i + '/' + count + ') ' + CardList[id]["en_name"] + ' => ' + CardList[id]["ja_name"]);
  findAndReplace(CardList[id]["en_name"],CardList[id]["ja_name"]);
}

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
