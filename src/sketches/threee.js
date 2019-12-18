import * as THREE from 'three'

function threee({ canvas, closed, width, height }) {
  let scene = new THREE.Scene()
  let camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  let renderer = new THREE.WebGLRenderer({ canvas })

  renderer.setSize(width, height)

  let geo = new THREE.BoxGeometry(1, 1, 1)
  let mat = new THREE.MeshNormalMaterial()
  let mesh = new THREE.Mesh(geo, mat)

  scene.add(mesh)

  camera.position.z = 3

  function animate() {
    requestAnimationFrame(animate)
    mesh.rotation.x += 0.02
    mesh.rotation.y += 0.03
    mesh.rotation.z += 0.01
    renderer.render(scene, camera)
  }

  animate()
}

export { threee }
