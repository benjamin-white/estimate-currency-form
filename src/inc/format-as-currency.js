const formatAsCurrency = (string) => {

  if (typeof string !== 'string') return ''

  return string.replace(/[^0-9.]/g, '').replace(/(\.[0-9]{2}?).*/g, '$1')

}

export default formatAsCurrency