import React from 'react';

import Card from '../Card'

import { MdAdd } from 'react-icons/md'
import { Container } from './styles'

export default function Header() {
    return(
      <Container>
        <header>
          <h2>Tarefas</h2>
          <button type="button">
            <MdAdd size={24} color="CCE6F4" />
          </button>
        </header>

        <ul>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </ul>
      </Container> 
    );
}