// src/components/lab/sceneObjects/StaticLabMeshes.jsx

/**
 * Renders mostly static lab environment meshes.
 *
 * These do not have interactive workflow logic.
 * The collider is included here because it is part of the static scene,
 * but it receives a ref so collision logic can use it.
 */
export function StaticLabMeshes({ nodes, colliderRef }) {
  return (
    <>
      <mesh
        name="Beaker_glass2"
        geometry={nodes.Beaker_glass2.geometry}
        material={nodes.Beaker_glass2.material}
        position={[28.644, 2.459, 4.191]}
        rotation={[0, -1.571, 0]}
      />

      <mesh
        name="divider_glass"
        geometry={nodes.divider_glass.geometry}
        material={nodes.divider_glass.material}
        position={[26.059, 0.186, 8.39]}
      />

      <mesh
        name="Conical_flask_glass1"
        geometry={nodes.Conical_flask_glass1.geometry}
        material={nodes.Conical_flask_glass1.material}
        position={[26.811, 0.519, 3.47]}
        rotation={[Math.PI / 2, 0, -0.706]}
      />

      <mesh
        name="bottle_glass1"
        geometry={nodes.bottle_glass1.geometry}
        material={nodes.bottle_glass1.material}
        position={[28.082, 0.66, 15.942]}
        rotation={[-3.13, 0.283, -3.138]}
      />

      <mesh
        name="bottle_glass2"
        geometry={nodes.bottle_glass2.geometry}
        material={nodes.bottle_glass2.material}
        position={[28.082, 0.66, 16.361]}
        rotation={[-3.13, 0.283, -3.138]}
      />

      <mesh
        name="bottle_glass3"
        geometry={nodes.bottle_glass3.geometry}
        material={nodes.bottle_glass3.material}
        position={[28.082, 0.66, 16.774]}
        rotation={[-3.13, 0.283, -3.138]}
      />

      <mesh
        name="bottle_glass4"
        geometry={nodes.bottle_glass4.geometry}
        material={nodes.bottle_glass4.material}
        position={[28.082, 0.66, 17.192]}
        rotation={[-3.13, 0.283, -3.138]}
      />

      <mesh
        name="smallBeaker_glass"
        geometry={nodes.smallBeaker_glass.geometry}
        material={nodes.smallBeaker_glass.material}
        position={[20.332, 2.481, 24.656]}
        rotation={[Math.PI / 2, 0, -3.09]}
      />

      <mesh
        name="Beaker_glass1"
        geometry={nodes.Beaker_glass1.geometry}
        material={nodes.Beaker_glass1.material}
        position={[20.788, 2.596, 24.659]}
        rotation={[Math.PI / 2, 0, -3.09]}
      />

      <mesh
        name="holder_glass"
        geometry={nodes.holder_glass.geometry}
        material={nodes.holder_glass.material}
        position={[29.743, 2.486, 5.307]}
        rotation={[0, 0, -Math.PI / 2]}
      />

      <mesh
        name="door1_one"
        geometry={nodes.door1_one.geometry}
        material={nodes.door1_one.material}
        position={[18.142, 1.676, -3.894]}
      />

      <mesh
        name="door2_one"
        geometry={nodes.door2_one.geometry}
        material={nodes.door2_one.material}
        position={[18.142, 1.676, -3.894]}
      />

      <mesh
        name="one"
        geometry={nodes.one.geometry}
        material={nodes.one.material}
        position={[17.5, 0.065, 14.286]}
      />

      <mesh
        name="two"
        geometry={nodes.two.geometry}
        material={nodes.two.material}
        position={[29.045, 1.125, 23.635]}
      />

      <mesh
        name="three"
        geometry={nodes.three.geometry}
        material={nodes.three.material}
        position={[29.022, 3.396, 16.043]}
        rotation={[-Math.PI, 0.14, -Math.PI]}
      />

      <mesh
        name="four"
        geometry={nodes.four.geometry}
        material={nodes.four.material}
        position={[26.451, 0.657, 3.303]}
        rotation={[0, 0.706, 0]}
      />

      <mesh
        ref={colliderRef}
        name="collider"
        geometry={nodes.collider.geometry}
        material={nodes.collider.material}
        position={[9.768, 1.465, 6.671]}
      />
    </>
  );
}
