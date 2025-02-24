import { useBox } from 'use-cannon';
import { useLoader } from 'react-three-fiber';
import * as THREE from 'three';

const Floor = props => {
    const [ref, api] = useBox(() => ({
        args: [20, 1, 10],
        mass: 0,
        ...props
    }));

    const texture = useLoader(
        THREE.TextureLoader,
        process.env.PUBLIC_URL + '/floor.jpg'
    );

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(20, 20);

    return (
        <mesh ref={ref} {...props} receiveShadow>
            <boxBufferGeometry args={[200, 1, 200]} />
            <meshPhysicalMaterial
                map={texture}
                color={'#444444'}
                metalness={0.1}
                roughness={0.8}
                clearcoat={0.1}
                reflectivity={0.5}
                opacity={1}
            />
        </mesh>
    )
}

export default Floor;
