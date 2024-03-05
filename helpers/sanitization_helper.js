function sanitizeStrings ({ req, params }) {
  const newObj = {}
  for (const key in params) {
    if (Object.hasOwnProperty.call(params, key)) {
      newObj[key] = (typeof params[key] === 'string' || params[key] instanceof String) ? req.sanitize(params[key]).trim() : params[key]
    }
  }

  return newObj
}

function removeHtmlFromString (strInputCode) {
  return strInputCode.replace(/<\/?[^>]+(>|$)/g, '')
}

export {
  sanitizeStrings,
  removeHtmlFromString
}
