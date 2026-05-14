// src/components/lab/sceneObjects/CharacterAvatar.jsx

/**
 * Renders the animated character/avatar inside the lab.
 *
 * The characterGroup ref is used by:
 * - player movement
 * - animation system
 * - collision/camera controller
 */
export function CharacterAvatar({ nodes, characterGroup }) {
  return (
    <group
      name="Armature"
      position={[18.077, 0.251, 0]}
      ref={characterGroup}
      scale={1.7}
    >
      <primitive object={nodes.Hips} />

      <skinnedMesh
        name="Wolf3D_Body"
        geometry={nodes.Wolf3D_Body.geometry}
        material={nodes.Wolf3D_Body.material}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />

      <skinnedMesh
        name="Wolf3D_Hair"
        geometry={nodes.Wolf3D_Hair.geometry}
        material={nodes.Wolf3D_Hair.material}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />

      <skinnedMesh
        name="Wolf3D_Outfit_Bottom"
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={nodes.Wolf3D_Outfit_Bottom.material}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />

      <skinnedMesh
        name="Wolf3D_Outfit_Footwear"
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={nodes.Wolf3D_Outfit_Footwear.material}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />

      <skinnedMesh
        name="Wolf3D_Outfit_Top"
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={nodes.Wolf3D_Outfit_Top.material}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />

      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={nodes.Wolf3D_Head.material}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
    </group>
  );
}
