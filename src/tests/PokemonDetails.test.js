import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Testes do componente <PokemonDetails.js />', () => {
  it('testa se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);

    pokemonList.forEach((pokemon) => {
      const { summary, foundAt, name, id } = pokemon;

      const HREF = `/pokemon/${id}`;

      const moreDetails = screen.getByRole('link', { name: 'More details' });
      expect(moreDetails).toHaveAttribute('href', HREF);
      userEvent.click(moreDetails);

      const { location: { pathname } } = history;
      expect(pathname).toBe(HREF);

      const detailsHeading = screen.getByRole('heading', { name: `${name} Details`, level: 2 });
      expect(detailsHeading).toBeInTheDocument();

      const summaryHeading = screen.getByRole('heading', { name: 'Summary', level: 2 });
      expect(summaryHeading).toBeInTheDocument();

      const summaryText = screen.getByText(summary);
      expect(summaryText).toBeInTheDocument();

      const locationHeading = screen.getByRole('heading', { name: `Game Locations of ${name}`, level: 2 });
      expect(locationHeading).toBeInTheDocument();

      const locationImages = screen.getAllByRole('img', { name: `${name} location` });

      for (let index = 0; index < foundAt.length; index += 1) {
        const { location, map } = foundAt[index];
        expect(locationImages[index]).toHaveAttribute('src', `${map}`);
        expect(locationImages[index]).toBeInTheDocument();

        const locationText = screen.getByText(location);
        expect(locationText).toBeInTheDocument();
      }

      const favoriteCheck = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
      expect(favoriteCheck).toBeInTheDocument();

      const homeLink = screen.getByRole('link', { name: 'Home' });
      userEvent.click(homeLink);

      const nextButton = screen.getByRole('button', { name: 'Próximo Pokémon' });
      const numberOfClicks = pokemonList.indexOf(pokemon) + 1;

      for (let index = 0; index < numberOfClicks; index += 1) {
        userEvent.click(nextButton);
      }
    });

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
});
