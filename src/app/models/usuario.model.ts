
export class UsuarioModel {

    static fromFirebase(fbUserString: string) {
        const { mail, uid, nombre } = JSON.parse(fbUserString);
        return new UsuarioModel(uid, nombre, mail)
    }
    constructor(
        public uid: string,
        public nombre: string,
        public mail: string
    ) { }
}