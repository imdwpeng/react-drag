/*
 * @Author: Dong
 * @Date: 2021-01-11 15:43:36
 * @LastEditors: Dong
 * @LastEditTime: 2021-01-11 15:47:15
 */
export const parent = (target, classname) => {
  const { parentNode, tagName } = target;

  if (tagName === 'BODY') return null;

  if (parentNode.classList.contains(classname)) {
    return parentNode;
  }

  return parent(parentNode, classname);
};
