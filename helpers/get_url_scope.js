function getURLScope ({ originalUrl }) {
  const urlSplitted = originalUrl.split('/')
  return urlSplitted[urlSplitted.length - 1]
}

export default getURLScope
