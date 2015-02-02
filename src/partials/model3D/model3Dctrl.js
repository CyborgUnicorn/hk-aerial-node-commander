angular.module('hk-aerial-commander').controller('Model3DCtrl', function ($scope) {
  var model = {
    "metadata": {
      "version": 4.3,
      "type": "Object",
      "generator": "ObjectExporter"
    },
    "geometries": [
      {
        "uuid": "487A0005-537B-4963-8E11-387F3FF8EC5C",
        "type": "CylinderGeometry",
        "radiusTop": 21,
        "radiusBottom": 21,
        "height": 10,
        "radialSegments": 16,
        "heightSegments": 1,
        "openEnded": true
      },
      {
        "uuid": "DC7AC4E1-882F-4724-978B-B99A69722DE6",
        "type": "CylinderGeometry",
        "radiusTop": 19,
        "radiusBottom": 19,
        "height": 1,
        "radialSegments": 16,
        "heightSegments": 1,
        "openEnded": false
      },
      {
        "uuid": "A4B5D750-7AFE-4550-8336-9BAD9AC7C3B5",
        "type": "CylinderGeometry",
        "radiusTop": 5,
        "radiusBottom": 5,
        "height": 50,
        "radialSegments": 8,
        "heightSegments": 1,
        "openEnded": false
      },
      {
        "uuid": "9B7A7B6E-4A92-414B-B3A8-A36BF6F9238C",
        "type": "CylinderGeometry",
        "radiusTop": 21,
        "radiusBottom": 21,
        "height": 30,
        "radialSegments": 16,
        "heightSegments": 1,
        "openEnded": true
      },
      {
        "uuid": "B92FF05D-2921-4F0C-AA3F-EE6D2FB990CD",
        "type": "CylinderGeometry",
        "radiusTop": 19,
        "radiusBottom": 19,
        "height": 1,
        "radialSegments": 16,
        "heightSegments": 1,
        "openEnded": false
      },
      {
        "uuid": "3A9D9641-478F-4F29-A700-80D086AF74D6",
        "type": "CylinderGeometry",
        "radiusTop": 21,
        "radiusBottom": 21,
        "height": 30,
        "radialSegments": 16,
        "heightSegments": 1,
        "openEnded": true
      },
      {
        "uuid": "B9CD5291-F4AF-48E3-87A8-0A47BBB291E9",
        "type": "CylinderGeometry",
        "radiusTop": 19,
        "radiusBottom": 19,
        "height": 1,
        "radialSegments": 16,
        "heightSegments": 1,
        "openEnded": false
      },
      {
        "uuid": "B83F0BDD-4C69-44AA-9DA4-D367A03AE115",
        "type": "BoxGeometry",
        "width": 75,
        "height": 5,
        "depth": 5,
        "widthSegments": 1,
        "heightSegments": 1,
        "depthSegments": 1
      },
      {
        "uuid": "1A5A90DB-35EF-4E27-B2C3-6E1A7C003999",
        "type": "BoxGeometry",
        "width": 5,
        "height": 5,
        "depth": 75,
        "widthSegments": 1,
        "heightSegments": 1,
        "depthSegments": 1
      },
      {
        "uuid": "46756C6B-8878-4E8E-A97C-EB2175BBD882",
        "type": "BoxGeometry",
        "width": 4,
        "height": 4,
        "depth": 85,
        "widthSegments": 1,
        "heightSegments": 1,
        "depthSegments": 1
      }],
    "materials": [
      {
        "uuid": "C8068296-BAD7-4ED9-8787-00990185F8AD",
        "type": "MeshBasicMaterial",
        "color": 16777215,
        "side": 2
      },
      {
        "uuid": "36DF43B5-10BE-4891-88BD-61AEB1D6A2A9",
        "type": "MeshBasicMaterial",
        "color": 0,
        "opacity": 0.36,
        "transparent": true
      },
      {
        "uuid": "B32AEC9A-E2BD-4882-A3A3-C7472131E2A3",
        "type": "MeshBasicMaterial",
        "color": 9966090
      },
      {
        "uuid": "0EBB150F-BD80-4E8F-9022-2A10642220BB",
        "type": "MeshBasicMaterial",
        "color": 16777215,
        "side": 2
      },
      {
        "uuid": "A547DE22-55FD-48EA-8E9C-C88F2E7A2400",
        "type": "MeshBasicMaterial",
        "color": 16777215,
        "side": 2
      },
      {
        "uuid": "9CBD2800-51EF-49FB-B6F8-AC55C9E95169",
        "type": "MeshBasicMaterial",
        "color": 16777215
      }],
    "object": {
      "uuid": "144F58BA-7B05-45E8-870B-F4502E64E39F",
      "type": "Group",
      "name": "Drone",
      "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
      "children": [
        {
          "uuid": "B6EB0AB3-AF9C-472B-8A04-ACF3C59C6927",
          "type": "Mesh",
          "name": "Front Engine",
          "geometry": "487A0005-537B-4963-8E11-387F3FF8EC5C",
          "material": "C8068296-BAD7-4ED9-8787-00990185F8AD",
          "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,100,1],
          "children": [
            {
              "uuid": "ADD95C8A-B389-42D1-86A2-26EE9564678C",
              "type": "Mesh",
              "name": "Propeller ambient",
              "geometry": "DC7AC4E1-882F-4724-978B-B99A69722DE6",
              "material": "36DF43B5-10BE-4891-88BD-61AEB1D6A2A9",
              "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
            },
            {
              "uuid": "83392D0A-BEE9-4F21-8E95-407AD643B001",
              "type": "Mesh",
              "name": "power",
              "geometry": "A4B5D750-7AFE-4550-8336-9BAD9AC7C3B5",
              "material": "B32AEC9A-E2BD-4882-A3A3-C7472131E2A3",
              "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
            }]
        },
        {
          "uuid": "71F9A04B-C242-4C12-ABE2-97704A3ACFAC",
          "type": "Mesh",
          "name": "Left Engine",
          "geometry": "9B7A7B6E-4A92-414B-B3A8-A36BF6F9238C",
          "material": "0EBB150F-BD80-4E8F-9022-2A10642220BB",
          "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-60,0,0,1],
          "children": [
            {
              "uuid": "8FB8415D-1E40-4BBB-8A52-DD49F063FE62",
              "type": "Mesh",
              "name": "Propeller ambient",
              "geometry": "B92FF05D-2921-4F0C-AA3F-EE6D2FB990CD",
              "material": "36DF43B5-10BE-4891-88BD-61AEB1D6A2A9",
              "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
            },
            {
              "uuid": "768A9EA3-4901-4E02-9D74-DD68423AF780",
              "type": "Mesh",
              "name": "power",
              "geometry": "A4B5D750-7AFE-4550-8336-9BAD9AC7C3B5",
              "material": "B32AEC9A-E2BD-4882-A3A3-C7472131E2A3",
              "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
            }]
        },
        {
          "uuid": "1383BC96-AA8E-4D3F-8CA7-BBB2405C5A7A",
          "type": "Mesh",
          "name": "Right Engine",
          "geometry": "3A9D9641-478F-4F29-A700-80D086AF74D6",
          "material": "A547DE22-55FD-48EA-8E9C-C88F2E7A2400",
          "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,60,0,0,1],
          "children": [
            {
              "uuid": "499C22F3-A9A8-4030-B8A6-2499B08BFA1F",
              "type": "Mesh",
              "name": "Propeller ambient",
              "geometry": "B9CD5291-F4AF-48E3-87A8-0A47BBB291E9",
              "material": "36DF43B5-10BE-4891-88BD-61AEB1D6A2A9",
              "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
            },
            {
              "uuid": "B21C2EF7-28EF-4C01-8D96-ACA0C8BA75F5",
              "type": "Mesh",
              "name": "power",
              "geometry": "A4B5D750-7AFE-4550-8336-9BAD9AC7C3B5",
              "material": "B32AEC9A-E2BD-4882-A3A3-C7472131E2A3",
              "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
            }]
        },
        {
          "uuid": "693C03C7-7B0C-4480-A4BD-212E6E161D9E",
          "type": "Mesh",
          "name": "Horizontal axel",
          "geometry": "B83F0BDD-4C69-44AA-9DA4-D367A03AE115",
          "material": "9CBD2800-51EF-49FB-B6F8-AC55C9E95169",
          "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
        },
        {
          "uuid": "365EDDB4-9D10-4421-B796-11C265FDC82A",
          "type": "Mesh",
          "name": "Vertical axel",
          "geometry": "1A5A90DB-35EF-4E27-B2C3-6E1A7C003999",
          "material": "9CBD2800-51EF-49FB-B6F8-AC55C9E95169",
          "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,40,1]
        },
        {
          "uuid": "CB7E035E-0D5C-4B58-AC88-A232AAC3D064",
          "type": "Mesh",
          "name": "Left support",
          "geometry": "46756C6B-8878-4E8E-A97C-EB2175BBD882",
          "material": "9CBD2800-51EF-49FB-B6F8-AC55C9E95169",
          "matrix": [0.9004471302032471,0,0.4349655210971832,0,0,1,0,0,-0.4349655210971832,0,0.9004471302032471,0,18.567541122436523,0,38.96883773803711,1]
        }]
    }
  };
  var loader = new THREE.ObjectLoader();
  var copter = loader.parse(model);
  var front = copter.children[0];
  var left = copter.children[1];
  var right = copter.children[2];

  var w = 300,
    h = 300,
    viewAngle = 45,
    aspect = w/h,
    near = 0.1,
    far = 10000,
    renderer = new THREE.WebGLRenderer(),
    camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far),
    scene = new THREE.Scene();

  scene.add(copter);
  scene.add(camera);
  camera.position.z = 300;
  renderer.setSize(w, h);

  $scope.copter = copter;

  document.getElementById('scene').appendChild(renderer.domElement);

  
  window.copter = copter;
  window.scene = scene;
  window.camera = camera;
  window.renderer = renderer;
  window.render = renderer.render.bind(renderer, scene, camera);

  function setMotors() {
    setSpeed(front, $scope.motors.front);
    setSpeed(left, $scope.motors.left);
    setSpeed(right, $scope.motors.right);
  }

  function setSpeed(motor, speed) {
    var bar = motor.children[1];
    var r = Math.min(2*speed, 1);
    var g = Math.min(Math.max(2-2*speed, 0), 1);

    bar.material.color.setRGB(r, g, 0.2);

    bar.scale.y = speed;

    console.log('update', speed, r, g, (speed * 100));

    render();
  }

  function render() {
    renderer.render(scene, camera, null, true);
  }

  $scope.motors = {front: 0, left: 0, right: 0};
  $scope.$watch('motors', setMotors, true);

  render();
});