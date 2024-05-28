export class Dado {
    private faces: number;
    private selected: boolean;
    private value!: number;

    constructor(faces: number){
        this.faces = faces;
        this.selected = false;
    }

    throw():number{
        const minCeiled = Math.ceil(1);
        const maxFloored = Math.floor(this.faces);
        this.value = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
        return this.value;
    }
    
    setSelected(selected: boolean):void{
        this.selected = selected;
    }
    isSelected():boolean{
        return this.selected;
    }
    getValue():number{
        return this.value;
    }
    setValue(value: number):void{
       this.value = value;
    }
}
