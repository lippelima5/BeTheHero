import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api'; 

import { Container, Section, Form } from './styles';

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();
  async function handleLogin(e){
    e.preventDefault();
    try {
      const response = await api.post('sessions', { id });
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('profile');

    } catch(err) {
      alert('Erro ao autenticar');
    }
  
  }
  return (
    <Container>
      <Section>

      <img src={logoImg} alt="Be The Hero" />
      <Form onSubmit={handleLogin}>

        <h1>Faça seu Logon</h1>

        <input
         placeholder="Sua ID"
         value={id}
         onChange={e => setId(e.target.value)}
          />
        <button className="button" type="submit">Entrar</button>
        
        <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041"/>
            Não tenho cadastro
        </Link>

      </Form>

      </Section>

      <img src={heroesImg} alt="heroes" />

    </Container>   
  );
}
