import { useLoader } from 'react-three-fiber';
import * as THREE from 'three';
import { useBox } from 'use-cannon';

const Box = props => {
    const [ref, api] = useBox(() => ({mass: 1, ...props}))

    const texture = useLoader(
        THREE.TextureLoader,
        process.env.PUBLIC_URL + '/wood.jpg'
    );

    const handlePointerDown = e => {
        e.object.active = true;
        if (window.activeMesh) {
            scaleDown(window.activeMesh)
            window.activeMesh.active = false;
        }
        window.activeMesh = e.object
    }

    const handlePointerEnter = e => {
        const scale = 1.5;
        const duration = 300;
        const start = Date.now();

        const animate = () => {
            const progress = Math.min(1, (Date.now() - start) / duration);
            const currentScale = 1 + (scale - 1) * progress;

            e.object.scale.set(currentScale, currentScale, currentScale);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    const handlePointerLeave = e => {
        if (!e.object.active) {
            const duration = 300;
            const start = Date.now();
            const startScale = e.object.scale.x;

            const animate = () => {
                const progress = Math.min(1, (Date.now() - start) / duration);
                const currentScale = startScale + (1 - startScale) * progress;

                e.object.scale.set(currentScale, currentScale, currentScale);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            animate();
        }
    }

    const scaleDown = object => {
        object.scale.x = 1
        object.scale.y = 1
        object.scale.z = 1
    }

    return (
        <mesh
            ref={ref}
            api={api}
            {...props}
            castShadow
            onPointerDown={handlePointerDown}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
        >
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshPhysicalMaterial
                map={texture}
            />
        </mesh>
    )
}

export default Box;
