import Form from "../components/Form";
import "../styles/Form.css";

function Login() {
  return (
    <div className="auth-page">
      <div className="auth-decoration">
        <span className="icon">📝</span>
      </div>
      <Form route="api/token/" method="login" />
    </div>
  );
}

export default Login;
