class Info {
  
  /**
   * Get a dom node and append a pre element with text to render
   * @param {HTMLDivElement} node 
   * @param {any} text 
   */
  static render(node, text) {
    const pre = document.createElement('pre');
    pre.textContent = text;
    node.innerHTML = '';
    node.style.backgroundColor = 'red';
    setTimeout(() => {
      node.style.backgroundColor = 'white';
    }, 100);
    node.appendChild(pre);
  }

}

export default Info;