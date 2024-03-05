function getURLScope ({ url }) {
  const urlSplitted = url.split('/')
  return urlSplitted[urlSplitted.length - 1]
}

export default getURLScope
