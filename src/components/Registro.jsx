import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Registro = ({ setIsLoggedIn, setUserData }) => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [sexo, setSexo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Iniciando proceso de registro");
    const auth = getAuth();
    console.log("Auth obtenido:", auth);

    if (email && password && password === confirmPassword) {
      console.log("Validación de campos exitosa");
      try {
        console.log("Intentando crear usuario con email:", email);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Usuario registrado exitosamente:", userCredential.user);
        setIsLoggedIn(true);
        setUserData({ email, nombres, apellidos, sexo });
        navigate('/quienessomos');
      } catch (error) {
        console.error("Error al registrar usuario:", error);
        alert(`Error al registrar: ${error.message}`);
      }
    } else {
      console.log("Validación de campos fallida");
      alert("Por favor, verifica que todos los campos estén completos y que las contraseñas coincidan.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow border-0 rounded">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Registro</h2>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="nombres" className="form-label">Nombres</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombres"
                      value={nombres}
                      onChange={(e) => setNombres(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                    <input
                      type="text"
                      className="form-control"
                      id="apellidos"
                      value={apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="sexo" className="form-label">Sexo</label>
                  <select
                    className="form-select"
                    id="sexo"
                    value={sexo}
                    onChange={(e) => setSexo(e.target.value)}
                    required
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                    <option value="prefiero_no_decirlo">Prefiero no decirlo</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  />
                </div>
                <div className="mb-3 position-relative">
                  <label htmlFor="password" className="form-label">Clave</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <span 
                    onClick={() => setShowPassword(!showPassword)} 
                    style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '35px' }}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                </div>
                <div className="mb-3 position-relative">
                  <label htmlFor="confirmPassword" className="form-label">Confirmar Clave</label>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <span 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                    style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '35px' }}
                  >
                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                  </span>
                </div>
                <button type="submit" className="btn btn-primary w-100">Registrarse</button>
              </form>
              <p className="text-center mt-3">
                <a href="#" onClick={() => navigate('/login')}>¿Ya tienes una cuenta? Inicia Sesión</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;

