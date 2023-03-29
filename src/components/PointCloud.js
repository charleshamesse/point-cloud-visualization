import { Canvas, useLoader } from '@react-three/fiber'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader'
import { OrbitControls, TransformControls, useCursor } from '@react-three/drei'

function PointCloud(props) {

    console.log("PointCloud props:", props)

    const pcd = useLoader(PCDLoader, '/large-loop.pcd')
    console.log("PointCloud")
    return (
      <div className="point-cloud-container">
            <Canvas className="point-cloud-canvas">
                <primitive object={pcd} />
                 <OrbitControls makeDefault />
            </Canvas>
      </div>
    );
  }
  export default PointCloud;