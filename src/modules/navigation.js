export class Document {
    constructor({ title, slug, icon, content }) {
        this.title = title;
        this.slug = slug;
        this.icon = icon;
        this.content = content;
    }

    get path() {
        return `/${this.slug}`;
    }
}
