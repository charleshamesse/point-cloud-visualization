import React, { Suspense, useState, useRef } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import {
  View,
  OrbitControls,
  PerspectiveCamera,
  TransformControls,
  Environment,
} from '@react-three/drei'
import useRefs from 'react-use-refs'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader'

// <pointsMaterial color="#000000" transparent opacity={0.7} size={0.01} />
function Model(props) {

  console.log(props)
  let geometry = null
  let result = useLoader(PCDLoader, props.src,  xhr => console.log((xhr.loaded / xhr.total * 100) + '% loaded'))
  geometry = result.geometry
  return (
    <TransformControls scale={1} size={2} mode="rotate" position={[0, 0, 0]}>
      <primitive object={result} scale={0.4} />;
    </TransformControls>
  )
}



export default function App(props) {
  const [ref] = useRefs()
    /*
    const [pointClouds, ] = useState([
    {
      name: "Azure Kinect DK",
      object: "/models/improve-ak.pcd",
      scale: 0.001
    },
    {
      name: "Intel Realsense L515",
      object: "/models/improve-rs_l515.pcd",
      scale: 1.0
    },
    {
      name: "Intel Realsense D455 (Active)",
      object: "/models/improve-rs_d455_laser.pcd",
      scale: 1
    },
    {
      name: "Intel Realsense D455 (Passive)",
      object: "/models/improve-rs_d455_nolaser.pcd",
      scale: 1
    },
    {
      name: "Zed Mini",
      object: "/models/improve-zed_mini.pcd",
      scale: .001
    },
    {
      name: "SC-Depth",
      object: "/models/improve-sc_depth.pcd",
      scale: 1.0
    },
    {
      name: "Depth Former",
      object: "/models/improve-depth_former.pcd",
      scale: 1.0
    },
    {
      name: "Bins Former",
      object: "/models/improve-bins_former.pcd",
      scale: 1.0
    },
    {
      name: "TC MonoDepth",
      object: "/models/improve-tc_monodepth.pcd",
      scale: 1.0
    },
  ])
  */
  const [pointClouds, ] = useState([
    {
      name: "From cellars to apartment",
      object: "/models/devil/out_050.pcd",
      scale: 1.0
    },
    {
      name: "From cellars to apartment, filtered",
      object: "/models/devil/out_filtered_050.pcd",
      scale: 1.0
    },
  ])

  let pointCloudRefs = useRef([]);
  pointCloudRefs.current = [0, 0, 0, 0, 0, 0, 0, 0, 0].map(
    (ref, index) =>   pointCloudRefs.current[index] = React.createRef()
  )

  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    backgroundColor: '#fff',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

  return (
    <Box ref={ref} sx={{ flexGrow: 1, mt: 10 }}>
      <Container maxWidth="sm" sx={{py: 5 }}>
        <Typography variant="h3" color="inherit" noWrap>
          Collection: Lab Scene
        </Typography>
      </Container>
      <Grid container>
        {pointClouds.map((pointCloud, index) => {
          return (
            <Grid xs={6} item={true} key={index}>
              <Item>
                <Typography variant="h6" color="inherit" noWrap>
                    {pointCloud.name}
                </Typography>
                
                <div ref={pointCloudRefs.current[index]} className="view scale"  style={{ height: '50vh', width: '100%' }} />

              </Item>
            </Grid>
          )
        })}
      </Grid>

      <Canvas eventSource={ref} className="canvas">
      <Suspense fallback={null}>
{pointClouds.map((pointCloud, index) => {
  return (
    <View track={pointCloudRefs.current[index]}  key={index}>
      <Common color="white" />
      

      <Suspense fallback={null}>
        <Model src={pointCloud.object} scale={pointCloud.scale} />
      </Suspense>
      <OrbitControls makeDefault />
    </View>
  )
})}

  </Suspense>
      </Canvas>
      </Box>
      
  )
}



const Common = ({ color }) => (
  <>
    {color && <color attach="background" args={[color]} />}
    <ambientLight intensity={0.5} />
    <pointLight position={[20, 30, 10]} intensity={1} />
    <pointLight position={[-10, -10, -10]} color="blue" />
    <Environment preset="dawn" />
    <PerspectiveCamera makeDefault fov={40} position={[0, 0, 12]} />
  </>
)

