
const RESERVED_PROPS = {
  key: true,
  ref: true,
  // __self: true,
  // __source: true
}

const ReactCurrentOwner = {
  current: null
}

const REACT_ELEMENT_TYPE = Symbol('react.element')

/**
 * 
 * @param {String|Function|Symbol} type 
 * @param {Object} config 
 * @param {String|Function|Object} children 
 */
function createElement(type, config, ...children) {

  let props = {}

  let key = null
  let ref = null

  // TODO: 检查 key, ref
  key = config.key
  ref = config.ref

  // 除以上四个属性外的其他属性，都要拷到 props 中
  for (let propName in config) {
    if (
      Object.prototype.hasOwnProperty.call(config, propName) 
      && !RESERVED_PROPS.hasOwnProperty(propName)
    ) {
      props[propName] = config[propName]
    }
  }

  if (children.length) {
    props.children = children
  }

  return _ReactElement(type, key, ref, ReactCurrentOwner.current, props)
}



function _ReactElement(type, key, ref, owner, props) {
  const element = Object.create(null)

  element['$$typeof'] = REACT_ELEMENT_TYPE
  element['type'] = type
  element['key'] = key
  element['ref'] = ref
  element['props'] = props
  element['_owner'] = owner

  // self & source for _DEV_

  return element
}

