import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../store/useApp';
import { registerUser } from '../../services/auth';
import TopBar from '../../components/layout/TopBar/TopBar';
import SegmentedControl from '../../components/SegmentedControl/SegmentedControl';
import Input, { Checkbox } from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import styles from './Auth.module.css';

export default function Signup() {
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const headingRef = useRef(null);

  const [role, setRole] = useState('cliente');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const isShop = role === 'barbearia';

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const result = registerUser({ role, name, email, phone, password, acceptedTerms });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    dispatch({ type: 'LOGIN', payload: result.user });
    dispatch({ type: 'SHOW_TOAST', payload: `Conta criada! Bem-vindo, ${result.user.name}` });
    navigate(result.user.role === 'barbearia' ? '/painel' : '/', { replace: true });
  }

  return (
    <div className={styles.page}>
      <TopBar title="Cadastro" onBack={() => navigate(-1)} />

      <div className={styles.container}>
        <header className={styles.header}>
          <h1 ref={headingRef} tabIndex={-1} className={styles.title}>
            CRIAR <span className={styles.accent}>CONTA</span>
          </h1>
          <p className={styles.subtitle}>
            {isShop ? 'Cadastre sua barbearia em Vitória, ES' : 'Crie seu perfil para agendar horários'}
          </p>
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
              id="sig-name"
              label={isShop ? 'Nome da barbearia' : 'Nome completo'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isShop ? 'Ex.: The Barber' : 'Ex.: João Silva'}
            />
            <Input
              id="sig-email"
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
            <Input
              id="sig-phone"
              label="Telefone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(27) 99999-9999"
            />

            <div className={styles.pwdRow}>
              <Input
                id="sig-pwd"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo de 6 caracteres"
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

            <Checkbox
              id="sig-terms"
              label="Li e aceito os Termos de Uso e Política de Privacidade"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />

            {error && <p className={styles.error} role="alert">{error}</p>}

            <Button type="submit" variant="primary">Cadastrar</Button>
          </form>
        </section>

        <footer className={styles.footer}>
          Já possui conta?{' '}
          <Link to="/entrar" className={styles.link}>Entrar</Link>
        </footer>
      </div>
    </div>
  );
}
