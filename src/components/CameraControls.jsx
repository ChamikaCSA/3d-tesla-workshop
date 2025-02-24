import { useFrame } from 'react-three-fiber'
import state from '../state'

const CameraControls = ({ }) => {
    useFrame(({ camera, scene }) => {
        if (state.activeMesh.name !== state.activeMeshName) {
            state.activeMesh = scene.getObjectByName(
                state.activeMeshName
            ) || {}
        }

        if (state.shouldUpdate) {
            const positionEasing = 0.03;
            const rotationEasing = 0.04;

            camera.position.lerp(state.cameraPos, positionEasing);
            scene.orbitControls.target.lerp(state.target, rotationEasing);

            scene.orbitControls.enableDamping = true;
            scene.orbitControls.dampingFactor = 0.03;
            scene.orbitControls.rotateSpeed = 0.7;
            scene.orbitControls.zoomSpeed = 0.8;

            scene.orbitControls.update();

            const diff = camera.position.clone()
                .sub(state.cameraPos).length();
            if (diff < 0.01) {
                state.shouldUpdate = false;
                scene.orbitControls.enableDamping = false;
            }
        }
    })
    return null
}

export default CameraControls
