import React from 'react';
import { Container, Label } from './styles'

export default function Header() {
    return(
      <Container>
        <header>
          <Label color="#BA324F" />
        </header>
        <p>
          Lorem ipsum dolor sit amet
        </p>
        <img src="https://avatars3.githubusercontent.com/u/8324293?s=60&u=45e4c03f1c470bce90145ddaecfd803ec04c3049&v=4" alt=""/>
      </Container>
    );
}