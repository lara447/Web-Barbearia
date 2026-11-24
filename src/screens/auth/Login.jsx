import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../store/useApp';
import { authenticateUser } from '../../services/auth';
import SegmentedControl from '../../components/SegmentedControl/SegmentedControl';
import Input, { Checkbox } from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import styles from './Auth.module.css';

export default function Login() {
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const headingRef = useRef(null);

  const [role, setRole] = useState('cliente');
  const [identifier, setIdentifier] = useState('lucas.martins@email.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const result = authenticateUser({ identifier, password, role, rememberMe });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    dispatch({ type: 'LOGIN', payload: result.user });
    dispatch({ type: 'SHOW_TOAST', payload: `Bem-vindo, ${result.user.name}!` });
    navigate(result.user.role === 'barbearia' ? '/painel' : '/', { replace: true });
  }

  function handleGoogle() {
    const user = {
      name: role === 'barbearia' ? 'The Barber' : 'Lucas Martins',
      role,
    };
    dispatch({ type: 'LOGIN', payload: user });
    dispatch({ type: 'SHOW_TOAST', payload: `Bem-vindo, ${user.name}!` });
    navigate(role === 'barbearia' ? '/painel' : '/', { replace: true });
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logoBox}>
            <Icon name="scissors" size={28} />
          </div>
          <h1 ref={headingRef} tabIndex={-1} className={styles.title}>
            BARBER <span className={styles.accent}>FIND</span>
          </h1>
          <p className={styles.subtitle}>Entre na sua conta para agendar ou gerenciar</p>
        </header>

        <section className={styles.card}>
          <SegmentedControl
            value={role}
            onChange={setRole}
            options={[
              { value: 'cliente', label: 'Cliente' },
              { value: 'barbearia', label: 'Barbearia' },
            ]}
          />

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <Input
              id="login-id"
              label="E-mail ou telefone"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="seu@email.com ou (27) 99999-9999"
            />

            <div className={styles.pwdRow}>
              <Input
                id="login-pwd"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                <Icon name={showPassword ? 'eyeOff' : 'eye'} size={18} />
              </button>
            </div>

            <div className={styles.optionsRow}>
              <Checkbox
                id="login-remember"
                label="Lembrar-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <button
                type="button"
                className={styles.linkBtn}
                onClick={() => dispatch({ type: 'SHOW_TOAST', payload: 'Instruções enviadas ao seu e-mail' })}
              >
                Esqueceu a senha?
              </button>
            </div>

            {error && <p className={styles.error} role="alert">{error}</p>}

            <Button type="submit" variant="primary">Entrar</Button>
            <Button type="button" variant="line" onClick={handleGoogle}>
              Entrar com Google
            </Button>
          </form>
        </section>

        <footer className={styles.footer}>
          Ainda não tem conta?{' '}
          <Link to="/cadastro" className={styles.link}>Cadastre-se</Link>
        </footer>
      </div>
    </div>
  );
}
