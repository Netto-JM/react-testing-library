import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Testes do componente <Pokemon.js />', () => {
  it('testa se é renderizado um card com as informações de determinado Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    pokemonList.forEach((pokemon) => {
      const { averageWeight, id, image, name, type } = pokemon;
      const { measurementUnit, value } = averageWeight;

      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(name);
      expect(pokemonName).toBeInTheDocument();

      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toHaveTextContent(`${type}`);
      expect(pokemonType).toBeInTheDocument();

      const pkmWeight = screen.getByTestId('pokemon-weight');
      expect(pkmWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
      expect(pkmWeight).toBeInTheDocument();

      const pokemonImage = screen.getByRole('img', { name: `${name} sprite` });
      expect(pokemonImage).toHaveAttribute('src', `${image}`);
      expect(pokemonImage).toBeInTheDocument();

      const moreDetails = screen.getByRole('link', { name: 'More details' });
      expect(moreDetails).toHaveAttribute('href', `/pokemon/${id}`);
      expect(moreDetails).toBeInTheDocument();

      const nextButton = screen.getByRole('button', { name: 'Próximo Pokémon' });
      userEvent.click(nextButton);
    });

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('testa se é possível favoritar um Pokémon corretamente', () => {
    const { history } = renderWithRouter(<App />);

    const { id, name } = pokemonList[0];
    const HREF = `/pokemon/${id}`;

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toHaveAttribute('href', HREF);
    userEvent.click(moreDetails);

    const { location: { pathname } } = history;
    expect(pathname).toBe(HREF);

    const favoriteCheck = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favoriteCheck);
    userEvent.click(favoriteCheck);
    userEvent.click(favoriteCheck);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);

    const starImage = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(starImage).toHaveAttribute('src', '/star-icon.svg');
    expect(starImage).toBeInTheDocument();
  });
});
