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
      <primitive object={result} />
    </TransformControls>
  )
}



export default function App(props) {
  const [ref] = useRefs()
  const [pointClouds, ] = useState([
    {
      name: "Downsampled with voxel size 20cm (15.6MB)",
      object: "/models/fl/run-2_fast-lio_map_down-5.pcd",
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
          Fabriek Logistiek Hall 2
        </Typography>
      </Container>
      <Grid container>
        {pointClouds.map((pointCloud, index) => {
          return (
            <Grid xs={12} item={true} key={index}>
              <Item>
                <Typography variant="h6" color="inherit" noWrap>
                    {pointCloud.name}
                </Typography>
                
                <div ref={pointCloudRefs.current[index]} className="view scale"  style={{ height: '80vh', width: '100%' }} />

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
    <PerspectiveCamera makeDefault fov={40} position={[0, 0, 12]} />
  </>
)

