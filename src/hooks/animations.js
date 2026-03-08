import { useEffect, useRef, useState } from 'react'

export function useReveal(delay = 0, threshold = 0.12) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => el.classList.add('in'), delay)
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay, threshold])
  return ref
}

export function useFadeIn(initialVisible = false, delay = 400) {
  const [visible, setVisible] = useState(initialVisible)
  useEffect(() => {
    if (initialVisible) return
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [initialVisible, delay])

  const fadeOut = (duration = 200) => {
    setVisible(false)
    setTimeout(() => setVisible(true), duration)
  }

  return { visible, setVisible, fadeOut }
}

export function useGlobeAnimation(canvasRef, projects) {
  const stateRef = useRef({
    rotY: 0.4, rotX: 0.12, targetRotY: 0.4, targetRotX: 0.12,
    spinning: true, spinSpeed: 0.003,
    isDragging: false, lastMX: 0, lastMY: 0,
    pulseAlpha: 0, pulsing: false, raf: null,
  })

  const triggerSwitch = (newTargetRotY, newTargetRotX) => {
    const st = stateRef.current
    st.spinning = false
    st.spinSpeed = 0
    st.targetRotY = newTargetRotY
    st.targetRotX = newTargetRotX
    setTimeout(() => { st.pulsing = true; st.pulseAlpha = 1 }, 380)
    setTimeout(() => { st.spinSpeed = 0.003; st.spinning = true }, 1100)
  }

  const getRotY = () => stateRef.current.rotY

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width, H = canvas.height
    const R = W * 0.455, cx = W / 2, cy = H / 2
    const st = stateRef.current

    const CONTINENTS = [
      [[-130,60],[-125,48],[-95,50],[-85,45],[-75,45],[-65,44],[-60,46],[-55,50],[-60,60],[-70,65],[-90,70],[-110,72],[-130,70],[-140,62],[-130,60]],
      [[-115,32],[-110,30],[-105,20],[-100,18],[-90,15],[-85,10],[-80,8],[-77,10],[-78,15],[-85,20],[-90,20],[-95,22],[-100,22],[-107,26],[-115,32]],
      [[-78,10],[-65,12],[-55,5],[-50,0],[-35,-5],[-35,-10],[-40,-20],[-45,-25],[-48,-28],[-55,-35],[-65,-40],[-70,-50],[-75,-50],[-72,-40],[-70,-30],[-70,-18],[-75,-10],[-80,-5],[-78,10]],
      [[10,35],[25,35],[30,40],[35,42],[30,50],[25,55],[20,60],[15,65],[10,62],[5,58],[0,51],[-5,48],[-10,42],[-8,38],[0,38],[10,38],[10,35]],
      [[10,35],[35,35],[40,30],[45,12],[42,10],[40,5],[35,0],[40,-5],[35,-10],[25,-15],[20,-20],[25,-30],[30,-35],[25,-34],[18,-28],[15,-20],[10,-5],[5,5],[0,5],[-15,10],[-18,15],[-16,20],[-12,28],[0,30],[10,35]],
      [[30,40],[40,40],[50,35],[60,25],[70,20],[80,12],[90,8],[100,5],[105,10],[110,20],[120,25],[130,35],[140,40],[145,44],[140,55],[130,60],[120,65],[100,72],[80,73],[60,70],[50,65],[40,60],[30,55],[25,55],[30,50],[35,42],[30,40]],
      [[115,-22],[120,-18],[130,-12],[138,-12],[145,-18],[150,-22],[152,-26],[148,-32],[142,-38],[130,-35],[120,-30],[115,-28],[115,-22]],
    ]

    function project(lon, lat) {
      const lr = lon * Math.PI / 180, la = lat * Math.PI / 180
      const x0 = Math.cos(la) * Math.cos(lr), y0 = Math.sin(la), z0 = Math.cos(la) * Math.sin(lr)
      const x1 = x0 * Math.cos(st.rotY) + z0 * Math.sin(st.rotY)
      const z1 = -x0 * Math.sin(st.rotY) + z0 * Math.cos(st.rotY)
      const y2 = y0 * Math.cos(st.rotX) - z1 * Math.sin(st.rotX)
      const z2 = y0 * Math.sin(st.rotX) + z1 * Math.cos(st.rotX)
      return { sx: cx + x1 * R, sy: cy - y2 * R, visible: z2 > -0.08 }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      const atm = ctx.createRadialGradient(cx, cy, R * .88, cx, cy, R * 1.18)
      atm.addColorStop(0, 'rgba(201,168,76,0)')
      atm.addColorStop(.5, 'rgba(201,168,76,0.05)')
      atm.addColorStop(1, 'rgba(201,168,76,0)')
      ctx.fillStyle = atm
      ctx.beginPath()
      ctx.arc(cx, cy, R * 1.18, 0, Math.PI * 2)
      ctx.fill()
      const og = ctx.createRadialGradient(cx - R * .3, cy - R * .3, 0, cx, cy, R)
      og.addColorStop(0, '#0e2040')
      og.addColorStop(1, '#050c1a')
      ctx.fillStyle = og
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = 'rgba(201,168,76,0.06)'
      ctx.lineWidth = 0.5
      for (let lon = -180; lon <= 180; lon += 30) {
        ctx.beginPath()
        let f = true
        for (let lat = -90; lat <= 90; lat += 3) {
          const p = project(lon, lat)
          if (p.visible) {
            if (f) ctx.moveTo(p.sx, p.sy)
            else ctx.lineTo(p.sx, p.sy)
            f = false
          } else f = true
        }
        ctx.stroke()
      }
      for (let lat = -90; lat <= 90; lat += 30) {
        ctx.beginPath()
        let f = true
        for (let lon = -180; lon <= 180; lon += 3) {
          const p = project(lon, lat)
          if (p.visible) {
            if (f) ctx.moveTo(p.sx, p.sy)
            else ctx.lineTo(p.sx, p.sy)
            f = false
          } else f = true
        }
        ctx.stroke()
      }
      for (const pts of CONTINENTS) {
        ctx.beginPath()
        let started = false
        for (const [lo, la] of pts) {
          const p = project(lo, la)
          if (!started) {
            ctx.moveTo(p.sx, p.sy)
            started = true
          } else ctx.lineTo(p.sx, p.sy)
        }
        ctx.closePath()
        ctx.fillStyle = 'rgba(12,28,56,0.96)'
        ctx.fill()
        ctx.strokeStyle = 'rgba(201,168,76,0.4)'
        ctx.lineWidth = 1
        ctx.stroke()
      }
      const sp = ctx.createRadialGradient(cx - R * .38, cy - R * .32, 0, cx, cy, R)
      sp.addColorStop(0, 'rgba(232,200,112,0.14)')
      sp.addColorStop(.45, 'rgba(201,168,76,0.02)')
      sp.addColorStop(1, 'transparent')
      ctx.fillStyle = sp
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = 'rgba(201,168,76,0.22)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.stroke()
      if (st.pulsing) {
        ctx.strokeStyle = `rgba(201,168,76,${st.pulseAlpha})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(cx, cy, R + 10, 0, Math.PI * 2)
        ctx.stroke()
        ctx.strokeStyle = `rgba(232,200,112,${st.pulseAlpha * .45})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(cx, cy, R + 22, 0, Math.PI * 2)
        ctx.stroke()
        st.pulseAlpha -= 0.022
        if (st.pulseAlpha <= 0) st.pulsing = false
      }
    }

    function loop() {
      if (st.spinning && !st.isDragging) st.rotY += st.spinSpeed
      st.rotY += (st.targetRotY - st.rotY) * .055
      st.rotX += (st.targetRotX - st.rotX) * .055
      draw()
      st.raf = requestAnimationFrame(loop)
    }
    st.raf = requestAnimationFrame(loop)

    const onDown = (e) => {
      st.isDragging = true
      st.spinning = false
      st.lastMX = e.clientX
      st.lastMY = e.clientY
    }
    const onUp = () => {
      st.isDragging = false
      setTimeout(() => { st.spinning = true }, 1800)
    }
    const onMove = (e) => {
      if (!st.isDragging) return
      const dx = e.clientX - st.lastMX, dy = e.clientY - st.lastMY
      st.targetRotY += dx * .008
      st.targetRotX += dy * .008
      st.rotY = st.targetRotY
      st.rotX = st.targetRotX
      st.lastMX = e.clientX
      st.lastMY = e.clientY
    }
    canvas.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mousemove', onMove)
    return () => {
      cancelAnimationFrame(st.raf)
      canvas.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mousemove', onMove)
    }
  }, [canvasRef.current])

  return { triggerSwitch, getRotY }
}

export function useCursorAnimation(dotRef, ringRef) {
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 })

  useEffect(() => {
    const onMove = (e) => { pos.current.mx = e.clientX; pos.current.my = e.clientY }
    window.addEventListener('mousemove', onMove)
    let raf
    const tick = () => {
      const { mx, my } = pos.current
      let { rx, ry } = pos.current
      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px'
        dotRef.current.style.top = my + 'px'
      }
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      pos.current.rx = rx
      pos.current.ry = ry
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px'
        ringRef.current.style.top = ry + 'px'
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [dotRef, ringRef])

  return pos
}