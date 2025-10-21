import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

@Component({
  standalone: true,
  imports: [],
  selector: 'THREE-root',
  templateUrl: './THREE.component.html',
  styleUrl: './THREE.component.scss',
  providers: [
    {
      provide: Window,
      useValue: window,
    },
  ],
})
export class THREEComponent implements OnInit, AfterViewInit {
  @Input() public boxSize: { width: number; height: number };
  @Input() public modelSource: string =
    'https://firebasestorage.googleapis.com/v0/b/gorsium-app.firebasestorage.app/o/csabi-ekszer%2Fskeleton.gltf?alt=media';
  @ViewChild('canvas') canvas: ElementRef;
  constructor() {}

  public loader = new GLTFLoader();
  public scene = new THREE.Scene();
  public camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);

  public renderer: THREE.WebGLRenderer;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const canvas = this.canvas.nativeElement;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    this.renderer.setSize(width, height, false);

    const fov = 20;
    const aspect = width / height;
    const near = 0.1;
    const far = 100;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(0, 10, 20);

    const controls = new OrbitControls(this.camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(10, 10, 10);

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(255, 5, 5);

    const gltfLoader = new GLTFLoader();

    gltfLoader.load(this.modelSource, (gltf) => {
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = new THREE.Vector3();
      box.getCenter(center);

      gltf.scene.position.sub(center);
      const size = new THREE.Vector3();
      box.getSize(size);
      //gltf.scene.position.y += size.y / 1.5;
      gltf.scene.position.set(0, 5, 1);
      this.scene.remove(...this.scene.children);
      this.scene.add(gltf.scene);
      this.scene.add(light);
      this.scene.add(ambient);
    });

    requestAnimationFrame(() => this.render());
  }

  public resizeRendererToDisplaySize(_renderer: any) {
    const canvas = _renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      _renderer.setSize(width, height, false);
    }

    return needResize;
  }

  public render() {
    if (this.resizeRendererToDisplaySize(this.renderer)) {
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());
  }
}
