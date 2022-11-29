import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente <Pokedex.js />', () => {
  it('testa se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const aboutHeading = screen.getByRole('heading', { name: 'Encountered Pokémon', level: 2 });
    expect(aboutHeading).toBeInTheDocument();
  });

  it('testa se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado, sem exibir os anteriores', () => {
    renderWithRouter(<App />);

    const pikachu = screen.queryByText('Pikachu');
    expect(pikachu).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: 'Próximo Pokémon' });
    expect(nextButton).toBeInTheDocument();

    userEvent.click(nextButton);
    const charmander = screen.queryByText('Charmander');
    expect(charmander).toBeInTheDocument();
    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();

    userEvent.click(nextButton);
    const caterpie = screen.queryByText('Caterpie');
    expect(caterpie).toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();

    userEvent.click(nextButton);
    const ekans = screen.queryByText('Ekans');
    expect(ekans).toBeInTheDocument();
    expect(screen.queryByText('Caterpie')).not.toBeInTheDocument();

    userEvent.click(nextButton);
    const alakazam = screen.queryByText('Alakazam');
    expect(alakazam).toBeInTheDocument();
    expect(screen.queryByText('Ekans')).not.toBeInTheDocument();

    userEvent.click(nextButton);
    const mew = screen.queryByText('Mew');
    expect(mew).toBeInTheDocument();
    expect(screen.queryByText('Alakazam')).not.toBeInTheDocument();

    userEvent.click(nextButton);
    const rapidash = screen.queryByText('Rapidash');
    expect(rapidash).toBeInTheDocument();
    expect(screen.queryByText('Mew')).not.toBeInTheDocument();

    userEvent.click(nextButton);
    const snorlax = screen.queryByText('Snorlax');
    expect(snorlax).toBeInTheDocument();
    expect(screen.queryByText('Rapidash')).not.toBeInTheDocument();

    userEvent.click(nextButton);
    const dragonair = screen.queryByText('Dragonair');
    expect(dragonair).toBeInTheDocument();
    expect(screen.queryByText('Snorlax')).not.toBeInTheDocument();

    userEvent.click(nextButton);
    expect(screen.queryByText('Pikachu')).toBeInTheDocument();
    expect(screen.queryByText('Dragonair')).not.toBeInTheDocument();
  });

  it('testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons).toHaveLength(7);
    expect(filterButtons[0]).toHaveTextContent('Electric');
    expect(filterButtons[1]).toHaveTextContent('Fire');
    expect(filterButtons[2]).toHaveTextContent('Bug');
    expect(filterButtons[3]).toHaveTextContent('Poison');
    expect(filterButtons[4]).toHaveTextContent('Psychic');
    expect(filterButtons[5]).toHaveTextContent('Normal');
    expect(filterButtons[6]).toHaveTextContent('Dragon');

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
    expect(allButton).toBeEnabled();
  });

  it('testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
  });
});
