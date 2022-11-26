import React from 'react';
import { screen, render } from '@testing-library/react';
import { About } from '../pages';

describe('Testes do componente <About.js />', () => {
  it('testa se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);

    const aboutHeading = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(aboutHeading).toBeInTheDocument();
  });

  it('testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);

    const firstParagraph = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');
    expect(secondParagraph).toBeInTheDocument();
  });

  it('testa se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    render(<About />);

    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const pokedexImage = screen.getByRole('img', { name: /pokédex/i });
    expect(pokedexImage).toHaveAttribute('src', URL);
    expect(pokedexImage).toBeInTheDocument();
  });
});
