namespace sh.screen {
    export class DoorsWindow extends Phaser.GameObjects.Container {

        private _DoorR: Phaser.GameObjects.Image;
        private _DoorL: Phaser.GameObjects.Image;
        private _DoorInside: Phaser.GameObjects.Image;

        constructor(scene: Phaser.Scene) {
            super(scene);

            this._DoorR = new Phaser.GameObjects.Image(this.scene, 504.5, 158, 'Door R');
            this._DoorR.setOrigin(0, 0);
            this._DoorL = new Phaser.GameObjects.Image(this.scene, 313.5, 158, 'Door L');
            this._DoorL.setOrigin(0, 0);
            this._DoorInside = new Phaser.GameObjects.Image(this.scene, 313, 158, 'Door Inside');
            this._DoorInside.setOrigin(0, 0);

            this.add(this._DoorInside);
            this.add(this._DoorR);
            this.add(this._DoorL);
        }

        private openDoor(door:Phaser.GameObjects.Image, duration:number, def_vertices_no_offset:number[], vertXIndexes:number[], vertYIndexes:number[], vertYSign:number[], tweenDoorValueY:number):void {
            door.visible = false;

            let dx:number = 100, dy:number = 198;
            let def_vertices:number[] = def_vertices_no_offset.slice();
            for (let i:number = 0; i < def_vertices_no_offset.length; i+=2) {
                def_vertices[i] += dx;
            }
            for (let i:number = 1; i < def_vertices_no_offset.length; i+=2) {
                def_vertices[i] += dy;
            }
            let mesh:Phaser.GameObjects.Mesh = this.scene.make.mesh({
                key: door.texture.key,
                x: door.x,
                y: door.y,
                vertices: def_vertices.slice(),
                uv: [
                    /*  U   |   V  */
                    /* ----------- */
                    0,      0,
                    0,      1,
                    1,      1,

                    0,      0,
                    1,      1,
                    1,      0
                ]
            });
            mesh["def_vertices"] = def_vertices;
            door["tweenDoorValueX"] = mesh["def_vertices"][vertXIndexes[0]];
            door["tweenDoorValueY"] = 0;
            this.scene.tweens.add({
                targets: door,
                tweenDoorValueX: -def_vertices_no_offset[vertXIndexes[0]] + dx,
                tweenDoorValueY: tweenDoorValueY,
                duration: duration,
                ease: Phaser.Math.Easing.Linear,
                onUpdate:()=>{
                    for (let k:number = 0; k < vertYIndexes.length; k++) {
                        mesh.vertices[vertYIndexes[k]] = mesh["def_vertices"][vertYIndexes[k]] + vertYSign[k] * door["tweenDoorValueY"];
                    }
                    for (let i of vertXIndexes) {
                        mesh.vertices[i] = door["tweenDoorValueX"];
                    }
                }
            });
        }

        public open(onComplete:()=>void):void {
            let duration:number = 2000;
            let tweenDoorValueY:number = 50;
            this.openDoor(this._DoorR, duration, [
                /*  X   |   Y  */
                /* ----------- */
                -this._DoorR.width/2, -this._DoorR.height/2,
                -this._DoorR.width/2, this._DoorR.height/2,
                this._DoorR.width/2, this._DoorR.height/2,
                -this._DoorR.width/2, -this._DoorR.height/2,
                this._DoorR.width/2, this._DoorR.height/2,
                this._DoorR.width/2, -this._DoorR.height/2
            ], [0, 2, 6], [1, 3, 7], [-1, 1, -1], tweenDoorValueY);
            this.openDoor(this._DoorL, duration, [
                /*  X   |   Y  */
                /* ----------- */
                -this._DoorL.width/2, -this._DoorL.height/2,
                -this._DoorL.width/2, this._DoorL.height/2,
                this._DoorL.width/2, this._DoorL.height/2,
                -this._DoorL.width/2, -this._DoorL.height/2,
                this._DoorL.width/2, this._DoorL.height/2,
                this._DoorL.width/2, -this._DoorL.height/2
            ], [4, 8, 10], [5, 9, 11], [-1, -1, 1], -tweenDoorValueY);
            setTimeout(onComplete, duration);
        }
    }
}