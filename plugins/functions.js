export default ({ app }, inject) => {
  inject('hex2rgb', (hex) => {
    const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    const r = parseInt(res[1], 16)
    const g = parseInt(res[2], 16)
    const b = parseInt(res[3], 16)
    return res ? String(r) + ',' + String(g) + ',' + String(b) : null
  })
}
