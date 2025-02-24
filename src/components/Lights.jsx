import Bulb from './Bulb'

const Lights = () => {
    return (
        <>
            <ambientLight intensity={0.2} />
            <directionalLight
                shadow-mapSize-height={2**11}
                shadow-mapSize-width={2**11}
                shadow-radius={8}
                intensity={0.6}
                position={[6,5,0]}
                castShadow
            />
            <Bulb position={[-6,4,0]} intensity={0.6} />
            <Bulb position={[0,4,0]} intensity={0.6} />
            <Bulb position={[6,4,0]} intensity={0.6} />
        </>
    )
}

export default Lights
