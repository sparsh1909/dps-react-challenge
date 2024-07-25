import React from 'react';

interface FiltersProps {
  nameFilter: string;
  cityFilter: string;
  highlightOldest: boolean;
  cities: string[];
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onHighlightChange: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  nameFilter, cityFilter, highlightOldest, cities, onNameChange, onCityChange, onHighlightChange
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', width: '100%' }}>
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '200px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>Name:</label>
        <input
          type="text"
          placeholder="Name"
          value={nameFilter}
          onChange={onNameChange}
          style={{ padding: '10px', fontSize: '16px', width: '100%', backgroundColor: 'white', border: '2px solid #007bff', borderRadius: '8px' }}
        />
      </div>
      <div style={{ flex: 1, minWidth: '200px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>City:</label>
        <select
          value={cityFilter}
          onChange={onCityChange}
          style={{ padding: '10px', fontSize: '16px', width: '100%', backgroundColor: 'white', border: '2px solid #007bff', borderRadius: '8px', appearance: 'auto' }}
        >
          <option value="">Select city</option>
          {cities.map(city => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '25px' }}>
        <label style={{ marginRight: '0px', whiteSpace: 'nowrap' }}>
          Highlight oldest per city
        </label>
        <input
          type="checkbox"
          checked={highlightOldest}
          onChange={onHighlightChange}
        />
      </div>
    </div>
  </div>
);

export default Filters;
