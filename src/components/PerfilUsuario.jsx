import React from 'react';

const PerfilUsuario = ({ userData }) => {
  if (!userData) {
    return <div className="container mt-5">No hay información de usuario disponible.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h3 className="text-center mb-0">Perfil del Usuario</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-4 text-center mb-3">
                  <img
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${userData.nombres} ${userData.apellidos}`}
                    alt="Avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: '150px', height: '150px' }}
                  />
                </div>
                <div className="col-sm-8 d-flex flex-column justify-content-center">
                  <h4 className="text-left mb-3">{userData.nombres} {userData.apellidos}</h4>
                  <p className="text-left mb-2"><strong>Correo electrónico:</strong> {userData.email}</p>
                  <p className="text-left mb-0"><strong>Sexo:</strong> {userData.sexo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
