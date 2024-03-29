import Container from "../../components/Container/Container";
import { Pokemon } from "./types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import "./PokemonList.css";

interface PruebaProps {
  pokemons: Pokemon[] | undefined;
}

interface TypePokemon {
  slot: number;
  type: PokeType;
}

interface PokeType {
  name: string;
  url: string;
}

const PokemonList = ({ pokemons }: PruebaProps) => {
  const navigate = useNavigate();

  const columns = [
    { field: "name", header: "Nombre", key: 1 },
    { field: "sprites", header: "Imagen", key: 2 },
    { field: "types", header: "Tipo", key: 3 },
    { field: "details", header: "Detalles", key: 4 },
  ];

  const redirectTo = (id: number) => {
    navigate(`/pokemons/${id}`);
  };

  if (!pokemons) return "Cargando pokedex";

  return (
    <Container>
      <DataTable value={pokemons}>
        {columns.map((col) => (
          <Column
            key={col.key}
            field={col.field}
            header={col.header}
            body={(pokemon) => {
              if (col.field === "sprites") {
                return (
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                );
              } else if (col.field === "types") {
                return pokemon.types.map((type: TypePokemon, index: number) => (
                  <div key={index}>{type.type.name}</div>
                ));
              } else if (col.field === "details") {
                return (
                  <Button
                    className="bg-primary border-primary-500 px-3 py-2 text-base border-1 border-solid border-round cursor-pointer transition-all transition-duration-200 hover:bg-primary-600 hover:border-primary-600 active:bg-primary-700 active:border-primary-700"
                    label="Detalles"
                    severity="success"
                    onClick={() => redirectTo(pokemon.id)}
                  />
                );
              } else {
                return pokemon[col.field];
              }
            }}
          />
        ))}
      </DataTable>
    </Container>
  );
};

export default PokemonList;
