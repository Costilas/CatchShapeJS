export default class Shape {
    constructor(form, color, size) {
        this.formClassCss = form;
        this.colorClassCss = color;
        this.size = size;
    }

    getForm() {
        return this.formClassCss;
    }

    getColor() {
        return this.colorClassCss;
    }

    getSize() {
        return this.size;
    }
}