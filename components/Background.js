import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import * as dat from 'lil-gui'

const Background = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = document.getElementById('canvas')
    if (!canvas) return
    canvasRef.current = canvas

    const gui = new dat.GUI({ width: 300 })
    gui.show(false)

    const scene = new THREE.Scene()

    const sizes = {
      width: innerWidth,
      height: innerHeight,
    }

    // Camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
    camera.position.setZ(0)

    // Controls
    // const controls = new OrbitControls(camera, canvas)
    // controls.enableDamping = true

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Geometry
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2)

    const materialParams = {
      metalness: 1.0,
      roughness: 0.1,
    }

    // 立方体
    const cubeMaterial = new THREE.MeshStandardMaterial({
      color: 'rgb(252,87,0)',
      metalness: materialParams.metalness,
      roughness: materialParams.roughness,
    })

    gui.addColor(cubeMaterial, 'color').name(' Cube Color')

    gui
      .add(materialParams, 'metalness', 0, 1)
      .onChange((value) => {
        cubeMaterial.metalness = value
      })
      .name('Cube Metalness')

    gui
      .add(materialParams, 'roughness', 0, 1)
      .onChange((value) => {
        cubeMaterial.roughness = value
      })
      .name('Cube Roughness')

    // エッジ
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 'rgb(255,0,0)', linewidth: 2 })

    gui.addColor(edgeMaterial, 'color').name(' Cube Color')

    // 立方体の配置
    const positions = [
      [2.25, 0, 0],
      [0, -2.25, 0],
      [-2.25, 0, 0],
      [0, 2.25, 0],
    ]
    const distance = 5
    let cubesArray = []
    let edgesArray = []

    // 初期の立方体を配置
    const createCubes = (layer) => {
      positions.forEach((pos) => {
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cube.position.set(pos[0], pos[1], -layer * distance)
        scene.add(cube)
        cubesArray.push(cube)

        // エッジの作成
        const edges = new THREE.EdgesGeometry(cubeGeometry)
        const edgeLines = new THREE.LineSegments(edges, edgeMaterial)
        edgeLines.position.set(pos[0], pos[1], -layer * distance)
        edgeLines.rotation.z = Math.sin(Math.PI / 4)
        scene.add(edgeLines)
        edgesArray.push(edgeLines)
      })
    }

    // 光源を作成
    const pointLight = new THREE.PointLight(0xffffff, 10000, 1000)
    gui.add(pointLight, 'intensity', 0, 10000, 1.0).name('Point Light Intensity')
    scene.add(pointLight)

    // Animation
    let cameraZ = 0
    let layer = 0
    const render = () => {
      cameraZ -= 0.05
      camera.position.z = cameraZ
      pointLight.position.z = cameraZ - 1

      cubesArray.forEach((c) => {
        c.rotation.z -= Math.sin(Math.PI / 180)
      })

      if (cubesArray.length < 100) {
        layer += 1
        createCubes(layer)
      }

      if (cubesArray.length > 0 && cubesArray[0].position.z > camera.position.z) {
        const removedCube = cubesArray.shift()
        if (removedCube) {
          scene.remove(removedCube)
        }
      }

      if (edgesArray.length > 0 && edgesArray[0].position.z > camera.position.z) {
        const removedEdge = edgesArray.shift()
        if (removedEdge) {
          scene.remove(removedEdge)
        }
      }

      window.requestAnimationFrame(render)
      renderer.render(scene, camera)
    }
    render()

    // ブラウザのリサイズ操作
    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
  }, [])

  return (
    <>
      <canvas id="canvas" className="fixed -z-10"></canvas>
    </>
  )
}

export default Background
