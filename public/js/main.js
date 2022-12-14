const socket = io();

socket.on('connection', (socket) => {
    console.log('usuario conectado');

})
const itemNuevo = (item) => {
    const box = `
    <tr>
        <td>${item.nombre}</td>
        <td>${item.precio}</td>
        <td><img class='imgProducto' src='${item.url}'/> </td>

    </tr> `;


    const container = document.getElementById('tabla')
    container.innerHTML += box

}
socket.on('itemNuevo', (item) => {
    itemNuevo(item)
})

const showItems = async (prod) => {
    return await fetch("../views/pages/vista.ejs")
        .then(respuesta => respuesta.text())
        .then(plantilla => {

            let template = ejs.render(plantilla, { productos: prod });

            const container = document.getElementById('items')
            container.innerHTML += template

        })



}

socket.on('showItems', (items) => {
    showItems(items)
})
const agregarItem = () => {
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const url = document.getElementById('url').value
    console.log("newItem:", { nombre, precio, url })
    socket.emit('nuevoItem', { nombre, precio, url })

}

//////// CHAT /////////
socket.on('new_message', (msg) => {
    agregarMasajes(msg)


});

socket.on('MENSAJES_EXISTENTES', (a)=>{
    a.forEach(element => {
        return agregarMasajes(element)
    });
})


const enviarMensaje = () => {
    const correo = document.getElementById('correo').value;
    const mensaje = document.getElementById('mensaje').value;

    socket.emit('chat_message', { correo, mensaje })
}
const agregarMasajes = (msg) => {
    const box = document.getElementById('post').innerHTML += `
    <div class='card'>
        <b style='color:blue'>${msg.correo}</b> <span style='color:brown'>[${msg.date}]</span> <p style='color:green; font-style: italic' >${msg.mensaje}</p>

    </div>
    
    `


}