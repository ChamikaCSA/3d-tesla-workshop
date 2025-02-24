import { useLoader, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { useMemo, useState } from 'react';

const Background = () => {
    const [error, setError] = useState(false);

    const texture = useLoader(
        THREE.TextureLoader,
        process.env.PUBLIC_URL + '/modern-background-gray.jpeg',
        undefined,
        (error) => {
            console.error('Error loading background texture:', error);
            setError(true);
        }
    );

    const { gl } = useThree();
    const formatted = useMemo(() => {
        if (error) return null;

        const renderTarget = new THREE.WebGLCubeRenderTarget(
            texture.image.height,
            {
                generateMipmaps: true,
                minFilter: THREE.LinearMipmapLinearFilter,
                encoding: THREE.sRGBEncoding
            }
        );

        return renderTarget.fromEquirectangularTexture(gl, texture);
    }, [gl, texture, error]);

    if (error) {
        return null;
    }

    return (
        <primitive
            attach='background'
            object={formatted}
        />
    )
}

export default Background;
