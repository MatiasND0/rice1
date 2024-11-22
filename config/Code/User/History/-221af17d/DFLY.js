import { RegisterForm } from "./utils/formularioRegistroUsuario"

export default function AdminUsuarios() {
    return(
        <>
        
        <h1>Usuarios</h1>
                <Button variant="primary" onClick={handleShow}>
                  Registrar usuario
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Agregar</Modal.Title>
                  </Modal.Header>
                  <RegisterForm onClose={handleClose} />
                </Modal>
        </>
    )
}