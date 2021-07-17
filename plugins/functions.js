export default ({ app }, inject) => {
  inject('goTo', (path) => {
    app.router.push({ path })
  })
  inject('hex2rgb', (hex) => {
    const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    const r = parseInt(res[1], 16)
    const g = parseInt(res[2], 16)
    const b = parseInt(res[3], 16)
    return res ? String(r) + ',' + String(g) + ',' + String(b) : null
  })
  inject('changeColorBrightness', (color, offset) => {
    // INPUT: color:   hex (with or without #)
    //        offset:  % (from -100 to 100)
    let needHash = false
    if (color[0] === '#') {
      color = color.slice(1)
      needHash = true
    }
    const hex = parseInt(color, 16)
    let r = hex >> 16
    r += (r * offset) / 100
    if (r > 255) r = 255
    else if (r < 0) r = 0

    let g = (hex >> 8) & 0x00ff
    g += (g * offset) / 100
    if (g > 255) g = 255
    else if (g < 0) g = 0

    let b = hex & 0x0000ff
    b += (b * offset) / 100
    if (b > 255) b = 255
    else if (b < 0) b = 0

    return (needHash ? '#' : '') + (b | (g << 8) | (r << 16)).toString(16)
  })
}
