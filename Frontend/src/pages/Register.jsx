import Form from "../components/Form";
import "../styles/Form.css";

function Register() {
  return (
    <div className="auth-page">
      <div className="auth-decoration">
        <span className="icon">✍️</span>
      </div>
      <Form route="api/user/register/" method="register" />
    </div>
  );
}

export default Register;
