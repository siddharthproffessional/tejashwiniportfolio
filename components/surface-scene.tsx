'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Illustrative DCF sensitivity surface: value as a function of discount rate (WACC) and
 * terminal growth, drawn as a contoured emerald-to-gold terrain with a wireframe overlay
 * and three scenario markers. Shape only — no real company data.
 */

const W_RANGE: [number, number] = [0.07, 0.13]
const G_RANGE: [number, number] = [0.0, 0.04]

/** Normalised Gordon-growth value (1+g)/(w-g) mapped into roughly 0..1 over the grid. */
function value(u: number, v: number) {
  const w = W_RANGE[0] + (u * 0.5 + 0.5) * (W_RANGE[1] - W_RANGE[0])
  const g = G_RANGE[0] + (v * 0.5 + 0.5) * (G_RANGE[1] - G_RANGE[0])
  const raw = (1 + g) / (w - g)
  const lo = (1 + G_RANGE[0]) / (W_RANGE[1] - G_RANGE[0])
  const hi = (1 + G_RANGE[1]) / (W_RANGE[0] - G_RANGE[1])
  return (raw - lo) / (hi - lo)
}

const vertex = /* glsl */ `
  uniform float uRise; uniform float uTime;
  attribute float aValue;
  varying float vH; varying vec2 vUv;
  void main() {
    vUv = uv;
    float ripple = 0.018 * sin(length(position.xz) * 5.0 - uTime * 0.8);
    float h = (aValue * 1.35 + ripple) * uRise;
    vH = aValue;
    vec3 p = vec3(position.x, h, position.z);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }`

const surfaceFrag = /* glsl */ `
  uniform float uRise; uniform float uOpacity;
  varying float vH; varying vec2 vUv;
  void main() {
    vec3 deep = vec3(0.03, 0.16, 0.11);
    vec3 emer = vec3(0.16, 0.55, 0.40);
    vec3 gold = vec3(0.86, 0.68, 0.33);
    vec3 col = mix(deep, emer, smoothstep(0.0, 0.45, vH));
    col = mix(col, gold, smoothstep(0.45, 1.0, vH));
    // Contour lines every 0.08 of value
    float c = abs(fract(vH * 12.5) - 0.5);
    float line = 1.0 - smoothstep(0.0, 0.04, c);
    col = mix(col, vec3(0.97, 0.86, 0.58), line * 0.55 * uRise);
    // Fade toward the edges of the grid
    float edge = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x) * smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.88, vUv.y);
    gl_FragColor = vec4(col, (0.55 + 0.35 * vH) * edge * uOpacity);
  }`

const wireFrag = /* glsl */ `
  uniform float uOpacity; varying float vH; varying vec2 vUv;
  void main() {
    float edge = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x) * smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
    gl_FragColor = vec4(vec3(0.92, 0.78, 0.45), 0.22 * edge * uOpacity);
  }`

function label(text: string) {
  const c = document.createElement('canvas')
  const ctx = c.getContext('2d')!
  const font = '500 40px "JetBrains Mono Variable", ui-monospace, monospace'
  ctx.font = font
  const w = Math.ceil(ctx.measureText(text).width) + 32
  c.width = w
  c.height = 64
  ctx.font = font
  ctx.fillStyle = 'rgba(6,16,12,0.78)'
  ctx.strokeStyle = 'rgba(201,164,92,0.8)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.roundRect(1, 1, w - 2, 62, 8)
  ctx.fill()
  ctx.stroke()
  ctx.fillStyle = '#EFE8D8'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, 16, 34)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, opacity: 0 }))
  s.scale.set((w / 64) * 0.13, 0.13, 1)
  s.renderOrder = 5
  return s
}

export default function SurfaceScene({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      el.dataset.webgl = 'unavailable'
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.25 : 1.75))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)
    renderer.domElement.setAttribute('aria-hidden', 'true')
    renderer.domElement.style.touchAction = 'pan-y'
    renderer.domElement.style.cursor = 'grab'
    renderer.domElement.style.opacity = '0'
    renderer.domElement.style.transition = 'opacity 1s cubic-bezier(0.16,1,0.3,1)'

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.01, 50)

    const N = coarse ? 70 : 110
    const geo = new THREE.PlaneGeometry(2.6, 2.6, N, N)
    geo.rotateX(-Math.PI / 2)
    const pos = geo.attributes.position
    const values = new Float32Array(pos.count)
    for (let i = 0; i < pos.count; i++) values[i] = value(pos.getX(i) / 1.3, pos.getZ(i) / 1.3)
    geo.setAttribute('aValue', new THREE.BufferAttribute(values, 1))

    const uniforms = { uRise: { value: reduce ? 1 : 0 }, uTime: { value: 0 }, uOpacity: { value: 1 } }
    const surface = new THREE.Mesh(
      geo,
      new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: surfaceFrag, uniforms, transparent: true, side: THREE.DoubleSide, depthWrite: false }),
    )
    scene.add(surface)
    const wireGeo = new THREE.PlaneGeometry(2.6, 2.6, 36, 36)
    wireGeo.rotateX(-Math.PI / 2)
    const wpos = wireGeo.attributes.position
    const wv = new Float32Array(wpos.count)
    for (let i = 0; i < wpos.count; i++) wv[i] = value(wpos.getX(i) / 1.3, wpos.getZ(i) / 1.3)
    wireGeo.setAttribute('aValue', new THREE.BufferAttribute(wv, 1))
    const wire = new THREE.Mesh(wireGeo, new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: wireFrag, uniforms, transparent: true, wireframe: true, depthWrite: false }))
    wire.position.y = 0.004
    scene.add(wire)

    // Base plane grid
    const grid = new THREE.GridHelper(2.6, 13, '#2b4a3c', '#16291f')
    ;(grid.material as THREE.Material).transparent = true
    ;(grid.material as THREE.Material).opacity = 0.6
    scene.add(grid)

    // Scenario markers (illustrative)
    const markers = [
      { name: 'Bear', u: 0.55, v: -0.5 },
      { name: 'Base', u: -0.05, v: 0.05 },
      { name: 'Bull', u: -0.6, v: 0.55 },
    ].map((m) => {
      const x = m.u * 1.3
      const z = m.v * 1.3
      const h = value(m.u, m.v) * 1.35
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.022, 16, 16), new THREE.MeshBasicMaterial({ color: '#F3DFA8', transparent: true, opacity: 0 }))
      const stem = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, 0, z), new THREE.Vector3(x, h, z)]),
        new THREE.LineBasicMaterial({ color: '#C9A45C', transparent: true, opacity: 0 }),
      )
      const tag = label(m.name)
      tag.position.set(x, h + 0.13, z)
      scene.add(dot, stem, tag)
      return { dot, stem, tag, x, z, h }
    })

    // Axis captions
    const axes = [label('WACC →'), label('Terminal growth →'), label('Value ↑')]
    axes[0].position.set(0, 0.02, 1.48)
    axes[1].position.set(-1.55, 0.02, 0)
    axes[2].position.set(1.42, 0.75, -1.3)
    axes.forEach((a) => scene.add(a))

    const resize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      renderer.domElement.style.width = `${w}px`
      renderer.domElement.style.height = `${h}px`
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)

    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(el)

    const par = { x: 0, y: 0, tx: 0, ty: 0 }
    let drag = false
    let lastX = 0
    let user = 0
    let vel = 0
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        par.tx = (e.clientX / window.innerWidth - 0.5) * 2
        par.ty = (e.clientY / window.innerHeight - 0.5) * 2
      }
      if (drag) {
        vel = (e.clientX - lastX) * 0.006
        lastX = e.clientX
        user += vel
      }
    }
    const onDown = (e: PointerEvent) => {
      drag = true
      lastX = e.clientX
      renderer.domElement.style.cursor = 'grabbing'
    }
    const onUp = () => {
      drag = false
      renderer.domElement.style.cursor = 'grab'
    }
    renderer.domElement.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onUp)

    const pinned = new URLSearchParams(window.location.search).get('scene-t')
    const pinnedT = pinned !== null && Number.isFinite(Number(pinned)) ? Number(pinned) : null

    let raf = 0
    let t = 0
    let last = performance.now()
    let shown = false
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!visible || document.hidden) return
      // A static frame (reduced motion or a pinned time) only needs redrawing while the user interacts.
      const still = (reduce || pinnedT !== null) && !drag && Math.abs(vel) < 1e-4 && Math.abs(par.tx - par.x) + Math.abs(par.ty - par.y) < 1e-3
      if (shown && still && t > 0.5) return
      t += dt
      const tt = pinnedT ?? (reduce ? 6 : t)
      if (!drag) {
        vel *= 0.94
        user += vel
      }
      par.x += (par.tx - par.x) * 0.05
      par.y += (par.ty - par.y) * 0.05
      const rise = THREE.MathUtils.smoothstep(tt, 0.2, 2.6)
      uniforms.uRise.value = rise
      uniforms.uTime.value = reduce ? 0 : tt
      const mk = THREE.MathUtils.smoothstep(tt, 2.2, 3.4)
      markers.forEach((m, i) => {
        const k = THREE.MathUtils.smoothstep(tt, 2.2 + i * 0.25, 3.0 + i * 0.25)
        ;(m.dot.material as THREE.MeshBasicMaterial).opacity = k
        ;(m.stem.material as THREE.LineBasicMaterial).opacity = k * 0.8
        ;(m.tag.material as THREE.SpriteMaterial).opacity = k
        m.dot.position.set(m.x, m.h * rise, m.z)
      })
      axes.forEach((a) => ((a.material as THREE.SpriteMaterial).opacity = mk * 0.85))

      const ang = 0.72 + (reduce && pinnedT === null ? 0 : tt * 0.045) + user + par.x * 0.1
      const r = el.clientWidth < 700 ? 4.0 : 3.05
      const elev = 0.55 + par.y * 0.04
      camera.position.set(Math.sin(ang) * Math.cos(elev) * r, Math.sin(elev) * r + 0.2, Math.cos(ang) * Math.cos(elev) * r)
      camera.lookAt(0, 0.32, 0)
      renderer.render(scene, camera)
      if (!shown) {
        shown = true
        renderer.domElement.style.opacity = '1'
        el.dataset.webgl = 'ready'
      }
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      renderer.domElement.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      scene.traverse((o) => {
        const m = o as THREE.Mesh
        m.geometry?.dispose?.()
        const mat = m.material as THREE.Material | undefined
        ;(mat as THREE.SpriteMaterial | undefined)?.map?.dispose()
        mat?.dispose?.()
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={host} className={className} />
}
